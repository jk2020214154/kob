import $ from 'jquery';

export default{
    state: {
        AcWingOS: "AcwingOS",
        id: "",
        username: "",
        photo: "",
        token: "",
        is_login: false,
        pulling_info: true,//是否正在拉去信息
    },
    getters: {
    },
    mutations: {
        updateUser(state,user){
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.token = user.token;
            state.is_login = user.is_login;
        },
        updateToken(state,token){
            state.token = token;
        },
        logout(state){
            state.id="";
            state.username="";
            state.photo="";
            state.token="";
            state.is_login=false;
        },
        updatePullingInfo(state,pulling_info){
            state.pulling_info = pulling_info;
        },
    },
    actions: {
        login(context,data){
            $.ajax({
                url: "https://app3677.acapp.acwing.com.cn/api/user/account/token/",
                type: "post",
                data:{
                  username: data.username,
                  password: data.password,
                },
                success(resp){
                    if(resp.error_message==="success"){
                        localStorage.setItem("jwt-token",resp.token);
                        context.commit("updateToken",resp.token);
                        data.success(resp);
                    }else{
                        data.error(resp);
                    }
                },
                error(resp){
                    data.error(resp);
                },
              });
        },
        getinfo(context,data){
            $.ajax({
                url: "https://app3677.acapp.acwing.com.cn/api/user/account/info/",
                type: "get",
                headers:{
                  Authorization: "Bearer " + context.state.token,
                },
                success(resp){
                    console.log(context.state.token);
                    console.log(resp);
                    if(resp.error_message==="success"){
                        context.commit("updateUser",{
                            ...resp,
                            is_login: true,
                        });
                        data.success(resp);
                    }
                    else{
                        data.error(resp);
                    }
                },
                error(resp){
                    data.error(resp);
                },
              });
        },
        logout(context){
            localStorage.removeItem("jwt-token");
            context.commit("logout");
            location.reload();
        }

    },
    modules: {
    }
}