<template>
  <div
      class="game-map"
      :style="{
      gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
      gridTemplateRows: `repeat(${rows}, ${cellSize}px)`
    }"
      @mousedown="startDrawing"
      @mouseup="endDrawing"
      @mouseleave="cancelDrawing"
      @mousemove="trackDrawing"
  >
    <div
        v-for="(cell, index) in cells"
        :key="index"
        class="map-cell"
        :style="{
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        backgroundImage: cell ? `url(${cell})` : 'none',
        backgroundSize: 'cover'
      }"
    >
      {{ index }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { roads} from '@/assets/index.js'

export default {
  props: ['currentTool'],
  setup(props) {
    // 地图配置（可以自由修改）
    const columns = 20  // 列数
    const rows = 15     // 行数
    const cellSize = 50 // 每格尺寸（px）
    const cells = ref(Array(columns * rows).fill(null))

    let drawing = false
    let path = []

    const gap = 2   // grid 的 gap
    const border = 2  // map-cell 的 border

    // 每格真实的尺寸
    const realCellSize = cellSize + gap + border * 2

    const getCellIndex = (event) => {
      const rect = event.target.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const col = Math.floor(x / realCellSize)
      const row = Math.floor(y / realCellSize)
      const index = row * columns + col
      return (index >= 0 && index < cells.value.length) ? index : -1
    }

    const startDrawing = (event) => {
      if (props.currentTool === 'roadBuilder') {
        drawing = true
        path = []
        const index = getCellIndex(event)
        if (index !== -1) {
          path.push(index)
        }
      }
    }

    const trackDrawing = (event) => {
      if (drawing && props.currentTool === 'roadBuilder') {
        const index = getCellIndex(event)
        if (index !== -1 && !path.includes(index)) {
          path.push(index)
        }
      }
    }

    const endDrawing = () => {
      if (drawing && props.currentTool === 'roadBuilder') {
        path.forEach(index => {
          cells.value[index] = roads.cross  // 先用十字路口的图片，后面再换动态样式
        })
      }
      drawing = false
      path = []
    }

    const cancelDrawing = () => {
      drawing = false
      path = []
    }

    return {
      columns,
      rows,
      cellSize,
      cells,
      startDrawing,
      trackDrawing,
      endDrawing,
      cancelDrawing
    }
  }
}
</script>

<style scoped>
.game-map {
  display: grid;
  gap: 2px;
  justify-content: center;
  border: 2px solid #666;
  background-color: #ccc;
  user-select: none;
}

.map-cell {
  background-color: #eee;
  border: 1px solid #999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.map-cell:hover {
  background-color: #ddd;
}
</style>
