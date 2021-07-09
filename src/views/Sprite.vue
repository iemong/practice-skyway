<template>
<div class="root">
  <SpriteAnimation
      :sprite-x="750"
      :sprite-y="48530"
      :num="46"
      :fps="15"
      src="/sprite.png"
  />
</div>

</template>

<script>
import SpriteAnimation from "../components/SpriteAnimation";

export default {
  name: "Sprite",
  components: {
    SpriteAnimation
  }
}
</script>

<style scoped lang="scss">

</style>
