<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGameStore } from '@/stores/gameStore';
import { useAssistantStore } from '@/stores/assistantStore';
import { useQuestStore } from '@/stores/questStore';
import { useUIStore, MainTab } from '@/stores/uiStore';
import { quests as allQuests } from '@/data/quests';

const gameStore = useGameStore();
const assistantStore = useAssistantStore();
const questStore = useQuestStore();
const uiStore = useUIStore();

const {
  s,
  availableOreList,
  availableSmithableList,
  purchasedAutoerEntities,
  purchasedUpgradeEntities,
  autoerGroups,
  availableAutoers,
  availableUpgrades,
} = storeToRefs(gameStore);

const { availableAssistants } = storeToRefs(assistantStore);
const { viewingQuest, currentQuest } = storeToRefs(questStore);
const { activeTab, toggleState } = storeToRefs(uiStore);

const tabs = [
  { id: MainTab.Skills, label: 'Skills' },
  { id: MainTab.CurrentUpgrades, label: 'Current Upgrades' },
  { id: MainTab.CurrentAssistants, label: 'Current Assistants' },
  { id: MainTab.AvailableUpgrades, label: 'Available Upgrades' },
  { id: MainTab.AvailableAssistants, label: 'Available Assistants' },
  { id: MainTab.Quests, label: 'Quests' },
];

function onTabChange(event: Event) {
  uiStore.setTab((event.target as HTMLSelectElement).value as MainTab);
}
</script>

