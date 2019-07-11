<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>卡片名称{{name.zhang}}</span>
    </div>
    <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + count }}</div>
    <el-button type="primer" @click="uesVuex">{{count}}</el-button>
    <el-button type="primer" @click="uesVuexd">{{num}}</el-button>
  </el-card>
</template>

<script>
import { mapState } from "vuex";
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
  methods: {
    uesVuex() {
      this.$store.commit("cart/add", 1);
    },
    uesVuexd() {
      this.$store.commit("products/delete", 1);
    }
  },
  computed: {
    ...mapState("cart", {
      count: state => state.count
    }),
    ...mapState({
      num: state => state.num
    })
    //你也可以用下面的mapGetters来获取isShow的值，貌似下面的更简洁
    /*...mapGetters('footerStatus',{ //footerStatus指的是modules文件夹下的footerStatus.js模块
         isShow:'isShow' //第一个isShow是我自定义的只要对应template里v-if="isShow"就行，
                         //第二个isShow是对应的footerStatus.js里的getters里的isShow
      })*/
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
