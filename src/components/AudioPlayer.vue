<!--
 * 组件名：音乐播放器
 *
 * author： 黄旭
 -->
<template>
  <audio ref="audioRef" loop>
    <source :src="props.src" type="audio/mpeg" />
  </audio>
</template>

<script setup lang="ts" name="AudioPlayer">
import { Ref } from 'vue';

const props = defineProps({
  /**
   * 音乐地址
   */
  src: String
});

const audioRef = ref<HTMLAudioElement>() as Ref<HTMLAudioElement>;

/**
 * 播放
 */
const play = (): void => {
  audioRef.value.play();
};

/**
 * 停止
 */
const stop = (): void => {
  audioRef.value.pause();
  audioRef.value.currentTime = 0;
};

defineExpose({
  play,
  stop
});
</script>
