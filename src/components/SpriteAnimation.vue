<template>
  <canvas ref="canvas" :width="spriteX" :height="spriteYPerFrame"></canvas>
</template>

<script>
export default {
  name: "SpriteAnimation",
  props: {
    spriteX: {
      // スプライト画像の横幅
      default: 0,
      type: Number
    },
    spriteY: {
      // スプライト画像の縦幅
      default: 0,
      type: Number
    },
    num: {
      // スプライト画像のフレームの枚数
      default: 0,
      type: Number
    },
    fps: {
      // アニメーションのfps
      default: 0,
      type: Number
    },
    src: {
      // スプライト画像のパス(保存場所)
      default: '',
      type: String
    },
    autoplay: {
      default: false,
      type: Boolean
    },
    isStart: {
      // 親要素からの開始の信号をもらう
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      context: null,
      sprite: new Image(),
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
    this.autoplay && this.play()
  },
  methods: {
    init() {
      return new Promise(resolve => {
        this.sprite.onload = () => {
          resolve();
        };
        this.sprite.src = this.src;
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
          console.log("finish!!!");
          window.cancelAnimationFrame(id);
          this.$emit("onFinish")
          return;
        } else {
          id = window.requestAnimationFrame(loop);
        }
        this.drawSprite(frame);
        prevFrame = frame;
      };

      loop();
    },
  },
  watch: {
    isStart: function (value) {
      if(value) this.play()
    }
  }

}
</script>

<style scoped lang="scss">

</style>
