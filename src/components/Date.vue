<template>
    <span class="date-block" >{{year}}-{{month}}-{{day}} 周{{dayOfWeek}} {{hour}}:{{minutes}}:{{second}}</span>
</template>
<style>
.date-block{
    text-align: left;
    display: inline-block;
    font-size:16px;
    margin-top:10px;
}
</style>

<script>
export default {
  data: () => {
    return {
      year: '',
      month: '',
      day: '',
      dayOfWeek: '',
      hour: '',
      minutes: '',
      second: ''
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      setInterval(this.timer, 1000)
    })
  },
  methods: {
    timer: function () {
      var myDate = new Date()
      this.year = myDate.getFullYear()
      this.month = myDate.getMonth() + 1
      this.day = myDate.getDate()
      this.dayOfWeek = this.getWeek(myDate.getDay())
      this.hour = myDate.getHours()
      this.minutes = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()
      this.second = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds()
    },
    getWeek: function (dayOfWeek) {
      var day
      switch (dayOfWeek) {
        case 0:
          day = '日'
          break
        case 1:
          day = '一'
          break
        case 2:
          day = '二'
          break
        case 3:
          day = '三'
          break
        case 4:
          day = '四'
          break
        case 5:
          day = '五'
          break
        case 6:
          day = '六'
          break
      }
      return day
    }
  }
}
</script>
