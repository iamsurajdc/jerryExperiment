import Vue from 'vue';
export const loaddata = ({commit})=>{
    Vue.http.get('data.json')
    .then(res=>res.json())
    .then(result=>{
        if(result){
            commit('SET_STOCK',result.stocks);
           console.log(result);
        }
    })
}