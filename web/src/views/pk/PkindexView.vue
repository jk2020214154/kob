<template>
    
    <PlayGround v-if="$store.state.pk.status === 'playing'" />
    <MatchGround v-if="$store.state.pk.status === 'matching'" />

</template>

<script>

import PlayGround from '../../components/PlayGround.vue';
import MatchGround from '../../components/MatchGround.vue';
import {onMounted,onUnmounted} from 'vue';
import {useStore} from 'vuex';


export default{
    components:{
        PlayGround,
        MatchGround,
    },
    setup(){
        
        const store=useStore();
        const jwt_token=localStorage.getItem('jwt-token');
        const socketUrl=`ws://127.0.0.1:3000/websocket/${jwt_token}/`;

        let socket=null;
        onMounted(()=>{
            store.commit("updateOpponent",{
                username: "我的对手",
                photo: "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png",
            });
            socket=new WebSocket(socketUrl);

            socket.onopen=()=>{
                console.log("Connected!");
                store.commit("updateSocket",socket);
            }
            socket.onmessage=msg=>{
                const data=JSON.parse(msg.data);
                if(data.event==="start-matching"){//匹配成功
                    store.commit("updateOpponent",{
                        username: data.opponent_username,
                        photo: data.opponent_photo,
                    });
                    setTimeout(() => {
                        store.commit("updateStatus","playing");
                    }, 2000);
                    store.commit("updateGamemap",data.gamemap);
                    
                }
            }

            socket.onclose=()=>{
                console.log("disconnected");
                store.commit("updateStatus","matching");
            };
        });

        onUnmounted(()=>{
           socket.close(); 
            
        });


        return{
            store,
        }

    },
}

</script>


<style scoped>

</style>