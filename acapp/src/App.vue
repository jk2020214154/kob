<template>
    <div class="game-body">
      <MenuView v-if="$store.state.router.router_name==='menu'"/>
      <PkindexViewVue v-else-if="$store.state.router.router_name==='pk'"/>
      <RecordindexViewVue v-else-if="$store.state.router.router_name==='record'"/>
      <RecordContentViewVue v-else-if="$store.state.router.router_name==='record_content'"/>
      <RanklistindexViewVue v-else-if="$store.state.router.router_name==='ranklist'"/>
      <UserBotindexViewVue v-else-if="$store.state.router.router_name==='user_bot'"/>
    </div>

</template>


<script>
import {useStore} from 'vuex';
import MenuView from './views/MenuView.vue';
import PkindexViewVue from './views/pk/PkindexView.vue';
import RecordindexViewVue from './views/record/RecordindexView.vue';
import RecordContentViewVue from './views/record/RecordContentView.vue';
import RanklistindexViewVue from './views/ranklist/RanklistindexView.vue';
import UserBotindexViewVue from './views/user/bot/UserBotindexView.vue';


//import $ from 'jquery';


export default{
  components:{
    MenuView,
    PkindexViewVue,
    RecordindexViewVue,
    RecordContentViewVue,
    RanklistindexViewVue,
    UserBotindexViewVue,
  },
  setup(){

      const store = useStore();
      const jwt_token="eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0MjY2MzUyNTAzMTI0MGQwOTQ5NGMwM2FmY2JmMWIxZSIsInN1YiI6IjIiLCJpc3MiOiJzZyIsImlhdCI6MTY3ODUyODQ3MSwiZXhwIjoxNjc5NzM4MDcxfQ.AkbIgMp4qz0AMcUSpq15N_NJD1WmeepQF6_sTOCdwqY";
      
      if(jwt_token){
          store.commit("updateToken",jwt_token);
          store.dispatch("getinfo",{
              success(){
                  store.commit("updatePullingInfo",false);
              },
              error(){
                  store.commit("updatePullingInfo",false);
              }
          });
      }
      else{
          store.commit("updatePullingInfo",false);
      }
  },
}


</script>


<style scope>

body{
  margin: 0;
}

div.game-body{
  background-image: url("@/assets/images/background.png");
  background-size: cover;
  width: 100%;
  height: 100%;
}


div.window{
  width: 100vw;
  height: 100vh;
}



</style>
