<script setup>
import { ref } from 'vue'
import { computed } from 'vue'

import ZhihuSearch from './api/zhihusearch.mjs'
import Card from './component/card.vue'

const zhihuSearch = new ZhihuSearch();

const q = ref('')
const res = ref('')
const reson = computed(() => !!res.value?.length)
const count = ref(0)
const len = computed(() => res.value?.length)

const search = (k) => {
  res.value = 'loading...'
  count.value = 0
  zhihuSearch.search(k)
    .then(data => res.value = data)
    .catch(err => {
      res.value = err
      console.log(err)
    })
}

const Next = () => {
  if (count.value + 1 < len.value) {
    count.value += 1
  }
}

const before = () => {
  if (count.value - 1 >= 0) {
    count.value -= 1
  }
}
</script>

<template>
  <div v-if="zhihuSearch.isSign">
    <h1>{{ "Search" }}</h1>
    <input v-model="q" /> <button @click="search(q)">{{ "Search" }}</button><button v-if="reson"
      @click="before">{{ "Before" }}</button>
    <div v-if="reson" style="display: inline-block;">{{ count + 1 }}{{ '/' }}{{ len }}</div><button v-if="reson"
      @click="Next">{{ "Next" }}</button>
    <Card v-if="reson" :content="res[count]?.content" :highlight="res[count]?.highlight" />
  </div>
  <div v-else>
    <div><input v-model="_search_userData_.dc0" placeholder="dc0" /></div>
    <div><input v-model="_search_userData_.UA" placeholder="UA" /></div>
    <div><input v-model="_search_userData_.cookies" placeholder="cookies" /></div>
    <div><input v-model="_search_userData_.xZst81" placeholder="xZst81" /></div>
    <div><button @click="_search_userData_.isSign = true">{{ "开始" }}</button></div>
  </div>
</template>
