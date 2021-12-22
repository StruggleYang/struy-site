<template>
    <el-main>
        <el-card class="box-card" >
            <!--<i style="float: left;" class="el-icon-loading"></i>-->
            <span class="box-title">{{index_title}}</span>
            <!--<i style="float: right;" class="el-icon-loading"></i>-->
        </el-card>
        <currdate ref="currdate"></currdate>
        <div style="margin-top: 10px;">
        <el-input placeholder="请输入内容,下拉可选择搜索引擎" v-model="search_keyword" :autofocus="true" class="input-with-select"  @keyup.native.enter="execSearch(search_selectd,search_keyword)" clearable>
            <el-select v-model="search_selectd" slot="prepend"  placeholder="请选择">
                <el-option label="站内" value="1" ></el-option>
                <el-option label="Bing" value="2"></el-option>
                <el-option label="Baidu" value="3"></el-option>
                <el-option label="Google" value="4"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="execSearch(search_selectd,search_keyword)"></el-button>
        </el-input>
        </div>
        <template v-if="topics.length===0">
            <p>{{not_context}}</p>
            <p>没找到想要的链接？</p>
            <p><a class="not_context_mail" href="struy">我要推荐</a></p>
        </template>
        <el-card class="box-card link-box" v-for="(t,index) in topics" :key="index" shadow="hover">
            <el-tag class="box-topic" type="success" :index="index">{{t.topic}}</el-tag>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" v-for="(l,index) in t.links" :key="index" :offset="0">
                    <el-tooltip  placement="top">
                    <div slot="content">
                        <a class="tooltip-context" title="点击复制到粘贴板" @click="copyText()" href="javascript:void(0)">{{l.href}}</a>
                        <input id="copyrelay" style="display:none" :value="l.href"/>
                    </div>

                    <el-card style="margin: 10px 0" :body-style="{ padding: '0px'}" shadow="hover">
                        <div style="padding: 10px;">
                            <a class="cursor-box" :href="l.href" target="_blank">
                            <div class="box-title">
                                <span class="card-icon">
                                    <img  :src="l.icon">
                                </span>
                                <span class="card-top">{{l.title}}</span>
                            </div>
                            </a>
                                <small class="small-text">{{l.notes}}</small>
                        </div>
                    </el-card>
                    </el-tooltip>
                </el-col>
            </el-row>
        </el-card>
        <!-- 预留位置，广告位？ -->
        <!--<el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" v-for="(l,index) in 2" :key="index" :offset="0">
                <el-card class="box-card" shadow="never" >
                </el-card>
            </el-col>
        </el-row>-->
        <el-card class="box-card" shadow="never" >
            <a class="footer-text" target="_blank" href="http://struy.cn">Copyright © {{new Date().getFullYear()}} struy</a>
        </el-card>
    </el-main>
</template>
<script>
import ajax from '@/components/Ajax'
import DateC from '@/components/Date'
export default {
  name: 'context',
  // created => mounted
  components: {
    currdate: DateC
  },
  mounted: function () {
    ajax.get('../../static/data/main.json', res => {
      this.index_title = res.data.index_title
      this.not_context = res.data.not_context
    })

    // 获取主题数据
    ajax.get('../../static/data/topics.json', res => {
      this.topics = res.data
    })
  },
  methods: {
    execSearch: function (selectd, keyword) {
      ajax.get('../../static/data/topics.json', res => {
        let topics = res.data
        switch (Number.parseInt(selectd)) {
          // 站内
          case 1: this.findByInner(keyword, topics)
            break
            // 必应
          case 2: window.open('https://cn.bing.com/search?q=' + keyword, '_blank')
            break
            // 百度
          case 3:
            ajax.get('/', res => {
              window.open('http://www.baidu.com/s?wd=' + keyword, '_blank')
            })
            break
            // 谷歌
          case 4: window.open('https://www.google.com/search?hl=zh_cn&q=' + keyword + '&oq=' + keyword, '_blank')
            break
          default:
            break
        }
      })
    },
    findByInner: function (keyword, topics) {
      if (keyword.trim().length !== 0) {
        // 最终结果
        let resTopics = []
        for (const key in topics) {
          if (topics.hasOwnProperty(key)) {
            const topic = topics[key]
            // 查找的链接结果
            let resLinks = []
            // 链接中是否包含关键字
            for (const link in topic.links) {
              if (topic.links.hasOwnProperty(link)) {
                const l = topic.links[link]
                if (l.title.indexOf(keyword) >= 0 || l.notes.indexOf(keyword) >= 0 || l.href.indexOf(keyword) >= 0) {
                  // 一旦命中则将多一条当前topic和至少一条link
                  resLinks.push(l)
                }
              }
            }
            // 如果有匹配链接则向结果中push结果
            if (resLinks.length > 0) {
              topic.links = resLinks
              resTopics.push(topic)
            }
          }
        }
        this.topics = resTopics
      } else {
        ajax.get('../../static/data/topics.json', res => {
          this.topics = res.data
        })
      }
    },
    copyText: function () {
      try {
        let c = document.getElementById('copyrelay')
        c.select()
        document.execCommand('copy', false)
      } catch (e) {
        alert('复制枚举json失败,请更换浏览器重试！')
      }
    }
  },
  // 监听搜索框的输入变化，如果是站内则动态展示结果
  watch: {
    search_keyword () {
      if (this.search_selectd == '1') {
        this.execSearch('1', this.search_keyword)
      }
    }
  },
  data: () => {
    return {
      index_title: '',
      search_selectd: '1',
      search_keyword: '',
      not_context: '',
      topics: []
    }
  }
}
</script>
<style>

.el-main {
  color: #333;
  margin-left: 230px;
  padding: 30px 60px;
  height: 100%;
}
.el-select .el-input {
    width: 130px;
}
.input-with-select{
    outline-color: #c0c4cc;
}
.el-input__inner:focus{
    border-color: #c0c4cc;
}

.link-box {
  background-color: #f2f2f0;
  margin: 40px 0;
  text-align: left;
}
.cursor-box{
    cursor: pointer;
    text-decoration: unset;
    color: #303133;
}
/**/
.tooltip-context{
    text-decoration: unset;
    color: #fff;
}
.box-title{
    font-weight: 700;
    font-size: 18px;
    height: 40px;
}
.small-text{
    color: #666;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 2px;
}
.card-icon{
    float: left;
    width: 30px;
    height: 30px;
    display: block;
    border-radius: 30px;
}
.card-icon img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.card-top{
    line-height: 200%;
    margin-left: 5px;
}
.footer-text{
    outline: unset;
    text-decoration: unset;
    color: #333;
    font-size: 14px;
}
@media only screen and (max-width: 767px){
    .el-main{
        margin-left: 0 !important;
        padding: 20px;
    }
    .el-select .el-input {
        width: 95px;
    }
}
.not_context_mail{
    text-decoration: unset;
    color: #333;
}
.not_context_mail:hover,
.not_context_mail:focus{
    color: #19bf4f;
}
</style>
