<template>
  <div class="game-page">
    <h2>游戏开始！</h2>
    <p>欢迎，{{ nickname }}！</p>
    <p>难度：{{ levelText }}</p>

    <div class="game-area">
      <!-- 以后这里放地图、工具栏、计分器 -->
      <p>（这里是游戏地图区域）</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
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
  padding: 50px;
}

.game-area {
  margin-top: 30px;
  border: 2px dashed #999;
  padding: 50px;
}
</style>
