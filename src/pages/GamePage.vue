<template>
  <div class="game-page">
    <h2>游戏开始！</h2>
    <p>欢迎，{{ nickname }}！</p>
    <p>难度：{{ levelText }}</p>
    <button @click="toggleMode">
      {{ mode === 'build' ? '启动' : '建造' }}
    </button>

    <div class="game-container">
      <!-- 地图区域 -->
      <GameMap :currentTool="currentTool" />


      <!-- 工具栏 -->
      <ToolBar @tool-selected="updateTool" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import ToolBar from '../components/Game/ToolBar.vue'
import GameMap from '../components/Game/GameMap.vue'

export default {
  components: { ToolBar, GameMap },
  setup() {
    const nickname = ref('')
    const level = ref('')
    // 当前模式：build（建造）或 run（运行）
    const mode = ref('build')

    const levelTextMap = {
      easy: '简单',
      normal: '普通',
      hard: '困难'
    }
    const levelText = ref('')

    const currentTool = ref('') // 当前工具

    const updateTool = (toolName) => {
      currentTool.value = toolName
    }

    const toggleMode = () => {
      if (mode.value === 'build') {
        mode.value = 'run'
        console.log('进入运行模式')
        // TODO：这里将来启动市民出生、计分、计时等
      } else {
        mode.value = 'build'
        console.log('返回建造模式')
        // TODO：将来恢复地图状态，重置市民、计分器等
      }
    }



    onMounted(() => {
      nickname.value = localStorage.getItem('nickname') || '玩家'
      level.value = localStorage.getItem('level') || 'easy'
      levelText.value = levelTextMap[level.value] || '简单'
    })

    return { nickname, levelText, mode, toggleMode, currentTool, updateTool }
  }
}
</script>

<style scoped>
.game-page {
  text-align: center;
  padding: 20px;
}

.game-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

</style>
