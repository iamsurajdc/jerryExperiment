import stocks from '../../data/stocks'
const state ={
    stocks:[]
};

const mutations ={
    SET_STOCK:(state,payload)=>{
        state.stocks = payload;
    }
};
const actions ={
    buyStock:({commit},order)=>{
        console.log(order);
        commit("BUY_STOCK",order);
    },
    initstocks:({commit})=>{
        commit('SET_STOCK',stocks);
    }
};

const getters ={
    stocks:(state)=>{
        return state.stocks;
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}