<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGameStore } from '@/stores/gameStore';
import { useQuestStore } from '@/stores/questStore';
import { useUIStore } from '@/stores/uiStore';

const gameStore = useGameStore();
const questStore = useQuestStore();
const uiStore = useUIStore();

const { s } = storeToRefs(gameStore);
const { viewingQuest, currentQuest } = storeToRefs(questStore);
const { toggleState } = storeToRefs(uiStore);
</script>

<template>
  <div id="main">
    <div>
      <div class="quest-panel" v-if="viewingQuest">
        <button
          class="minimize-button"
          type="button"
          @click="uiStore.togglePanel('quest')"
        >
          {{ !toggleState.quest ? '-' : '+' }}
        </button>
        <h2 class="quest-title">{{ viewingQuest.name }}</h2>

        <div v-if="!toggleState.quest" class="quest-body">
          <p class="quest-desc">{{ viewingQuest.description }}</p>

          <div class="requirements">
            <div class="quest-level-requirements">
              <p>Level Requirements</p>
              <ul class="level-reqs">
                <li
                  v-for="(value, levelKey) in viewingQuest.requirements.levels"
                  :key="levelKey"
                >
                  <span
                    :style="{
                      color:
                        value !== undefined &&
                        s.levels[String(levelKey)] >= value
                          ? 'green'
                          : 'red',
                    }"
                  >
                    {{ `${levelKey}: ${value}` }}
                  </span>
                </li>
              </ul>
            </div>

            <div class="quest-quest-requirements">
              <p>Quest Requirements</p>
              <ul
                v-if="viewingQuest.requirements.quests?.length"
                class="quest-reqs"
              >
                <li
                  v-for="questId in viewingQuest.requirements.quests"
                  :key="questId"
                >
                  {{ gameStore.getQuest(questId)?.name }}
                </li>
              </ul>
              <p v-else>None</p>
            </div>
          </div>

          <div>
            <p>Rewards</p>
            <ul class="quest-rewards">
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

          <div style="text-align: right">
            <button
              v-if="!questStore.isQuestStarted(viewingQuest)"
              type="button"
              @click="questStore.acceptQuest(viewingQuest)"
              :disabled="!questStore.canStartQuest(viewingQuest)"
            >
              Start
            </button>
            <button
              v-if="questStore.isQuestStarted(viewingQuest)"
              type="button"
              :disabled="!questStore.canCompleteQuest(viewingQuest)"
            >
              Complete
            </button>
            <button
              v-if="questStore.isQuestStarted(viewingQuest)"
              type="button"
              @click="questStore.closeQuestPanel(viewingQuest)"
              style="margin-left: 1rem"
            >
              Cancel
            </button>
          </div>

          <template v-if="currentQuest && currentQuest.id === viewingQuest.id">
            <hr style="margin: 1rem 0" />
            <div class="current-quest">
              <p class="quest-title">Quest Progress</p>
              <ul class="quest-steps">
                <li
                  v-for="questStep in currentQuest.steps"
                  :key="questStep.id"
                  :style="{
                    textDecoration:
                      (questStore.getCurrentQuestStep() ?? 0) > questStep.id
                        ? 'line-through'
                        : 'none',
                  }"
                >
                  {{ questStep.description }}
                </li>
              </ul>
              <div style="text-align: right">
                <button
                  type="button"
                  @click="questStore.completeQuestStep"
                  :disabled="!questStore.canCompleteQuestStep(currentQuest)"
                >
                  Complete Step
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
