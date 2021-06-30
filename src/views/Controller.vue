<template>
  <div class="controller">
    <div :key="index" v-for="(button, index) in buttons">
      <!-- 対応表の結果が""だったら表示しない   -->
      <p v-if="buttonMapping.get(index)">
        Button {{ buttonMapping.get(index) }} : {{ button }}
      </p>
    </div>
    <div :key="index" v-for="(axis, index) in axes">
      <!-- indexが0の時はx軸, 1の時はy軸   -->
      <p>JoyStick{{ index === 0 ? 'X' : 'Y' }} : {{ axis }}</p>
    </div>
  </div>
</template>

<script>
// buttonのindex(データの順番)と実際のボタンの対応表
const buttonMappingMap = new Map([
    [0, "▼"],
    [1, "▶︎"],
    [2, "◀︎︎"],
    [3, "▲︎︎"],
    [4, "SL︎︎"],
    [5, "SR︎︎"],
    [6, "ZL︎"],
    [7, ""],
    [8, "L"],
    [9, "-︎︎"],
    [10, "◉︎︎"],
    [11, ""],
    [12, ""],
    [13, ""],
    [14, ""],
    [15, ""],
    [16, "🇯🇵︎︎"],
])
export default {
  name: "Controller",
  data() {
    return {
      timerId: null,
      buttons: [],
      axes: []
    }
  },
  computed: {
    buttonMapping() {
      return buttonMappingMap
    }
  },
  methods: {
    connected(e) {
      console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
          e.gamepad.index, e.gamepad.id,
          e.gamepad.buttons.length, e.gamepad.axes.length);

      this.ticker()
    },
    disconnected(e) {
      console.log("Gamepad disconnected from index %d: %s",
          e.gamepad.index, e.gamepad.id);
      this.stop()
    },
    ticker() {
      // コントローラーの全ての値をbuttonとaxesに保存するloop
      const loop = () => {
        const controllers = navigator.getGamepads();
        const controller = Array.from(controllers).find(c => !!c);
        this.buttons = controller.buttons.map(button => button.pressed);
        this.axes = controller.axes.map(axis => axis.toFixed(4));
        this.timerId = requestAnimationFrame(loop)
      }
      this.timerId = requestAnimationFrame(loop)
    },
    stop() {
      cancelAnimationFrame(this.timerId)
      this.timerId = null
    }
  },
  watch: {
    buttons: function (buttonsValue) {
      if (buttonsValue[0] === true) {
        console.log(this.buttonMapping.get(0), 'が押されてます')
      }
      if (buttonsValue[1] === true) {
        console.log(this.buttonMapping.get(1), 'が押されてます')
      }
      if (buttonsValue[2] === true) {
        console.log(this.buttonMapping.get(2), 'が押されてます')
      }
      if (buttonsValue[3] === true) {
        console.log(this.buttonMapping.get(3), 'が押されてます')
      }
    }
  },
  mounted() {
    // 接続された時に発火する
    window.addEventListener("gamepadconnected", this.connected);
    // 接続が切れた時に発火する
    window.addEventListener("gamepaddisconnected", this.disconnected);
  },
  // 他のページに遷移するときはOFFにする
  beforeUnmount() {
    window.removeEventListener("gamepadconnected", this.connected);
    window.removeEventListener("gamepaddisconnected", this.disconnected);
  }
}
</script>

<style scoped lang="scss">

</style>
