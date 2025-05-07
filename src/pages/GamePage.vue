<template>
  <div class="game-page">
    <h2>游戏开始！</h2>
    <p>欢迎，{{ nickname }}！</p>
    <p>难度：{{ levelText }}</p>

    <div class="game-container">
      <!-- 地图区域 -->
      <div class="game-map">
        <p>（这里是游戏地图区域）</p>
      </div>

      <!-- 工具栏 -->
      <ToolBar />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import ToolBar from '../components/Game/ToolBar.vue'

export default {
  components: { ToolBar },
  setup() {
    const nickname = ref('')
    const level = ref('')

    const levelTextMap = {
      easy: '简单',
      normal: '普通',
      hard: '困难'
    }

    const levelText = ref('')

    onMounted(() => {
      nickname.value = localStorage.getItem('nickname') || '玩家'
      level.value = localStorage.getItem('level') || 'easy'
      levelText.value = levelTextMap[level.value] || '简单'
    })

    return { nickname, levelText }
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

.game-map {
  width: 600px;
  height: 600px;
  border: 2px dashed #999;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
