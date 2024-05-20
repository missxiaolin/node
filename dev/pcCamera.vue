<template>
  <div>
    <button @click="initCamera">打开摄像头</button>
    <button @click="stopCamera">关闭摄像头</button>
    <template v-if="mediaStream">
      <button @click="takePhoto">拍照</button>
      <button @click="startRecording" v-if="!isRecording">
        {{ !!recordedChunks.length && !isRecording ? "重新" : "开始" }}录像
      </button>
      <button
        @click="stopRecording"
        v-if="isRecording"
        :disabled="!isRecording"
      >
        停止录像
      </button>
      <button
        @click="uploadVideo"
        v-if="!!recordedChunks.length && !isRecording"
      >
        上传录像
      </button>
    </template>

    <video ref="video" autoplay width="640" height="480"></video>
    <!-- controls -->
    <canvas
      ref="canvas"
      style="display: none"
      width="640"
      height="480"
    ></canvas>
    <img ref="image" src="" />
    <video controls :src="videoUrl" v-if="videoUrl"></video>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mediaStream: null,
      video: null,
      canvas: null,
      recordedChunks: [],
      recorder: null,
      isRecording: false,
      videoUrl: "",
    }
  },
  methods: {
    /**
     * @description: 初始化相机
     * @return {*}
     */
    async createCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
        this.mediaStream = stream
        // console.log("this.mediaStream---", this.mediaStream)
        this.video.srcObject = stream
        this.video.play()
      } catch (err) {
        console.error(err)
      }
    },
    initCamera() {
      this.$nextTick(() => {
        this.video = this.$refs.video
        this.createCamera()
      })
    },
    stopCamera() {
      if (!this.mediaStream) {
        console.error("当前摄像头已关闭")
        return
      }
      this.mediaStream.getTracks().forEach(track => track.stop())
      this.mediaStream = null
      this.video = null
    },
    /**
     * @description: 拍照
     * @return {*}
     */
    takePhoto() {
      const { canvas, video } = this.$refs
      // 检查 canvas 和 video 是否已定义
      if (!canvas || !video) {
        console.error("Canvas或Video元素未定义")
        return
      }

      const context = canvas.getContext("2d")
      // 定义常量替代魔法数字
      const VIDEO_WIDTH = 640
      const VIDEO_HEIGHT = 480
      console.log("Video width--", this.mediaStream)
      // 检查 context 、video 是否包含有效内容 或 mediaStream 有效
      if (!context || !video.srcObject || !this.mediaStream) {
        console.error("画布上下文或视频内容不可用。")
        return
      }

      // 确保视频正在播放
      if (!video.paused) {
        try {
          context.drawImage(video, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT)
          // console.log("context---", context.canvas.toDataURL("image/png"))
          const imgBase64 = context.canvas.toDataURL("image/png")
          this.$refs.image.src = imgBase64
        } catch (error) {
          console.error("将图像绘制到画布或转换为数据URL时出错:", error)
        }
      } else {
        console.log("视频暂停。请先播放视频再拍照")
      }
    },
    /**
     * @description: 拍摄视频
     * @return {*}
     */
    async startRecording() {
      if (!this.mediaStream) {
        console.error("摄像头已关闭，请先开启摄像头")
        return
      }
      try {
        this.recorder = new MediaRecorder(this.mediaStream, {
          mimeType: "video/webm",
        })

        this.recorder.ondataavailable = this.handleDataAvailable
        this.recorder.start()
        this.isRecording = true
      } catch (error) {
        console.error("访问媒体设备出错：", error)
      }
    },

    handleDataAvailable(event) {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data)
      }
    },

    stopRecording() {
      this.recorder.stop()
      // this.mediaStream.getTracks().forEach(track => track.stop())
      this.isRecording = false
    },

    async uploadVideo() {
      if (this.recordedChunks.length === 0) return

      const blob = new Blob(this.recordedChunks, { type: "video/webm" })
      const url = URL.createObjectURL(blob)

      // 使用 axios 发送 POST 请求
      try {
        console.log("url---", url, blob)
        // const response = await axios.post(
        //   "/api/upload",
        //   {
        //     file: blob,
        //     fileName: "recorded_video.webm",
        //   },
        //   {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        //   },
        // )

        this.videoUrl = url // 假设服务器返回了新视频的URL
      } catch (error) {
        console.error("上传视频错误:", error)
      } finally {
        URL.revokeObjectURL(url)
      }
    },
  },
  mounted() {},
}
</script>

<style scoped>
button {
  margin-right: 10px;
}
</style>
