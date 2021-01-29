<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
html,body{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
/* 自定义滚动条样式 */
::-webkit-scrollbar{width:6px;border-radius: 100%;}
::-webkit-scrollbar-track{background-color:#FFF;}
::-webkit-scrollbar-thumb{background-color:#f2f2f0;}
::-webkit-scrollbar-thumb:hover {background-color:#f2f2f0}
::-webkit-scrollbar-thumb:active {background-color:#f2f2f0}
</style>
