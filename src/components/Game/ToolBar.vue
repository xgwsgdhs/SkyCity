<template>
  <div class="tool-bar">
    <img :src="tools.eraser" alt="橡皮" @click="selectTool('eraser')">
    <img :src="tools.navigator" alt="导航器" @click="selectTool('navigator')">
    <img :src="tools.rebirth" alt="重生门" @click="selectTool('rebirth')">
    <img :src="tools.roadBuilder" alt="铺路机" @click="selectTool('roadBuilder')">
  </div>
</template>

<script setup>
import { tools } from '@/assets/index.js'
import { ref } from 'vue'

const emit = defineEmits(['tool-selected'])//传递到父组件

const selectedTool = ref('')

const selectTool = (toolName) => {
  selectedTool.value = toolName
  emit('tool-selected', toolName)
  console.log('已选择工具：', toolName)
}
</script>


<style scoped>
.tool-bar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 2px solid #ccc;
  padding: 10px;
  align-items: center;
}

.tool-bar img {
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.tool-bar img:hover {
  border: 2px solid #000;
}
</style>
