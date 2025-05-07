<template>
  <div class="main-page">
    <!-- Logo -->
    <h1 class="logo">Sky City</h1>

    <!-- 按钮 -->
    <div class="buttons">
      <button @click="showModal = true">New Game</button>
      <button>Load Game</button>
      <button>Ranking</button>
    </div>

    <!-- 昵称输入的模态框 -->
    <div class="modal" v-if="showModal" @click.self="closeModal">
      <div class="modal-content">
        <input v-model="nickname" placeholder="Enter your nickname">
        <button @click="confirmNickname">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const showModal = ref(false)
    const nickname = ref('')

    const closeModal = () => {
      showModal.value = false
    }

    const confirmNickname = () => {
      if (nickname.value.trim()) {
        console.log('昵称确认：', nickname.value)
        // 后面加跳转逻辑
        showModal.value = false
      }
    }

    return {
      showModal,
      nickname,
      closeModal,
      confirmNickname
    }
  }
}
</script>

<style scoped>
.main-page {
  text-align: center;
  padding: 50px;
}

.logo {
  font-size: 48px;
  margin-bottom: 30px;
}

.buttons button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 18px;
}

/* 模态框 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
}
</style>
