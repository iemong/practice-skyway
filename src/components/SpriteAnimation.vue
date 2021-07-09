<template>
  <canvas ref="canvas" :width="spriteX" :height="spriteYPerFrame"></canvas>
</template>

<script>
export default {
  name: "SpriteAnimation",
  data() {
    return {
      spriteX: 750,
      spriteY: 48530,
      num: 46,
      context: null, //canvas.getContext("2d")
      sprite: new Image(),
      fps: 15
    }
  },
  computed: {
    spriteYPerFrame() {
      return this.spriteY / this.num;
    }
  },
  async mounted() {
    await this.init()
    this.context = this.$refs.canvas.getContext('2d')
    this.play()
  },
  methods: {
    init() {
      return new Promise(resolve => {
        this.sprite.onload = () => {
          resolve();
        };
        this.sprite.src = "/sprite.png";
      });
    },
    drawSprite(index) {
      this.context.clearRect(0, 0, this.spriteX, this.spriteY);
      this.context.drawImage(
          this.sprite,
          0,
          this.spriteYPerFrame * index,
          this.spriteX,
          this.spriteYPerFrame,
          0,
          0,
          this.spriteX,
          this.spriteYPerFrame
      );
    },
    play(repeat = false) {
      const startTime = performance.now();

      let prevFrame = 0;
      let id = 0;
      const loop = () => {
        const lastTime = performance.now();
        const frame = Math.floor(
            ((lastTime - startTime) / (1000 / this.fps)) % (this.num + 1)
        );
        if (prevFrame > frame && !repeat) {
          console.log("loop!!!");
          window.cancelAnimationFrame(id);
          return;
        } else {
          id = window.requestAnimationFrame(loop);
        }
        this.drawSprite(frame);
        prevFrame = frame;
      };

      loop();
    }
  }
}
</script>

<style scoped lang="scss">

</style>
