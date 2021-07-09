<template>
  <div class="root">
    <p>
      <button @click="start">アニメーション再生</button>
    </p>
    <SpriteAnimation
        :sprite-x="750"
        :sprite-y="48530"
        :num="46"
        :fps="15"
        :is-start="isStart"
        @onFinish="reset"
        src="/sprite.png"
    />
  </div>
</template>

<script>
import SpriteAnimation from "../components/SpriteAnimation";

export default {
  name: "Sprite",
  data() {
    return {
      isStart: false
    }
  },
  components: {
    SpriteAnimation
  },
  methods: {
    start() {
      this.isStart = true
    },
    reset() {
      this.isStart = false
    }
  }
}
</script>

<style scoped lang="scss">

</style>
