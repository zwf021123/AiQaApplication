<template>
  <a-card class="appCard" hoverable @click="doCardClick">
    <template #actions>
      <!--      <span class="icon-hover"> <IconThumbUp /> </span>-->
      <span class="icon-hover" @click="doShare"> <IconShareInternal /> </span>
    </template>
    <template #cover>
      <div
        :style="{
          height: '204px',
          overflow: 'hidden',
        }"
      >
        <img
          :style="{ width: '100%', transform: 'translateY(-20px)' }"
          :alt="app.appName"
          :src="false || require('@/assets/questionnaire.jpg')"
        />
      </div>
    </template>
    <a-card-meta :description="app.appDesc">
      <template #title>
        <div class="title">
          <div class="title-front">
            {{ app.appName }}
          </div>
          <div
            class="title-end"
            v-if="app.reviewStatus !== undefined && app.reviewStatus !== null"
          >
            <a-tag
              size="small"
              :color="REVIEW_STATUS_COLOR_MAP[app.reviewStatus]"
              >{{ app.reviewStatusName }}</a-tag
            >
          </div>
        </div>
      </template>
      <template #avatar>
        <div
          :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
        >
          <a-avatar
            :size="24"
            :image-url="false || require('@/assets/defaultAvatar.png')"
            :style="{ marginRight: '8px' }"
          />
          <a-typography-text>{{ app.createUser ?? "无名" }} </a-typography-text>
        </div>
      </template>
    </a-card-meta>
  </a-card>
  <ShareModal :link="shareLink" title="应用分享" ref="shareModalRef" />
</template>

<script setup lang="ts">
import { IconShareInternal } from "@arco-design/web-vue/es/icon";
import API from "@/api";
import { defineProps, ref, withDefaults } from "vue";
import { useRouter } from "vue-router";
import ShareModal from "@/components/ShareModal.vue";
import { REVIEW_STATUS_COLOR_MAP } from "@/constant/app";

interface Props {
  app: API.AppVO;
}

const props = withDefaults(defineProps<Props>(), {
  app: () => {
    return {};
  },
});

const router = useRouter();
const doCardClick = () => {
  router.push(`/app/detail/${props.app.id}`);
};

// 分享弹窗的引用
const shareModalRef = ref();

// 分享链接
const shareLink = `${window.location.protocol}//${window.location.host}/app/detail/${props.app.id}`;

// 分享
const doShare = (e: Event) => {
  if (shareModalRef.value) {
    shareModalRef.value.openModal();
  }
  // 阻止冒泡，防止跳转到详情页
  e.stopPropagation();
};
</script>
<style scoped>
.appCard {
  cursor: pointer;
  :deep(.title) {
    display: flex;
    justify-content: space-between;
  }
}

.icon-hover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: all 0.1s;
}

.icon-hover:hover {
  background-color: rgb(var(--gray-2));
}
</style>
