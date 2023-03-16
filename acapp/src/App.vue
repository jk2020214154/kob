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
import PkindexViewVue from './views/pk/PkindexView';
import RecordindexViewVue from './views/record/RecordindexView';
import RecordContentViewVue from './views/record/RecordContentView';
import RanklistindexViewVue from './views/ranklist/RanklistindexView';
import UserBotindexViewVue from './views/user/bot/UserBotindexView';


import $ from 'jquery';


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

      $.ajax({
        url:"https://app3677.acapp.acwing.com.cn/api/user/account/acwing/acapp/apply_code/",
        type: "GET",
        success: resp => {
          if (resp.result === "success") {
            store.state.user.AcWingOS.api.oauth2.authorize(resp.appid, resp.redirect_uri, resp.scope, resp.state, resp => {
              if (resp.result === "success") {
                const jwt_token = resp.jwt_token;
                
                store.commit("updateToken", jwt_token);
                store.dispatch("getinfo", {
                    success() {
                        store.commit("updatePullingInfo", false);
                    },
                    error() {
                        store.commit("updatePullingInfo", false);
                    }
                })
              } else {
                store.state.user.AcWingOS.api.window.close();
              }
            });
          } else {
            store.state.user.AcWingOS.api.window.close();
          }
        }
      });



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
