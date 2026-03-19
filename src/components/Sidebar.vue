<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGameStore } from '@/stores/gameStore';
import { useAssistantStore } from '@/stores/assistantStore';
import { useUIStore } from '@/stores/uiStore';
import TogglePanel from './TogglePanel.vue';

const gameStore = useGameStore();
const assistantStore = useAssistantStore();
const uiStore = useUIStore();

const {
  s,
  upkeep,
  availableOreList,
  availableSmithableList,
  purchasedAutoerEntities,
  purchasedUpgradeEntities,
  autoerGroups,
} = storeToRefs(gameStore);
const { toggleState } = storeToRefs(uiStore);
</script>

<template>
  <div id="sidebar">
    <!-- Levels -->
    <div>
      <p style="font-size: 1.6rem; line-height: 1.2">Levels</p>
      <div class="levels">
        <div>
          <p>Mining {{ s.levels.mining }}</p>
          <progress
            :value="gameStore.xpForSkill('mining')"
            max="100"
            :title="String(s.xp.mining)"
          />
        </div>
        <div>
          <p>Smithing {{ s.levels.smithing }}</p>
          <progress :value="gameStore.xpForSkill('smithing')" max="100" />
        </div>
      </div>
    </div>

    <!-- Upkeep -->
    <TogglePanel
      title="Upkeep"
      :open="toggleState.upkeep"
      @toggle="uiStore.togglePanel('upkeep')"
    >
      <template #header-right>
        {{ upkeep.progress + upkeep.assistant }}gp
      </template>
      <p>Upkeep is paid every {{ gameStore.getUpkeepDisplayTime() }}</p>
      <ul
        style="
          width: 75%;
          margin: 0 auto;
          padding-left: 0;
          list-style-type: none;
        "
      >
        <li style="display: flex; justify-content: space-between">
          <span style="font-weight: bold">Shop Upkeep</span>
          <span>{{ upkeep.progress }}</span>
        </li>
        <li style="display: flex; justify-content: space-between">
          <span style="font-weight: bold">Assistant Upkeep</span>
          <span>{{ upkeep.assistant }}</span>
        </li>
        <li><hr /></li>
        <li style="display: flex; justify-content: space-between">
          <span style="font-weight: bold">Total</span>
          <span>{{ upkeep.progress + upkeep.assistant }}</span>
        </li>
      </ul>
    </TogglePanel>

    <!-- Inventory -->
    <TogglePanel
      title="Inventory"
      :open="toggleState.inventory"
      @toggle="uiStore.togglePanel('inventory')"
    >
      <template #header-right>
        <p>{{ s.gold }}gp</p>
      </template>
      <ul class="simple-list inventory" style="padding-left: 1rem">
        <li
          v-for="category in ['ores', 'bars', 'armor', 'weapons']"
          :key="category"
        >
          <span
            style="
              position: relative;
              display: block;
              margin-bottom: 0.75rem;
              padding: 0.25rem 0;
              font-size: 1.2rem;
              text-transform: capitalize;
              border-bottom: 1px solid black;
              cursor: pointer;
            "
            @click="uiStore.toggleInventory(category)"
          >
            {{ category }}
            <span
              style="position: absolute; right: 0"
              :style="{
                transform: `rotate(${toggleState.inventory_categories[category] ? 0 : 180}deg)`,
              }"
            >
              ^
            </span>
          </span>
          <ul
            v-show="toggleState.inventory_categories[category]"
            style="padding-left: 0.75rem"
          >
            <li
              v-for="invItem in s.inventory.filter((i) =>
                gameStore.getItem(i.item_id)?.categories.includes(category),
              )"
              :key="invItem.item_id"
            >
              <div>
                {{ gameStore.getItem(invItem.item_id)?.name }} x{{
                  invItem.quantity
                }}
                <div>
                  <button
                    type="button"
                    @click.shift="
                      gameStore.userDidSell(
                        gameStore.getItem(invItem.item_id)!,
                        true,
                      )
                    "
                    @click.exact="
                      gameStore.userDidSell(gameStore.getItem(invItem.item_id)!)
                    "
                    :disabled="
                      !gameStore.hasInventory(
                        gameStore.getItem(invItem.item_id)!,
                      )
                    "
                  >
                    $
                  </button>
                  <button
                    type="button"
                    @click="
                      gameStore.userDidSell(
                        gameStore.getItem(invItem.item_id)!,
                        true,
                      )
                    "
                    :disabled="
                      !gameStore.hasInventory(
                        gameStore.getItem(invItem.item_id)!,
                      )
                    "
                    class="mobile-only"
                    style="margin-left: 1rem"
                  >
                    $$
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <div style="margin-top: 1rem; text-align: right">
        <button
          :title="`Bank Sale! ${gameStore.getBankSaleValue()}gp!`"
          @click="gameStore.bankSale()"
        >
          Sell All
        </button>
      </div>
    </TogglePanel>

    <!-- Mining -->
    <TogglePanel
      title="Mining"
      :open="toggleState.mining"
      @toggle="uiStore.togglePanel('mining')"
      style="margin-top: 1.5rem"
    >
      <ul class="simple-list ore-list">
        <li v-for="ore in availableOreList" :key="ore.id">
          <button
            class="skill-btn"
            type="button"
            @click="gameStore.userDidMine(ore)"
          >
            {{ ore.name }}
          </button>
        </li>
      </ul>
    </TogglePanel>

    <!-- Smithing -->
    <TogglePanel
      title="Smithing"
      :open="toggleState.smithing"
      @toggle="uiStore.togglePanel('smithing')"
      style="margin-top: 1.5rem"
    >
      <ul class="simple-list smithing-list">
        <li v-for="(smithables, tier) in availableSmithableList" :key="tier">
          <span
            style="
              position: relative;
              display: block;
              margin-bottom: 0.75rem;
              padding: 0.25rem 0;
              font-size: 1.2rem;
              text-transform: capitalize;
              border-bottom: 1px solid black;
              cursor: pointer;
            "
            @click="uiStore.toggleInventory(String(tier))"
          >
            {{ tier }}
            <span
              style="position: absolute; right: 0"
              :style="{
                transform: `rotate(${toggleState.inventory_categories[String(tier)] ? 0 : 180}deg)`,
              }"
            >
              ^
            </span>
          </span>
          <ul
            v-show="toggleState.inventory_categories[String(tier)]"
            style="margin-top: 0.5rem; padding-left: 0"
          >
            <li v-for="smithable in smithables" :key="smithable.item_id">
              <button
                class="skill-btn"
                type="button"
                @click="gameStore.userDidSmith(smithable)"
                :disabled="!gameStore.userCanCraft(smithable)"
              >
                {{ smithable.name }}
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </TogglePanel>

    <!-- Hired Assistants -->
    <TogglePanel
      title="Assistants"
      :badge="`(${s.assistants.length}/${s.global_variables.max_assistants})`"
      :open="toggleState.hired_assistants"
      @toggle="uiStore.togglePanel('hired_assistants')"
      style="margin-top: 1.5rem"
    >
      <ul>
        <li v-if="!s.assistants.length">None Hired</li>
        <li
          v-for="assistant in s.assistants"
          :key="String(assistant.id)"
          style="margin-bottom: 1rem"
        >
          {{ assistant.name }}<br />
          Assistant Speed: {{ (assistant.interval / 1000).toFixed(2) }}s<br />
          Assistant Wages: {{ assistant.cost_per_action }}gp<br />
          Assistant is: {{ assistantStore.getAssistantJob(assistant) }}<br />
          Assistant Perk: {{ assistant.perk.description }}<br />
          <button
            type="button"
            @click="assistantStore.upgradeAssistant(assistant)"
            :title="assistantStore.getAssistantUpgradeTitle(assistant)"
            :disabled="!assistantStore.canUpgradeAssistant(assistant)"
          >
            <template v-if="!assistantStore.isAssistantMaxed(assistant)">
              Train {{ assistantStore.getAssistantUpgradeCost(assistant) }}gp
            </template>
            <template v-else>Max Level</template>
          </button>
          <button
            type="button"
            @click="assistantStore.editAssistant(assistant)"
          >
            Edit Job
          </button>
          <button
            type="button"
            @click="assistantStore.confirmFireAssistant(assistant)"
          >
            Fire Assistant
          </button>
        </li>
      </ul>
    </TogglePanel>

    <!-- Purchased Autoers -->
    <TogglePanel
      title="Autoers"
      :open="toggleState.purchased_autoers"
      @toggle="uiStore.togglePanel('purchased_autoers')"
      style="margin-top: 1.5rem"
    >
      <ul>
        <li v-if="!s.purchased_autoers.length">None Purchased</li>
        <li v-for="autoerGroup in autoerGroups" :key="autoerGroup.id">
          <p style="font-size: 1.2rem">{{ autoerGroup.name }}</p>
          <ul>
            <li
              v-for="autoer in purchasedAutoerEntities.filter(
                (a) => a?.id === autoerGroup.id,
              )"
              :key="autoer!.unique_id"
              style="margin-bottom: 1rem"
            >
              {{ autoer!.name }}<br />
              <span v-html="autoer!.getUpgradeValueText()" /><br />
              <template v-if="!autoer!.getUpgradeRequirementText().length">
                Max Level
              </template>
              <template v-else>
                <p style="margin: 0.25rem 0">Upgrade Requirements</p>
                <p style="margin: 0">
                  Levels: {{ autoer!.getUpgradeRequirementText().join(',') }}
                </p>
                <p style="margin: 0 0 0.25rem">
                  Gold: {{ autoer!.getUpgradeCost() }}
                </p>
                <button
                  type="button"
                  :title="autoer!.description"
                  @click="gameStore.userPurchasedUpgrade(autoer!)"
                  :disabled="!autoer!.canUpgrade()"
                >
                  Upgrade
                </button>
              </template>
              <br />
              <button type="button" @click="autoer!.toggleState()">
                {{ autoer!.isRunning() ? 'Pause' : 'Start' }}
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </TogglePanel>

    <!-- Current Upgrades -->
    <TogglePanel
      title="Current Upgrades"
      :open="toggleState.purchased_upgrades"
      @toggle="uiStore.togglePanel('purchased_upgrades')"
      style="margin-top: 1.5rem"
    >
      <ul class="available-upgrades">
        <li v-if="!s.upgrades.length">None Purchased</li>
        <li v-for="upgrade in purchasedUpgradeEntities" :key="upgrade!.id">
          <span style="font-weight: bold">{{ upgrade!.name }}</span>
          <span style="padding-left: 5px; font-size: 0.8rem; font-weight: bold">
            <template v-if="!upgrade!.getUpgradeRequirementText().length">
              [Max]
            </template>
            <template v-else>
              [{{
                (s.upgrades.find((u) => u.id === upgrade!.id)?.level ?? 0) + 1
              }}
              / {{ upgrade!.upgrades.length }}]
            </template>
          </span>
          <br />
          <template v-if="upgrade!.id.includes('excess')">
            {{
              upgrade!.value < 1
                ? `${Math.floor(upgrade!.value * 100)}%`
                : `${upgrade!.value * 100}%`
            }}
            chance to get an extra item.
          </template>
          <template v-else>
            {{ upgrade!.getUpgradeValueText() }}
          </template>
          <template v-if="upgrade!.getUpgradeRequirementText().length">
            <br />
            <p style="margin: 0.25rem 0">
              Next Value: {{ upgrade!.getUpgradeValueText(true) }}
            </p>
            <p style="margin: 0.25rem 0">Upgrade Requirements</p>
            <p style="margin: 0">
              Levels: {{ upgrade!.getUpgradeRequirementText().join(',') }}
            </p>
            <p style="margin: 0 0 0.25rem">
              Gold: {{ upgrade!.getUpgradeCost() }}
            </p>
            <button
              type="button"
              :title="upgrade!.description ?? 'An upgrade'"
              @click="gameStore.userPurchasedUpgrade(upgrade!)"
              :disabled="!upgrade!.canUpgrade()"
            >
              Upgrade
            </button>
          </template>
        </li>
      </ul>
    </TogglePanel>
  </div>
</template>
