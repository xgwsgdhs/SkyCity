<template>
  <div class="tool-bar">
    <img :src="tools.eraser" alt="橡皮" @click="selectTool('eraser')">
    <img :src="tools.navigator" alt="导航器" @click="selectTool('navigator')">
    <img :src="tools.rebirth" alt="重生门" @click="selectTool('rebirth')">
  </div>
</template>

<script>
import { tools } from '@/assets/index.js'
import { ref } from 'vue'

export default {
  setup() {
    const selectedTool = ref('')

    const selectTool = (toolName) => {
      selectedTool.value = toolName
      console.log('已选择工具：', toolName)
    }

    return { tools, selectTool }
  }
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
