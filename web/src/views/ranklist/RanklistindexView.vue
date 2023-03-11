<template>
    <ContentField>
        <table class="table table-striped table-hover" style="text-align: center;">
            <thead>
                <tr>
                    <th>玩家</th>
                    <th>天梯分</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>
                        <img :src="user.photo" alt="" class="record-user-photo">
                        &nbsp;
                        <span class="record-user-username">
                            {{user.username}}
                        </span>
                    </td>
                    <td>
                        {{user.rating}}
                    </td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="...">
            <ul class="pagination" style="float: right;">
                <li class="page-item" @click="click_page(-2)">
                    <a class="page-link">前一页</a>
                </li>
                <li :class="'page-item '+page.is_active" v-for="page in pages" :key="page.number" @click="click_page(page.number)">
                    <a class="page-link" href="#">{{page.number}}</a>
                </li>
                <li class="page-item">
                    <a class="page-link" @click="click_page(-1)">后一页</a>
                </li>
            </ul>
        </nav>
    </ContentField>
</template>

<script>

import ContentField from '../../components/ContentField.vue';
//import {useStore} from 'vuex';
import $ from 'jquery';
import {ref} from 'vue';

export default{
    components:{
        ContentField,
    },
    setup(){
        //const store=useStore();
        const jwt_token=localStorage.getItem('jwt-token');
        let users=ref([]);
        let current_page=1;
        let total_users=0;
        let pages=ref([]);

        const click_page=page=>{
            if(page===-2)
                page=current_page-1;
            else if(page===-1)
                page=current_page+1;
            let max_pages=parseInt(Math.ceil(total_users/10));

            if(page>=1&&page<=max_pages){
                pull_page(page);
            }
        }

        const update_pages=()=>{
            let max_pages=parseInt(Math.ceil(total_users/10));
            //console.log(total_records);
            let new_pages=[];
            for(let i=current_page-2;i<=current_page+2;i++){
                if(i>=1&&i<=max_pages){
                    new_pages.push({
                        number: i,
                        is_active: i===current_page? "active": "",
                    });
                }
            }
            pages.value=new_pages;

            //console.log(pages);
        }

        //console.log(total_records);

        const pull_page=page=>{
            current_page=page;
            $.ajax({
                url: "https://app3677.acapp.acwing.com.cn/api/ranklist/getlist/",
                data:{
                    page,
                },
                type: "get",
                headers: {
                // Authorization:"Bearer "+"eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiNTg4ZmFiNWE4MjA0YmRkYWY1ZGY0NzU2YmI4ZGMyMiIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTY2NTgwNjA0NiwiZXhwIjoxNjY3MDE1NjQ2fQ.2IJAoNjjdecGX34WIAZhUqBAVrI9-UjzeRil3iXvp6w",
                Authorization:"Bearer "+ jwt_token,
                //Authorization:"Bearer "+ store.state.user.token,//不知道为什么不行
                },
                success(resp) {
                    users.value=resp.users;
                    total_users=resp.users_count;
                    update_pages();
                    //console.log(resp);
                    //console.log(jwt_token);
                    //console.log(store.state.user.user_token);
                },
            });
        }
        pull_page(current_page);


        return{
            users,
            click_page,
            pages,
        }
    },
}

</script>


<style scoped>

img.record-user-photo{
    width: 4vh;
    border-radius: 50%;
}


</style>