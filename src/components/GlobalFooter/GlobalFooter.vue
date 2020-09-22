<template>
  <div class="footer">
    <div v-if="assist.help" class="links">
      <a
        v-for="(item, index) in assist.helpLink"
        :key="index"
        :href="item.link"
        target="_blank"
      >{{item.title}}</a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright" />
      {{assist.copyright}}
    </div>
  </div>
</template>

<script>
import assist from '@/config/assist.config'
export default {
  name: 'GlobalFooter',
  data() {
    return { assist }
  }
}
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
