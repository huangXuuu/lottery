<template>
  <el-dialog
    v-model="dialogVisible"
    width="840px"
    title="头像剪裁"
    :draggable="true"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    @close="onClose"
  >
    <div class="container">
      <div class="cropper-body">
        <VueCropper
          ref="cropperRef"
          :img="cropperImgSelf"
          :outputType="'jpeg'"
          :autoCrop="true"
          :autoCropWidth="cropWidth"
          :autoCropHeight="cropHeight"
          @imgLoad="onImgLoad"
        ></VueCropper>
      </div>
    </div>
    <template #footer>
      <el-button class="footer-btn" @click="onSelectButtonClick">选择图片</el-button>
      <el-button type="success" :disabled="!cropperImgSelf" @click="onOkButtonClick">保存</el-button>
      <input
        class="display-none"
        type="file"
        id="selectImg"
        ref="selectImgRef"
        accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="onUploadImg"
      />
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import 'vue-cropper/dist/index.css';
import { VueCropper } from 'vue-cropper';

import { MinImage } from '@/commons/constants';

const props = defineProps({
  modelValue: Boolean,
  cropperImg: String
});

const emit = defineEmits(['update:modelValue', 'imageUploaded']);

const modelValue = toRef(props, 'modelValue');
const cropperImg = toRef(props, 'cropperImg');

const dialogVisible = computed({
  get: () => modelValue.value,
  set: value => {
    emit('update:modelValue', value);
  }
});

/**
 * 上传的图片
 */
const cropperImgSelf = ref('');

watch(
  cropperImg,
  (val): void => {
    cropperImgSelf.value = val as string;
  },
  { immediate: true }
);

/**
 * 画像剪裁器Ref
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cropperRef = ref<any>(null);

/**
 * 画像剪裁器宽度
 */
const cropWidth = ref('');

/**
 * 画像剪裁器高度
 */
const cropHeight = ref('');

/**
 * 画像上传inputRef
 */
const selectImgRef = ref<HTMLInputElement>();

/**
 * 弹框关闭后处理
 */
const onClose = (): void => {
  emit('update:modelValue', false);
};

const onImgLoad = (): void => {
  if (!cropperRef.value) {
    return;
  }
  changeCrop(cropperRef.value.trueWidth, cropperRef.value.trueHeight);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onUploadImg = (event: any): void => {
  const file = event.target.files[0];

  const reader = new FileReader();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reader.onload = (e: any): void => {
    const image = new Image();
    let data;

    if (typeof e.target.result === 'object') {
      image.src = window.URL.createObjectURL(new Blob([e.target.result]));
    } else {
      image.src = e.target.result;
    }

    image.onload = (): void => {
      const imgWidth = image.width;
      const imgHeight = image.height;
      data = image.src;
      changeCrop(imgWidth, imgHeight);
      cropperImgSelf.value = data;
    };
  };

  reader.readAsArrayBuffer(file);
};

/**
 * 更改屏幕截图框的宽度和高度
 *
 * @param {number} imgWidth 宽
 * @param {number} imgHeight 高
 * @returns {void}
 */
const changeCrop = (imgWidth: number, imgHeight: number): void => {
  cropWidth.value = Math.min(imgWidth, MinImage.Width) + 'px';
  cropHeight.value = Math.min(imgHeight, MinImage.Height) + 'px';
};

/**
 * 选择图片按钮点击后处理
 *
 * @returns {void}
 */
const onSelectButtonClick = (): void => {
  const inputEl = selectImgRef.value;
  if (!inputEl) {
    return;
  }

  if (inputEl.value) {
    inputEl.value = '';
  }

  inputEl.click();
};

/**
 * 保存按钮点击后处理
 *
 * @returns {void}
 */
const onOkButtonClick = (): void => {
  cropperRef.value.getCropData((data: Blob) => {
    emit('imageUploaded', data);
    dialogVisible.value = false;
  });
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;

  .cropper-body {
    width: 800px;
    height: 480px;
    margin: 0 auto 12px;
  }
}

.display-none {
  position: absolute;
  clip: rect(0 0 0 0);
}

.footer-btn {
  margin-right: 12px;
}
</style>
