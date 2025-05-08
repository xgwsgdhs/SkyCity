<template>
  <div class="game-container">
    <!-- 游戏地图 -->
    <div class="game-map" @mouseleave="stopDrag">
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
            @mousedown="startDrag(rowIndex, colIndex)"
            @mouseup="stopDrag"
            @mouseenter="dragMove(rowIndex, colIndex)"
            :style="{
            backgroundImage: 'url(' + getRoadImage(cell) + ')',
            backgroundSize: 'cover'
          }"
            draggable="false"
        >
<!--          列：{{ rowIndex }}-->
<!--          行：{{ colIndex }}-->
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
import { roads } from '@/assets/index.js';
export default {
  data() {
    return {
      // 初始化一个20行15列的二维数组
      map: Array.from({ length: 20 }, () => Array(15).fill(null)),
      coins: 3000, // 初始金币数
      timer: 100,  // 初始时间
      dragging: false, // 判断是否在拖拽
      toolType: 'roadBuilder', // 当前使用的工具
    };
  },
  methods: {
    // 启动拖拽
    startDrag(rowIndex, colIndex) {
      console.log(rowIndex,colIndex)
      if (this.toolType === 'roadBuilder' && this.coins >= 50) {
        this.dragging = true;
        this.placeRoad(rowIndex, colIndex);
      }
    },

    // 停止拖拽
    stopDrag() {
      this.dragging = false;
    },

    // 移动时绘制
    dragMove(rowIndex, colIndex) {
      if (this.dragging) {
        console.log(rowIndex, colIndex);
        if (rowIndex >= 0 && rowIndex < 20 && colIndex >= 0 && colIndex < 15) {
          this.placeRoad(rowIndex, colIndex);
        }
      }
    },

    // 绘制路面
    placeRoad(rowIndex, colIndex) {
      console.log(this.map[rowIndex][colIndex])
      if (this.map[rowIndex][colIndex] === null && this.coins >= 50) {
        // 在地图上铺设路面
        this.map[rowIndex][colIndex] = 'cross';
        this.coins -= 50; // 每铺设一个格子，消耗50金币
      }
    },
    // 获取对应的道路图片
    getRoadImage(roadType) {
      return roads[roadType] || ''; // 返回对应道路类型的图片路径
    },

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
  cursor: pointer;
  user-select: none; /* 禁止选择文本 */
}

.game-cell.road {
  background-color: #8b4513; /* 模拟铺设的路面颜色 */
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
