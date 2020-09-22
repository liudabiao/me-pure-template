<template>
  <div class="logo">
    <router-link :to="{name:'defaultIndex'}">
      <LogoSvg alt="logo" />
      <h1 v-if="showTitle">{{ assist.title }}</h1>
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'
import assist from '@/config/assist.config'
export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: 'Ant Design Pro',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data() {
    return {
      assist
    }
  }
}
</script>
