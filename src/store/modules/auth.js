import axiosinstance from '../../axios-auth';
import axios from 'axios'
import routes from '../../routes'
const state={
    tokenId:null,
    userId:null
}

const getters={
    isAuthenticated(state){
        return state.tokenId !== null;
    }
}
const mutations ={
    signup:(state,payload)=>{
        state.tokenId = payload.data.idToken;
        state.userId = payload.data.localId;
    },
    signIn:(state,payload)=>{
        
        axiosinstance.post(":signInWithPassword?key=AIzaSyDnf3RJAI0ubPuPhEP3g3Ih-LEmC0UUIE8",payload)
        .then(res=>{
            console.log(res);
            state.tokenId = res.data.idToken;
            state.userId = res.data.localId;
            localStorage.setItem("tokenId",res.data.idToken);
            localStorage.setItem("userId",res.data.localId);
        })
        .catch(err=>{
            console.log(err);
        })
    },
    logout:(state)=>{
        state.tokenId = null;
        state.userId = null;
        routes.replace("/home");

    }
}
const actions ={
    signup:({commit,dispatch},payload)=>{
       
        axiosinstance.post(":signUp?key=AIzaSyDnf3RJAI0ubPuPhEP3g3Ih-LEmC0UUIE8",payload)
        .then(res=>{
            console.log(res);
            commit('signup',res);
            dispatch('storeuser',payload);
        })
        .catch(err=>{
            console.log(err);
        })
       
    },
    signIn:({commit,dispatch},payload)=>{
        commit('signIn',payload);
        dispatch('logoutTimer',5000);
    },
    storeuser:({state},payload)=>{
        axios.post("/users.json"+"?auth="+state.tokenId,payload)
        .then(res=>{
            console.log(res);
        })
        .catch(err=>console.log(err))
    },
    logout:({commit})=>{
        commit('logout');
    },
    logoutTimer({commit},expsec){
        setTimeout(() => {
           commit('logout') ;
        },expsec);
    }
    
}

export default {
    actions,
    mutations,
    state,
    getters
}