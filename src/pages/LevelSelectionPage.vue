<template>
  <div class="level-selection-page">
    <h2>选择难度</h2>
    <div class="buttons">
      <button @click="selectLevel('easy')">简单</button>
      <button @click="selectLevel('normal')">普通</button>
      <button @click="selectLevel('hard')">困难</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const selectLevel = (level) => {
      console.log('选择的难度：', level)
      localStorage.setItem('level', level)
      // 跳转到游戏页面
      router.push('/game')
    }

    return { selectLevel }
  }
}
</script>

<style scoped>
.level-selection-page {
  text-align: center;
  padding: 50px;
}

.buttons button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 18px;
}
</style>
