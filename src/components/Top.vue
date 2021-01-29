<template>
    <a class="go-top" :style="'display:'+display" href="javascript:void(0)" @click="gotop()">
        <span><i class="el-icon-caret-top"></i>回顶部</span>
    </a>
</template>
<style>
.go-top{
    padding: 10px 10px;
    position: fixed;
    z-index: 999;
    right: 15px;
    bottom: 30px;
    font-size: 16px;
    border: 1px solid #DDD;
    display: block;
    width: 18px;
    height: 65px;
    background: #fff;
    line-height: 100%;
    color: #DDD;
    text-decoration: unset;
}
.go-top:hover,
.go-top:focus{
    color: #918e8e;
    text-decoration: none;
}
</style>
<script>
export default {
  methods: {
    gotop: () => {
      // Chrome
      document.body.scrollTop = 0
      // Firefox
      document.documentElement.scrollTop = 0
      // Safari
      window.pageYOffset = 0
    },
    onScroll () {
      // 当前据距离顶部高度
      let scrolled = document.documentElement.scrollTop || document.body.scrollTop
      // 所有的topic距离顶部的高度
      let topics = document.querySelectorAll('.box-topic')
      // 超过第一个则出现回到顶部
      if (scrolled > topics[0].offsetTop) {
        this.display = 'block'
      } else {
        this.display = 'none'
      }
    }
  },
  data: () => {
    return {
      display: 'none'
    }
  },
  mounted: function () {
    // 监听屏幕滚动
    this.$nextTick(function () {
      window.addEventListener('scroll', this.onScroll)
    })
  }
}
</script>
