<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>卡片名称{{name.zhang}}</span>  
    </div>
    <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + count }}
    <el-button type="primer" @click="uesVuex(o)">{{count}}</el-button>
    <el-button type="primer" @click="uesVuexd(o)">{{num}}</el-button>
    </div>
    <el-button type="primer">{{outdata}}</el-button>
        <el-button type="primer">{{detail}}</el-button>
  <div id="app">
    <!--创建一个echarts的容器-->
    <div id="echartContainer" style="width:500px; height:500px"></div>
  </div>
  </el-card>

</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
var echarts = require('echarts')

import elCard from "./slot.vue";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      name: {
        zhang: this.msg
      }
    };
  },
  components: {
    elCard
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('echartContainer'));
// 绘制图表
var green = 20
var blue = 10
var connet = `绿 ${green} 蓝 ${blue}`
myChart.setOption({
    title: { text: 'ECharts 入门示例' },
    tooltip: { 
         trigger: 'axis',
      // axisPointer: {    
      //   type: 'shadow'   
      // },
      formatter(params) {
        const item = params[0];
        return `
                红${item.data.value}
                蓝${item.data.day}
               `;
 }},
    xAxis: {
        data: ["6-15","6-16","6-17","6-18","6-19","6-20"]
    },
    yAxis: {},
    symbolSize: 5,
    label: {
      show: true,
      color: 'blue',
    },
    series: [{
        // name: connet,
        type: 'line',
        data: [{name: '共', value: 45, day: 't',symbolSize: 10},
        {name: '共', value: 15, day: 't',symbolSize: 10},
        {name: '共', value: 25, day: 't',symbolSize: 10},
        {name: '共', value: 45, day: 't',symbolSize: 10},
        {name: '共', value: 45, day: 't',symbolSize: 10}
        ]
    }]
});
myChart.on('click', function (params) {
    // 控制台打印数据的名称
    console.log(params);
});
  },
  methods: {
    ...mapMutations('cart', ['add'// 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
     // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    uesVuex() {
      // this.$store.commit("cart/add", 1);
      // this.add(100)

      this.adds(100)
    },
    uesVuexd() {
      this.$store.commit("products/delete", 1);
    },
    ...mapActions('cart',[  //比如'movies/getHotMovies
        'adds'
    ])

  },
  computed: {
    ...mapState("cart", {
      count: state => state.count
    }), // from module cart 
    ...mapState('products', {
      num: state => state.count
    }), // from module products
    ...mapState({
      outdata: state => state.outdata
    }), // from out of modules
    ...mapGetters({
                detail: 'cart/detail'
    }),

     // -> this.foo()
  
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
