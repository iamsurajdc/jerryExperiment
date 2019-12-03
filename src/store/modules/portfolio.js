const state={
    stocks:[],
    funds:10000
};

const mutations ={
    BUY_STOCK:(state,{stockid,stockPrice,quantity})=>{
        let record = state.stocks.find(element=>{
            return element.stockid === stockid;
        })
        console.log(record);
        if(record !== undefined){
            record.quantity += Number(quantity);
        }else{
            state.stocks.push(
                {
                    stockid,
                    stockPrice,
                    quantity
                }
            )
        }
        state.funds -= quantity * stockPrice ;
    },
    SELL_STOCK:(state,{stockid,stockPrice,quantity})=>{
        console.log(stockid,stockPrice,quantity)
        let record = state.stocks.find(element=>{
            return element.stockid = stockid;
        })
        console.log(record)
        if(record.quantity >= quantity ){
            record.quantity -= quantity;
        }else{
            state.stocks.splice(state.stocks.indexOf(record),1);
        }
        state.funds += quantity * stockPrice ;
    },
}
const actions ={
    sellstock:({commit},order)=>{
        console.log(order);
        commit('SELL_STOCK',order);
    }
}

const getters = {
    funds:(state)=>{
        return state.funds;
    },
    portfoliostock:(state)=>{
        return state.stocks;
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}