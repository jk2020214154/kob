<template>
    <ContentField>
        我的Bot
    </ContentField>
</template>

<script>
import ContentField from '../../../components/ContentField'
import $ from 'jquery'
//import { useStore } from 'vuex';

export default {
    components: {
        ContentField
    },
    setup() {
        //const store = useStore();
        const jwt_token=localStorage.getItem("jwt-token");
        // $.ajax({
        //     url: "http://127.0.0.1:3000/user/bot/add/",
        //     type: "post",
        //     headers: {
        //     // Authorization:"Bearer "+"eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiNTg4ZmFiNWE4MjA0YmRkYWY1ZGY0NzU2YmI4ZGMyMiIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTY2NTgwNjA0NiwiZXhwIjoxNjY3MDE1NjQ2fQ.2IJAoNjjdecGX34WIAZhUqBAVrI9-UjzeRil3iXvp6w",
        //     Authorization:"Bearer "+ jwt_token,
        //     //Authorization:"Bearer "+ store.state.user.token,//不知道为什么不行
        //     },
        //     data: {
        //         title: "Bot的标题",
        //         description : "Bot的描述",
        //         content: "Bot的代码",
        //     },
        //     success(resp) {
        //         console.log(resp);
        //         //console.log(jwt_token);
        //         //console.log(store.state.user.user_token);
        //     },
        //     error(resp) {
        //         console.log(resp);
        //     //console.log(store.state.user.user_token);
        //     }
        // });
    //     $.ajax({
    //         url: "http://127.0.0.1:3000/user/bot/remove/",
    //         type: "post",
    //         headers: {
    //         // Authorization:"Bearer "+"eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiNTg4ZmFiNWE4MjA0YmRkYWY1ZGY0NzU2YmI4ZGMyMiIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTY2NTgwNjA0NiwiZXhwIjoxNjY3MDE1NjQ2fQ.2IJAoNjjdecGX34WIAZhUqBAVrI9-UjzeRil3iXvp6w",
    //         Authorization:"Bearer "+ jwt_token,
    //         //Authorization:"Bearer "+ store.state.user.token,//不知道为什么不行
    //         },
    //         data: {
    //             bot_id: 4,
    //         },
    //         success(resp) {
    //             console.log(resp);
    //             //console.log(jwt_token);
    //             //console.log(store.state.user.user_token);
    //         },
    //         error(resp) {
    //             console.log(resp);
    //         //console.log(store.state.user.user_token);
    //         }
    //     });
    // }
    //     $.ajax({
    //     url: "http://127.0.0.1:3000/user/bot/update/",
    //     type: "post",
    //     headers: {
    //     // Authorization:"Bearer "+"eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiNTg4ZmFiNWE4MjA0YmRkYWY1ZGY0NzU2YmI4ZGMyMiIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTY2NTgwNjA0NiwiZXhwIjoxNjY3MDE1NjQ2fQ.2IJAoNjjdecGX34WIAZhUqBAVrI9-UjzeRil3iXvp6w",
    //     Authorization:"Bearer "+ jwt_token,
    //     //Authorization:"Bearer "+ store.state.user.token,//不知道为什么不行
    //     },
    //     data: {
    //         bot_id: 8,
    //         title: "Bot的标题7",
    //         description : "Bot的描述7",
    //         content: "Bot的代码7",
    //     },
    //     success(resp) {
    //         console.log(resp);
    //         //console.log(jwt_token);
    //         //console.log(store.state.user.user_token);
    //     },
    //     error(resp) {
    //         console.log(resp);
    //     //console.log(store.state.user.user_token);
    //     }
    // });
    $.ajax({
        url: "http://127.0.0.1:3000/user/bot/getlist/",
        type: "get",
        headers: {
        // Authorization:"Bearer "+"eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiNTg4ZmFiNWE4MjA0YmRkYWY1ZGY0NzU2YmI4ZGMyMiIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTY2NTgwNjA0NiwiZXhwIjoxNjY3MDE1NjQ2fQ.2IJAoNjjdecGX34WIAZhUqBAVrI9-UjzeRil3iXvp6w",
        Authorization:"Bearer "+ jwt_token,
        //Authorization:"Bearer "+ store.state.user.token,//不知道为什么不行
        },
        success(resp) {
            console.log(resp);
            //console.log(jwt_token);
            //console.log(store.state.user.user_token);
        },
        error(resp) {
            console.log(resp);
        //console.log(store.state.user.user_token);
        }
    });

}

}
</script>

<style scoped> 


</style>