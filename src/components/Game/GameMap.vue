<template>
  <div>
    <div
        class="game-map"
        :style="{
        gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`
      }"
        @mouseup="endDrawing"
        @mouseleave="cancelDrawing"
    >
      <div
          v-for="(cell, index) in cells"
          :key="index"
          class="map-cell"
          :style="getCellStyle(index)"
          @mousedown="startDrawing(index)"
          @mouseenter="trackDrawing(index)"
      >
        {{ index }}
      </div>
    </div>
    <p>当前金币：{{ coins }}</p>
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

    // 状态码：[content, top, right, bottom, left, overlay]
    // content: 0=无, 1=道路, 2=房屋1, 3=房屋2, 4=房屋3, 5=重生门
    const cellStates = ref(
        Array.from({ length: columns * rows }, () => [0, 0, 0, 0, 0, 0])
    )
    console.log(cellStates.value[1])//调试总状态码控制器
    const coins = ref(1000)  // 初始金币

    let drawing = false
    let path = []

    // 虚拟预览的路径（不改变cells）
    let previewPath = ref([])

    const costPerTile = 50  // 每格50金币

    // 鼠标按下：开始记录路径，并记录起始格子
    const startDrawing = (index) => {
      if (props.currentTool === 'roadBuilder') {
        drawing = true
        path = [index]  // 把按下时的格子放进去
        previewPath.value = [index]
        console.log('开始绘制，起始格子：', index)
      }
    }

    // 鼠标经过：继续记录路径
    const trackDrawing = (index) => {
      if (drawing && props.currentTool === 'roadBuilder') {
        if (!path.includes(index)) {
          console.log(index)
          path.push(index)
          previewPath.value = [...path] // 更新预览路径
          console.log(previewPath.value)
        }
      }
    }

    // 鼠标松开：正式铺路
    const endDrawing = () => {
      if (drawing && props.currentTool === 'roadBuilder') {
        const totalCost = path.length * costPerTile
        console.log('需要金币：', totalCost, '当前金币：', coins.value)

        if (coins.value >= totalCost) {
          path.forEach(index => {
            cells.value[index] = roads.cross
          })
          coins.value -= totalCost
          console.log('铺设成功，剩余金币：', coins.value)
        } else {
          console.log('金币不足，铺设失败')
          // 不做任何修改
        }
      }

      drawing = false
      path = []
      previewPath.value = []
    }

    // 鼠标移出地图：取消绘制
    const cancelDrawing = () => {
      drawing = false
      path = []
      previewPath.value = []
    }

    // 给每个格子动态设置样式
    const getCellStyle = (index) => {
      const style = {
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        backgroundSize: 'cover'
      }

      if (cells.value[index]) {
        // 已经铺设好的道路
        style.backgroundImage = `url(${cells.value[index]})`
        style.opacity = '1'
      } else if (previewPath.value.includes(index)) {
        // 虚拟预览中的格子
        style.backgroundImage = 'gray'
        style.opacity = '0'  // 半透明
      } else {
        style.backgroundImage = 'none'
      }

      return style
    }

    return {
      columns,
      rows,
      cellSize,
      cells,
      coins,
      startDrawing,
      trackDrawing,
      endDrawing,
      cancelDrawing,
      getCellStyle
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
