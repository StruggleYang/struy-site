<template>
<el-aside style="width:230px" class="hidden-xs-only">
    <div class="side-top">
        <el-tooltip content="为梦想而战！" placement="top">
        <h2>Struy-Site</h2>
        </el-tooltip>
    </div>
    <el-menu
      :default-active="actived"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#1b3c59"
      text-color="#fff"
      active-text-color="#ffd04b">
      <a class="item-href" v-on:click="jump(index)" v-for="(t,index) in topics" :key="index">
      <el-menu-item :index="''+(index+1)" >
        <i :class="t.icon"></i>
        <span slot="title">{{t.topic}}</span>
      </el-menu-item>
      </a>
    </el-menu>
    <!-- <el-menu
      default-active="1"
      class="el-menu-vertical-2"
      @open="handleOpen"
      @close="handleClose"
      background-color="#1b3c59"
      text-color="#fff"
      :router="true"
      active-text-color="#fff">
      <el-menu-item index="100" route="/search"  >
        <i class="el-icon-search"></i>
        <span slot="title">站外搜索</span>
      </el-menu-item>
    </el-menu> -->
</el-aside>
</template>
<style >
.el-menu {
    width:100%;
}
.el-aside {
    background-color: #1b3c59;
    overflow-x: hidden;
    overflow-y: auto;
    color: #a6ed8e;
    text-align: center;
    top: 0;
    bottom: 0;
    position:fixed;
  }
  .side-top {
      text-align: center;
      padding: 20px 5px;
  }
  .side-top img {
      cursor: pointer;
      outline: none;
  }
  .item-href{
      text-decoration: unset;
  }
</style>

<script>
export default {
  name: 'side',
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    jump (index) {
      let jump = document.querySelectorAll('.box-topic')
      // 获取需要滚动的距离
      let total = jump[index].offsetTop - 50
      // Chrome
      document.body.scrollTop = total
      // Firefox
      document.documentElement.scrollTop = total
      // Safari
      window.pageYOffset = total
    },
    onScroll () {
      // 当前据距离顶部高度
      let scrolled = document.documentElement.scrollTop || document.body.scrollTop
      // 所有的topic距离顶部的高度
      let topics = document.querySelectorAll('.box-topic')
      let arr = []
      for (const key in topics) {
        if (topics.hasOwnProperty(key)) {
          const element = topics[key]
          // 多出一点作为缓冲
          arr.push(element.offsetTop - 200)
        }
      }
      // 根据高度改变侧边栏的菜单未知index
      for (let i = 0, len = arr.length; i < len; i++) {
        if (scrolled > (i === 0 ? 0 : arr[i]) && scrolled < arr[i + 1]) {
          this.actived = '' + (i + 1)
        }
      }
    }
  },
  mounted: function () {
    // 监听屏幕滚动
    this.$nextTick(function () {
      window.addEventListener('scroll', this.onScroll)
    })

    // 获取主题数据
    //  ajax.get("../../static/data/topics.json",res => {
    //     this.topics = res.data;
    // })
  },
  props: {
    topics: Array
  },
  data: () => {
    return {
      actived: '1'
    }
  }
}
</script>
