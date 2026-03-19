<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGameStore } from '../stores/gameStore'
import { useAssistantStore } from '../stores/assistantStore'
import { useQuestStore } from '../stores/questStore'

const gameStore = useGameStore()
const assistantStore = useAssistantStore()
const questStore = useQuestStore()

const { s, availableAutoers, availableUpgrades, availableQuests } = storeToRefs(gameStore)
const { availableAssistants } = storeToRefs(assistantStore)
</script>

<template>
  <div id="rightbar">
    <!-- Available Autoers -->
    <div>
      <p>Available Autoers</p>
      <ul class="available-autoers">
        <li v-if="!availableAutoers.length">None Available</li>
        <li
          v-for="autoer in availableAutoers"
          :key="autoer.id"
          style="margin-bottom: 0.75rem;">
          {{ autoer.name }} | {{ autoer.getUpgradeCost() }}gp<br />
          <span v-html="autoer.getUpgradeValueText()" /><br />
          <template v-if="s.purchased_autoers.filter((a) => a.id === autoer.id).length">
            <p style="display: inline-block; margin: 0 0.5rem 0 0;">
              Own: {{ s.purchased_autoers.filter((a) => a.id === autoer.id).length }}
            </p>
          </template>
          <button
            type="button"
            :title="autoer.description"
            @click="gameStore.userPurchasedUpgrade(autoer)"
            :disabled="!autoer.canUpgrade()"
            style="margin-top: 0.5rem;">
            Buy
          </button>
        </li>
      </ul>
    </div>

    <!-- Available Assistants -->
    <div>
      <p>Available Assistants</p>
      <ul class="available-assistants">
        <li v-if="!availableAssistants.length">None Available</li>
        <li
          v-for="assistant in availableAssistants"
          :key="String(assistant.id)">
          Name: {{ assistant.name }}<br />
          Skills: {{ assistant.skills.join(',') }}<br />
          Perk: {{ assistant.perk.description }}<br />
          Wages: {{ assistant.cost_per_action }}gp<br />
          <button
            type="button"
            :disabled="!assistantStore.canHireAssistant(assistant)"
            @click="assistantStore.hireAssistant(assistant)">
            Hire for {{ assistantStore.getAssistantCost(assistant) }}
          </button>
        </li>
      </ul>
    </div>

    <!-- Available Upgrades -->
    <div>
      <p>Available Upgrades</p>
      <ul class="available-upgrades">
        <li v-if="!availableUpgrades.length">None Available</li>
        <li
          v-for="upgrade in availableUpgrades"
          :key="upgrade.id"
          style="margin-bottom: 0.75rem;">
          <span style="font-weight: bold;">{{ upgrade.name }}</span><br />
          {{ upgrade.description }}<br />
          {{ upgrade.getUpgradeValueText() }}<br />
          Costs: {{ upgrade.getUpgradeCost() }}gp<br />
          <button
            type="button"
            :title="upgrade.description ?? 'An upgrade'"
            @click="gameStore.userPurchasedUpgrade(upgrade)"
            :disabled="!upgrade.canUpgrade()"
            style="margin-top: 0.25rem;">
            Buy
          </button>
        </li>
      </ul>
    </div>

    <!-- Quests -->
    <div>
      <p>Quests</p>
      <ul class="available-quests">
        <li v-if="!availableQuests.length">- All Quests Completed -</li>
        <li
          v-for="quest in availableQuests"
          :key="quest.id"
          @click="questStore.updateQuestPanel(quest)">
          <span :style="{ color: questStore.canStartQuest(quest) ? 'black' : 'red' }">
            {{ quest.name }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
