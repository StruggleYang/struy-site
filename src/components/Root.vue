<template>
  <el-container>
    <side :topics="topics" ref="side"></side>
    <context ref="context"></context>
    <gotop ref="gotop"></gotop>
  </el-container>
</template>
<script>
import Side from '@/components/Side'
import Context from '@/components/Main'
import Top from '@/components/Top'
import ajax from '@/components/Ajax'
export default {
  components: {
    side: Side,
    context: Context,
    gotop: Top
  },
  data: () => {
    return {topics: []}
  },
  mounted: function () {
    // 获取主题数据
    ajax.get('../../static/data/topics.json', res => {
      this.topics = res.data
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container{
  min-height: 100%;
}
</style>
