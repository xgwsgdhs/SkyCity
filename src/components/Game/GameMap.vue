<template>
  <div class="game-container">
    <!-- 游戏地图 -->
    <div class="game-map" @mousedown="startDrawing" @mouseup="stopDrawing" @mousemove="drawing">
      <div
          v-for="(row, rowIndex) in map"
          :key="'row-' + rowIndex"
          class="game-row"
      >
        <div
            v-for="(cell, colIndex) in row"
            :key="'cell-' + colIndex"
            class="game-cell"
            @click="changeNeighborColors(rowIndex, colIndex)"
        >
          列：{{ rowIndex }}
          行：{{ colIndex }}
        </div>
      </div>
    </div>

    <!-- 时间和金币显示 -->
    <div class="info-panel">
      <div class="coins">
        <span>金币：{{ coins }}</span>
      </div>
      <div class="timer">
        <span>时间：{{ timer }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 初始化一个20行15列的二维数组
      map: Array.from({ length: 20 }, () => Array(15).fill(null)),
      coins: 3000, // 初始金币数
      timer: 100,  // 初始时间
      selectedTool: null, // 当前选择的工具
      isDrawing: false, // 是否正在绘制路面
      drawingStart: null, // 绘制起点
    };
  },
  methods: {
    // 改变点击格子上下左右相邻格子的颜色
    changeNeighborColors(rowIndex, colIndex) {
      // 获取四个方向的格子索引
      const neighbors = [
        { row: rowIndex - 1, col: colIndex }, // 上
        { row: rowIndex + 1, col: colIndex }, // 下
        { row: rowIndex, col: colIndex - 1 }, // 左
        { row: rowIndex, col: colIndex + 1 }, // 右
      ];

      // 临时改变颜色
      neighbors.forEach((neighbor) => {
        const { row, col } = neighbor;
        if (row >= 0 && row < 20 && col >= 0 && col < 15) {
          // 找到有效的格子，改变颜色
          const cell = this.$el.querySelectorAll('.game-row')[row].children[col];
          cell.style.backgroundColor = 'yellow';
        }
      });

      // 1秒后恢复原颜色
      setTimeout(() => {
        neighbors.forEach((neighbor) => {
          const { row, col } = neighbor;
          if (row >= 0 && row < 20 && col >= 0 && col < 15) {
            // 恢复颜色
            const cell = this.$el.querySelectorAll('.game-row')[row].children[col];
            cell.style.backgroundColor = '#f0f0f0'; // 恢复原背景色
          }
        });
      }, 1000);
    },
  },
};

</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.game-map {
  display: grid;
  grid-template-columns: repeat(20, 50px); /* 20列 */
  grid-template-rows: repeat(15, 50px);    /* 15行 */
  gap: 2px;  /* 格子之间的间距 */
}

.game-cell {
  width: 50px;
  height: 50px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
}

.info-panel {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.coins,
.timer {
  font-size: 18px;
  font-weight: bold;
}
</style>
