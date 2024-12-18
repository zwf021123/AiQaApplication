<template>
  <div id="addAppPage">
    <h2 style="margin-bottom: 32px">创建应用</h2>
    <a-form
      ref="formRef"
      :model="form"
      :style="{ width: '480px' }"
      :rules="formRules"
      label-align="left"
      auto-label-width
      @submit="handleSubmit"
    >
      <a-form-item field="appName" label="应用名称">
        <a-input v-model="form.appName" placeholder="请输入应用名称" />
      </a-form-item>
      <a-form-item field="appDesc" label="应用描述">
        <a-input v-model="form.appDesc" placeholder="请输入应用描述" />
      </a-form-item>
      <a-form-item field="appIcon" label="应用图标">
        <a-input
          v-model="form.appIcon"
          placeholder="请输入应用图标，未输入则使用默认图标"
        />
      </a-form-item>
      <!-- <a-form-item field="appIcon" label="应用图标">
        <PictureUploader
          :value="form.appIcon"
          :onChange="(value) => (form.appIcon = value)"
        />
      </a-form-item> -->
      <a-form-item field="appType" label="应用类型">
        <a-select
          v-model="form.appType"
          :style="{ width: '320px' }"
          placeholder="请选择应用类型"
        >
          <a-option
            v-for="(value, key) of APP_TYPE_MAP"
            :key="key"
            :value="Number(key)"
            :label="value"
          />
        </a-select>
      </a-form-item>
      <a-form-item field="scoringStrategy" label="评分策略">
        <a-select
          v-model="form.scoringStrategy"
          :style="{ width: '320px' }"
          placeholder="请选择评分策略"
        >
          <a-option
            v-for="(value, key) of APP_SCORING_STRATEGY_MAP"
            :key="key"
            :value="Number(key)"
            :label="value"
          />
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, Ref, ref, watchEffect, withDefaults } from "vue";
import API from "@/api";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import {
  createAppUsingPost,
  updateAppUsingPost,
  detailAppUsingGet,
} from "@/api/appController";
import { APP_SCORING_STRATEGY_MAP, APP_TYPE_MAP } from "@/constant/app";

interface Props {
  id: number;
}

const props = withDefaults(defineProps<Props>(), {
  id: (val) => {
    return Number(val);
  },
});

const router = useRouter();

const formRef = ref();
const form = ref({
  appDesc: "",
  appIcon: "",
  appName: "",
  appType: 0,
  scoringStrategy: 0,
} as API.AppCreateRequest);

const formRules = {
  appName: [
    {
      required: true,
      message: "应用名称是必要的",
    },
  ],
  appDesc: [
    {
      required: true,
      message: "应用描述是必要的",
    },
  ],
};

const oldApp = ref<API.AppVO>();

/**
 * 加载数据
 */
const loadData = async () => {
  if (!props.id) {
    return;
  }
  const res = await detailAppUsingGet({
    appId: props.id,
  });
  if (res.data.code === 0 && res.data.data) {
    oldApp.value = res.data.data;
    form.value = res.data.data;
  } else {
    message.error("获取数据失败，" + res.data.message);
  }
};

// 获取旧数据
watchEffect(() => {
  loadData();
});

/**
 * 提交
 */
const handleSubmit = async () => {
  // 校验表单
  const validateValue = await formRef.value.validate();
  if (validateValue) {
    return;
  }

  let res: any;
  try {
    // 修改应用
    if (props.id) {
      res = await updateAppUsingPost({
        id: props.id,
        ...form.value,
      });
    } else {
      // 创建应用
      res = await createAppUsingPost(form.value);
    }
    if (res.data.code === 0) {
      message.success("操作成功，即将跳转到应用详情页");
      setTimeout(() => {
        router.push(`/app/detail/${props.id || res.data.data}`);
      }, 3000);
    } else {
      message.error("操作失败，" + res.data.message);
    }
  } catch (error) {
    message.error("获取数据失败，系统错误");
  }
};
</script>