<template>
  <div
    id="main"
    class="flex-1 flex flex-col overflow-hidden bg-osrs-bg min-h-0"
  >
    <!-- Tab bar: dropdown on mobile, button row on md+ -->
    <div class="flex-none bg-osrs-surface border-b-2 border-osrs-border">
      <!-- Mobile dropdown -->
      <div class="md:hidden px-3 py-2">
        <select
          class="w-full bg-osrs-btn border border-osrs-border text-osrs-text rounded px-3 py-2 text-sm font-semibold"
          :value="activeTab"
          @change="onTabChange"
        >
          <option v-for="tab in tabs" :key="tab.id" :value="tab.id">
            {{ tab.label }}
          </option>
        </select>
      </div>
      <!-- Desktop button row -->
      <div class="hidden md:flex">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="[
            'px-4 py-3 text-xs font-bold uppercase tracking-wide border-b-2 -mb-0.5 transition-colors whitespace-nowrap hover:cursor-pointer',
            activeTab === tab.id
              ? 'border-osrs-gold text-osrs-gold bg-osrs-tab-active'
              : 'border-transparent text-osrs-muted hover:text-osrs-text hover:border-osrs-border/50',
          ]"
          @click="uiStore.setTab(tab.id)"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Tab content -->
    <div class="flex-1 overflow-y-auto p-4 bg-osrs-panel min-h-0">
      <div v-show="activeTab === MainTab.Skills">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          <!-- Mining -->
          <div>
            <h3 class="section-header">Mining</h3>
            <p v-if="!availableOreList.length" class="text-osrs-muted text-sm">
              No ores unlocked yet.
            </p>
            <div class="flex flex-col gap-2">
              <button
                v-for="ore in availableOreList"
                :key="ore.id"
                class="btn btn-skill"
                type="button"
                @click="gameStore.userDidMine(ore)"
              >
                {{ ore.name }}
              </button>
            </div>
          </div>

          <!-- Smithing -->
          <div>
            <h3 class="section-header">Smithing</h3>
            <p
              v-if="
                !availableSmithableList ||
                !Object.keys(availableSmithableList).length
              "
              class="text-osrs-text text-sm"
            >
              No smithables unlocked yet.
            </p>
            <div
              v-for="(smithables, tier) in availableSmithableList"
              :key="tier"
              class="mb-4"
            >
              <div
                class="flex justify-between items-center py-1.5 mb-2 border-b border-osrs-border/50 cursor-pointer hover:text-osrs-gold select-none"
                @click="uiStore.toggleInventory(String(tier))"
              >
                <span class="capitalize font-semibold text-sm text-osrs-text">{{
                  tier
                }}</span>
                <span class="text-xs text-osrs-muted">{{
                  toggleState.inventory_categories[String(tier)] ? '▲' : '▼'
                }}</span>
              </div>
              <div
                v-show="toggleState.inventory_categories[String(tier)]"
                class="flex flex-col gap-1.5"
              >
                <button
                  v-for="smithable in smithables"
                  :key="smithable.item_id"
                  class="btn btn-skill"
                  type="button"
                  :disabled="!gameStore.userCanCraft(smithable)"
                  @click="gameStore.userDidSmith(smithable)"
                >
                  {{ smithable.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ CURRENT UPGRADES ════════════════════════════════════════ -->
      <!-- Container: max 50% on desktop, full width on mobile, left-aligned -->
      <div v-show="activeTab === MainTab.CurrentUpgrades">
        <div class="w-full lg:max-w-1/2">
          <!-- Split layout: Autoers | Upgrades side by side on sm+ -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Autoers column -->
            <div>
              <h3 class="section-header">Autoers</h3>
              <p
                v-if="!s.purchased_autoers.length"
                class="text-osrs-muted text-sm"
              >
                None purchased.
              </p>
              <div v-for="autoerGroup in autoerGroups" :key="autoerGroup.id">
                <div
                  v-for="autoer in purchasedAutoerEntities.filter(
                    (a) => a.id === autoerGroup.id,
                  )"
                  :key="autoer.unique_id"
                  class="bg-osrs-surface rounded p-3 mb-2 border border-osrs-border/40 text-sm"
                >
                  <p class="font-semibold mb-1">
                    {{ autoer.name }}
                  </p>
                  <p><span v-html="autoer.getUpgradeValueText()"></span></p>
                  <template v-if="!autoer.getUpgradeRequirementText().length">
                    <p class="text-osrs-muted text-xs mt-1">Max Level</p>
                  </template>
                  <template v-else>
                    <p class="text-osrs-muted text-xs mt-1">
                      Upgrade —
                      {{ autoer.getUpgradeRequirementText().join(', ') }} |
                      {{ autoer.getUpgradeCost() }}gp
                    </p>
                    <button
                      class="btn mt-1.5"
                      :title="autoer.description"
                      :disabled="!autoer.canUpgrade()"
                      @click="gameStore.userPurchasedUpgrade(autoer)"
                    >
                      Upgrade
                    </button>
                  </template>
                  <button class="btn mt-1.5 ml-1" @click="autoer.toggleState()">
                    {{ autoer.isRunning() ? 'Pause' : 'Start' }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Upgrades column -->
            <div>
              <h3 class="section-header">Upgrades</h3>
              <p v-if="!s.upgrades.length" class="text-osrs-muted text-sm">
                None purchased.
              </p>
              <div
                v-for="upgrade in purchasedUpgradeEntities"
                :key="upgrade.id"
                class="bg-osrs-surface rounded p-3 mb-2 border border-osrs-border/40 text-sm"
              >
                <div class="flex items-baseline gap-2 mb-1">
                  <span class="font-bold">{{ upgrade.name }}</span>
                  <span class="text-xs text-osrs-muted">
                    <template v-if="!upgrade.getUpgradeRequirementText().length"
                      >[Max]</template
                    >
                    <template v-else>
                      [{{
                        (s.upgrades.find((u) => u.id === upgrade.id)?.level ??
                          0) + 1
                      }}
                      / {{ upgrade.upgrades.length }}]
                    </template>
                  </span>
                </div>
                <template v-if="upgrade.id.includes('excess')">
                  <p>
                    {{
                      upgrade.value < 1
                        ? `${Math.floor(upgrade.value * 100)}%`
                        : `${upgrade.value * 100}%`
                    }}
                    chance for extra item.
                  </p>
                </template>
                <template v-else>
                  <p>{{ upgrade.getUpgradeValueText() }}</p>
                </template>
                <template v-if="upgrade.getUpgradeRequirementText().length">
                  <p class="text-osrs-muted text-xs mt-1">
                    Next: {{ upgrade.getUpgradeValueText(true) }} —
                    {{ upgrade.getUpgradeRequirementText().join(', ') }} |
                    {{ upgrade.getUpgradeCost() }}gp
                  </p>
                  <button
                    class="btn mt-1.5"
                    :title="upgrade.description ?? 'An upgrade'"
                    :disabled="!upgrade.canUpgrade()"
                    @click="gameStore.userPurchasedUpgrade(upgrade)"
                  >
                    Upgrade
                  </button>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ CURRENT ASSISTANTS ══════════════════════════════════════ -->
      <!-- Container: max 50% on desktop, full width on mobile, left-aligned -->
      <div v-show="activeTab === MainTab.CurrentAssistants">
        <div class="w-full lg:max-w-1/2">
          <h3 class="section-header">
            My Assistants
            <span class="text-xs font-normal text-osrs-text ml-2">
              ({{ s.assistants.length }}/{{
                s.global_variables.max_assistants
              }})
            </span>
          </h3>
          <p v-if="!s.assistants.length" class="text-osrs-muted text-sm">
            None hired.
          </p>
          <!-- Each card: split layout (info | actions) -->
          <div
            v-for="assistant in s.assistants"
            :key="String(assistant.id)"
            class="bg-osrs-surface rounded p-3 mb-3 border border-osrs-border/40"
          >
            <div class="grid grid-cols-[1fr_auto] gap-3 items-start">
              <!-- Info -->
              <div class="text-sm space-y-0.5 min-w-0">
                <p class="font-bold text-osrs-gold">
                  {{ assistant.name }}
                </p>
                <p>Speed: {{ (assistant.interval / 1000).toFixed(2) }}s</p>
                <p>Wages: {{ assistant.cost_per_action }}gp/action</p>
                <p>Job: {{ assistantStore.getAssistantJob(assistant) }}</p>
                <p class="text-osrs-muted">
                  Perk: {{ assistant.perk.description }}
                </p>
              </div>
              <!-- Actions -->
              <div class="flex flex-col gap-1.5 shrink-0">
                <button
                  class="btn"
                  :title="assistantStore.getAssistantUpgradeTitle(assistant)"
                  :disabled="!assistantStore.canUpgradeAssistant(assistant)"
                  @click="assistantStore.upgradeAssistant(assistant)"
                >
                  <template v-if="!assistantStore.isAssistantMaxed(assistant)">
                    Train
                    {{ assistantStore.getAssistantUpgradeCost(assistant) }}gp
                  </template>
                  <template v-else> Max Level </template>
                </button>
                <button
                  class="btn"
                  @click="assistantStore.editAssistant(assistant)"
                >
                  Edit Job
                </button>
                <button
                  class="btn"
                  @click="assistantStore.confirmFireAssistant(assistant)"
                >
                  Fire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ AVAILABLE UPGRADES ══════════════════════════════════════ -->
      <div v-show="activeTab === MainTab.AvailableUpgrades">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          <!-- Autoers for purchase -->
          <div>
            <h3 class="section-header">Autoers</h3>
            <p v-if="!availableAutoers.length" class="text-osrs-muted text-sm">
              None available.
            </p>
            <div
              v-for="autoer in availableAutoers"
              :key="autoer.id"
              class="bg-osrs-surface rounded p-3 mb-3 border border-osrs-border/40 text-sm"
            >
              <div class="flex justify-between items-start mb-1">
                <p class="font-bold text-osrs-gold">
                  {{ autoer.name }}
                </p>
                <span class="text-osrs-gold text-xs"
                  >{{ autoer.getUpgradeCost() }}gp</span
                >
              </div>
              <p class="text-osrs-muted text-xs mb-1">
                {{ autoer.description }}
              </p>
              <p><span v-html="autoer.getUpgradeValueText()"></span></p>
              <p
                v-if="
                  s.purchased_autoers.filter((a) => a.id === autoer.id).length
                "
                class="text-osrs-muted text-xs mt-0.5"
              >
                Owned:
                {{
                  s.purchased_autoers.filter((a) => a.id === autoer.id).length
                }}
              </p>
              <button
                class="btn mt-2"
                :title="autoer.description"
                :disabled="!autoer.canUpgrade()"
                @click="gameStore.userPurchasedUpgrade(autoer)"
              >
                Buy
              </button>
            </div>
          </div>

          <!-- Upgrades for purchase -->
          <div>
            <h3 class="section-header">Upgrades</h3>
            <p v-if="!availableUpgrades.length" class="text-osrs-muted text-sm">
              None available.
            </p>
            <div
              v-for="upgrade in availableUpgrades"
              :key="upgrade.id"
              class="bg-osrs-surface rounded p-3 mb-3 border border-osrs-border/40 text-sm"
            >
              <div class="flex justify-between items-start mb-1">
                <p class="font-bold text-osrs-gold">
                  {{ upgrade.name }}
                </p>
                <span class="text-osrs-gold text-xs"
                  >{{ upgrade.getUpgradeCost() }}gp</span
                >
              </div>
              <p class="text-osrs-muted text-xs mb-1">
                {{ upgrade.description }}
              </p>
              <p>{{ upgrade.getUpgradeValueText() }}</p>
              <button
                class="btn mt-2"
                :title="upgrade.description ?? 'An upgrade'"
                :disabled="!upgrade.canUpgrade()"
                @click="gameStore.userPurchasedUpgrade(upgrade)"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ AVAILABLE ASSISTANTS ════════════════════════════════════ -->
      <div v-show="activeTab === MainTab.AvailableAssistants">
        <h3 class="section-header">Available Assistants</h3>
        <p v-if="!availableAssistants.length" class="text-osrs-muted text-sm">
          None available right now — check back soon.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="assistant in availableAssistants"
            :key="String(assistant.id)"
            class="bg-osrs-surface rounded p-3 border border-osrs-border/40 text-sm"
          >
            <p class="font-bold text-osrs-gold mb-1">
              {{ assistant.name }}
            </p>
            <div class="space-y-0.5 mb-3">
              <p>Skills: {{ assistant.skills.join(', ') }}</p>
              <p class="text-osrs-muted">
                Perk: {{ assistant.perk.description }}
              </p>
              <p>Wages: {{ assistant.cost_per_action }}gp/action</p>
            </div>
            <button
              class="btn"
              :disabled="!assistantStore.canHireAssistant(assistant)"
              @click="assistantStore.hireAssistant(assistant)"
            >
              Hire for {{ assistantStore.getAssistantCost(assistant) }}
            </button>
          </div>
        </div>
      </div>

      <!-- ══ QUESTS ══════════════════════════════════════════════════ -->
      <div v-show="activeTab === MainTab.Quests">
        <h3 class="section-header">Quest Log</h3>
        <!-- Quest list: max 50% width on desktop -->
        <div class="w-full lg:max-w-1/2">
          <div v-for="quest in allQuests" :key="quest.id" class="mb-0.5">
            <!-- Quest list row -->
            <div
              class="flex items-center gap-2 px-3 py-2 rounded cursor-pointer hover:bg-osrs-surface/60 transition-colors select-none"
              :class="{
                'text-green-400': s.quests_completed.includes(quest.id),
                'text-cyan-400':
                  !s.quests_completed.includes(quest.id) &&
                  currentQuest?.id === quest.id,
                'text-red-400':
                  !s.quests_completed.includes(quest.id) &&
                  currentQuest?.id !== quest.id,
              }"
              @click="questStore.updateQuestPanel(quest)"
            >
              <span class="text-xs">{{
                viewingQuest?.id === quest.id ? '▼' : '▶'
              }}</span>
              <span class="text-sm font-semibold">{{ quest.name }}</span>
              <span
                v-if="s.quests_completed.includes(quest.id)"
                class="text-xs text-green-400/70 ml-auto"
                >Completed</span
              >
              <span
                v-else-if="currentQuest?.id === quest.id"
                class="text-xs text-cyan-400/70 ml-auto"
                >In Progress</span
              >
            </div>

            <!-- Quest detail panel (inline expand) -->
            <div
              v-if="viewingQuest?.id === quest.id"
              class="mx-2 mb-3 mt-0.5 p-4 bg-osrs-surface rounded border border-osrs-border text-osrs-text"
            >
              <p class="text-osrs-muted text-sm mb-3">
                {{ viewingQuest.description }}
              </p>

              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p
                    class="text-xs font-bold text-osrs-gold mb-1.5 uppercase tracking-wide"
                  >
                    Level Requirements
                  </p>
                  <ul class="text-sm space-y-0.5">
                    <li
                      v-for="(value, levelKey) in viewingQuest.requirements
                        .levels"
                      :key="levelKey"
                      :class="{
                        'text-green-400':
                          value !== undefined &&
                          s.levels[String(levelKey)] >= value,
                        'text-red-400': !(
                          value !== undefined &&
                          s.levels[String(levelKey)] >= value
                        ),
                      }"
                    >
                      {{ `${levelKey}: ${value}` }}
                    </li>
                  </ul>
                </div>
                <div>
                  <p
                    class="text-xs font-bold text-osrs-gold mb-1.5 uppercase tracking-wide"
                  >
                    Quest Requirements
                  </p>
                  <ul
                    v-if="viewingQuest.requirements.quests?.length"
                    class="text-sm space-y-0.5"
                  >
                    <li
                      v-for="questId in viewingQuest.requirements.quests"
                      :key="questId"
                    >
                      {{ gameStore.getQuest(questId)?.name }}
                    </li>
                  </ul>
                  <p v-else class="text-sm text-osrs-muted">None</p>
                </div>
              </div>

              <div class="mb-4">
                <p
                  class="text-xs font-bold text-osrs-gold mb-1.5 uppercase tracking-wide"
                >
                  Rewards
                </p>
                <ul class="text-sm space-y-0.5">
                  <li v-for="(reward, idx) in viewingQuest.rewards" :key="idx">
                    <template v-if="reward.category === 'experience'">
                      {{ `${reward.value} ${reward.affects} xp` }}
                    </template>
                    <template
                      v-else-if="
                        reward.category === 'item' &&
                        gameStore.getItem(reward.item_id)
                      "
                    >
                      <template v-if="reward.value === 1">
                        {{ gameStore.getItem(reward.item_id)?.name }}
                      </template>
                      <template v-else>
                        {{
                          `${reward.value}x ${gameStore.getItem(reward.item_id)?.name}`
                        }}
                      </template>
                    </template>
                    <template v-else-if="reward.category === 'money'">
                      {{ `${reward.value} gold` }}
                    </template>
                    <template v-else-if="reward.category === 'assistant'">
                      A {{ reward.affects }} assistant
                    </template>
                  </li>
                </ul>
              </div>

              <!-- Actions: hidden for completed quests -->
              <div
                v-if="s.quests_completed.includes(viewingQuest.id)"
                class="text-green-400 text-sm font-semibold"
              >
                ✓ Quest Completed
              </div>
              <div v-else class="flex gap-2 justify-end">
                <button
                  v-if="!questStore.isQuestStarted(viewingQuest)"
                  class="btn"
                  :disabled="!questStore.canStartQuest(viewingQuest)"
                  @click="questStore.acceptQuest(viewingQuest)"
                >
                  Start
                </button>
                <button
                  v-if="questStore.isQuestStarted(viewingQuest)"
                  class="btn"
                  :disabled="!questStore.canCompleteQuest(viewingQuest)"
                >
                  Complete
                </button>
                <button
                  v-if="questStore.isQuestStarted(viewingQuest)"
                  class="btn"
                  @click="questStore.closeQuestPanel(viewingQuest)"
                >
                  Cancel
                </button>
              </div>

              <!-- In-progress quest steps -->
              <template
                v-if="currentQuest && currentQuest.id === viewingQuest.id"
              >
                <hr class="border-osrs-border my-4" />
                <p
                  class="text-xs font-bold text-osrs-gold mb-2 uppercase tracking-wide"
                >
                  Quest Progress
                </p>
                <ul class="text-sm space-y-1 mb-3">
                  <li
                    v-for="questStep in currentQuest.steps"
                    :key="questStep.id"
                    :class="{
                      'line-through text-osrs-muted':
                        (questStore.getCurrentQuestStep() ?? 0) > questStep.id,
                    }"
                  >
                    {{ questStep.description }}
                  </li>
                </ul>
                <div class="flex justify-end">
                  <button
                    class="btn"
                    :disabled="!questStore.canCompleteQuestStep(currentQuest)"
                    @click="questStore.completeQuestStep"
                  >
                    Complete Step
                  </button>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
