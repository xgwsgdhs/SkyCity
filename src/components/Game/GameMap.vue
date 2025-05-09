<template>
  <div class="game-container">
    <!-- 游戏地图 -->
    <div class="game-map" @mouseleave="endDrag">
      <div
          v-for="(row, rowIndex) in map"
          :key="'row-' + rowIndex"
          class="game-row"
      >
        <div
            v-for="(cell, colIndex) in row"
            :key="'cell-' + colIndex"
            class="game-cell"
            @click="changeStyle(rowIndex, colIndex)"
            @mousedown="startDrag(rowIndex, colIndex)"
            @mouseup="stopDrag"
            @mouseenter="dragMove(rowIndex, colIndex)"
            :style="{
            backgroundImage: 'url(' + getRoadImage(cell) + ')',
            backgroundSize: 'cover',
            backgroundColor: draggingPreview && isPreviewCell(rowIndex, colIndex) ? '#d3d3d3' : '' // 预览的灰色背景
          }"
            draggable="false"
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
import {roads} from '@/assets/index.js';

export default {
  props: {
    currentTool: {
      type: String,
      default: 'none'
    }
  },
  data() {
    return {
      // 初始化一个20行15列的二维数组
      map: Array.from({ length: 20 }, () => Array(15).fill(null)),
      coins: 3000, // 初始金币数
      timer: 100,  // 初始时间
      dragging: false, // 判断是否在拖拽
      draggingPreview: false, // 判断是否正在拖动铺设预览
      previewCells: [], // 存储正在拖拽的路径格子
      roadTypes: [
        'bottomEnd', 'cross', 'end', 'horizontal', 'Lbend',
        'LbendHorizontalReverse', 'LbendMirror', 'LbendVerticalReverse',
        'leftEnd', 'rightEnd', 'Tjunction', 'TjunctionLeft',
        'TjunctionReverse', 'TjunctionRight', 'topEnd', 'vertical'
      ],
    };
  },
  computed: {
    toolType() {
      return this.currentTool;
    }
  },
  methods: {
    // 启动拖拽
    startDrag(rowIndex, colIndex) {
      // console.log(rowIndex,colIndex)
      if (this.toolType === 'roadBuilder' && this.coins >= 50) {
        this.dragging = true;
        this.previewCells = [{ row: rowIndex, col: colIndex }];
        this.draggingPreview = true;
      }
    },

    // 超出窗口
    endDrag() {
      this.dragging = false;
      this.draggingPreview = false;
    },

    stopDrag() {
      if (this.draggingPreview && this.coins >= 50*this.previewCells.length) {
        // 确认铺设的道路，且金币足够
        this.previewCells.forEach(cell => {
          this.placeRoad(cell.row, cell.col);
          this.changeNeighbor(cell.row, cell.col)
        });
      }
      this.dragging = false;
      this.draggingPreview = false;
      this.previewCells = [];
    },

    // 移动时绘制
    dragMove(rowIndex, colIndex) {
      if (this.dragging) {
        const newPreviewCells = [...this.previewCells];
        const lastPreviewCell = newPreviewCells[newPreviewCells.length - 1];

        // 判断是否继续拖动路径
        if (this.canAddToPreview(lastPreviewCell, rowIndex, colIndex)) {
          newPreviewCells.push({ row: rowIndex, col: colIndex });
          this.previewCells = newPreviewCells;
        }
      }
    },

    canAddToPreview(lastCell, rowIndex, colIndex) {
      // 检查是否可以继续添加格子到路径中（这里的逻辑可以根据实际要求调整）
      return !this.previewCells.some(cell => cell.row === rowIndex && cell.col === colIndex);
    },

    isPreviewCell(rowIndex, colIndex) {
      return this.previewCells.some(cell => cell.row === rowIndex && cell.col === colIndex);
    },

    // 绘制路面
    placeRoad(rowIndex, colIndex) {
      // console.log(this.map[rowIndex][colIndex])
      const style = this.changeStyle(rowIndex,colIndex)
      if (this.map[rowIndex][colIndex] === null && this.coins >= 50) {
        this.map[rowIndex][colIndex] = style; // 假设是横向路面
        this.coins -= 50; // 每铺设一个格子，消耗50金币

      }
    },
    // 获取对应的道路图片 传入图片名称即可
    getRoadImage(roadType) {
      return roads[roadType] || ''; // 返回对应道路类型的图片路径
    },

    // 改变点击格子上下左右相邻格子的颜色
    changeStyle(rowIndex, colIndex) {//传入当前格子位置即可
      // 获取四个方向的格子索引
      const neighbors = [
        { row: rowIndex - 1, col: colIndex }, // 上
        { row: rowIndex + 1, col: colIndex }, // 下
        { row: rowIndex, col: colIndex - 1 }, // 左
        { row: rowIndex, col: colIndex + 1 }, // 右
      ];
      let resultList = [];  // 定义一个空列表来存储结果
      // [{…}, {…}, {…}, {…}]

      // 临时改变颜色
      neighbors.forEach((neighbor) => {
        const { row, col } = neighbor;
        if (row >= 0 && row < 20 && col >= 0 && col < 15) {
          const have = this.roadTypes.includes(this.map[row][col])
          resultList.push(have) //[左, 右, 上, 下, ]状态
        }else {
          resultList.push(false)
        }
      });

      // console.log(resultList);

      let trueCount = resultList.filter(value => value === true).length;

      if (trueCount === 0) {//[左, 右, 上, 下, ]状态
        return "end"
      } else if (trueCount === 1) {//[左, 右, 上, 下, ]状态

        if (resultList[0]===true){
          return "rightEnd"
        }else if (resultList[1]===true){
          return "leftEnd"
        }else if (resultList[2]===true){
          return "bottomEnd"
        }else if (resultList[3]===true){
          return "topEnd"
        }

      }else if (trueCount === 2) {//[左, 右, 上, 下, ]状态

        if (resultList[0]===true && resultList[1]===true){
          return "horizontal"
        }else if (resultList[1]===true && resultList[2]===true){
          return "Lbend"
        }else if (resultList[2]===true && resultList[3]===true){
          return "vertical"
        }else if (resultList[0]===true && resultList[2]===true){
          return "LbendVerticalReverse"
        }else if (resultList[0]===true && resultList[3]===true){
          return "LbendMirror"
        }else if (resultList[1]===true && resultList[3]===true){
          return "LbendHorizontalReverse"
        }


      }else if (trueCount === 3) {//[左, 右, 上, 下, ]状态

        if (resultList[0]===true && resultList[1]===true && resultList[2]===true){
          return "TjunctionReverse"
        }else if (resultList[1]===true && resultList[2]===true && resultList[3]===true){
          return "TjunctionRight"
        }else if (resultList[0]===true && resultList[1]===true && resultList[3]===true){
          return "Tjunction"
        }else if (resultList[0]===true && resultList[2]===true && resultList[2]===true){
          return "TjunctionLeft"
        }
      }else if (trueCount === 4) {
        return "cross"
      }

    },

    changeNeighbor(rowIndex, colIndex) {
      // 获取四个方向的格子索引
      const neighbors = [
        { row: rowIndex - 1, col: colIndex }, // 上
        { row: rowIndex + 1, col: colIndex }, // 下
        { row: rowIndex, col: colIndex - 1 }, // 左
        { row: rowIndex, col: colIndex + 1 }, // 右
      ];

      neighbors.forEach((neighbor) => {
        const { row, col } = neighbor;
        // console.log(this.roadTypes.includes(this.map[row][col]))判断邻格有没有路
        if (this.roadTypes.includes(this.map[row][col])) {
          this.map[row][col] = this.changeStyle(row, col);//返回的是格子的名称
        }
      });
    }

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
