<!--
SPDX-FileCopyrightText: syuilo and other misskey contributors
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<MkStickyContainer>
	<template #header><MkPageHeader :actions="headerActions" :tabs="headerTabs"/></template>
	<MkSpacer :contentMax="800" :marginMin="16" :marginMax="32">
  
    <h2>Add Checkinable</h2>
    <form @submit.prevent="insertRecord">
      <table>
        <tr>
          <td>
            <label for="label">Label:</label>
          </td>
          <td>
            <input type="text" id="label" v-model="props.label" required>
          </td>
        </tr>
        <tr>
          <td>
            <label for="classification">Classification:</label>
          </td>
          <Td>
            <input type="text" id="classification" v-model="props.classification" required>
          </Td>
        </tr>
        <tr>
          <Td>
            <label for="source">Source:</label>
          </Td>
          <td>
            <input type="text" id="source" v-model="props.source" required>
          </td>
        </tr>
        <tr>
          <td>
            <label for="icon">Icon URL:</label>
          </td>
          <td>
            <input type="url" id="icon" v-model="props.icon" required>
          </td>
        </tr>
        <button type="submit">Submit</button>
      </table>
    </form>

    <h3>Classifications</h3>
    <ul>
      <li v-for="c in classification">{{ c }}</li>
    </ul>

    <h2>Existing Checkinables</h2>
    <table>
      <tr v-for="item in allCheckins">
        <td>{{item.id}}</td>
        <td>{{item.label}}</td>
        <td>{{item.classification}}</td>
        <td>{{item.source}}</td>
        <td><img :src='item.icon' :alt="item.icon" /></td>
        <td>
          <button @click="deleteRecord(item.id)">
            X
          </button>
        </td>
      </tr>
    </table>

  </MkSpacer>
</MkStickyContainer>
</template>

<script lang="ts" setup>
import { } from 'vue';
import FormSuspense from '@/components/form/suspense.vue';
import MkKeyValue from '@/components/MkKeyValue.vue';
import * as os from '@/os.js';
import bytes from '@/filters/bytes.js';
import number from '@/filters/number.js';
import { i18n } from '@/i18n.js';
import { definePageMetadata } from '@/scripts/page-metadata.js';
import {classification} from '@/coffeedb.ts'

const props = defineProps<{
  label: string;
  classification: string;
  source: string;
  icon: string;
}>();

const databasePromiseFactory = () => os.api('checkinables/list')

let allCheckins = $ref([])

const loadList = () => {
  os.api('checkinables/list')
  .then(res => {
    allCheckins = res
  })
}
loadList()

const headerActions = $computed(() => []);

const headerTabs = $computed(() => []);

async function insertRecord() {
  // TODO
  const raw = await os.api('checkinables/create', {
    label: props.label,
    classification: props.classification,
    source: props.source,
    icon: props.icon,
  });
  await loadList()
}

async function deleteRecord(recordId) {
  const con = confirm("Are you sure you want to delete this?")
  if (!con) return
  await os.api('checkinables/delete', {
    id: recordId,
  })
  await loadList()
}

definePageMetadata({
	title: i18n.ts.database,
	icon: 'ph-database ph-bold ph-lg',
});
</script>
