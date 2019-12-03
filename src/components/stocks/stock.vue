<template>
<div class="col-3"> 
    <div class="panel panel-success">
        
    <div class="panel-heading">{{stock.name}}<small>{{stock.price}}</small></div>
    </div>
    <div class="panel-body">
        <div class="pull-left">
            <input type="text" placeholder="quantity" v-model="quantity">
        </div>
        <div class="pull-right">
            <button @click="buyStock1" :disabled="insufficient">Buy</button>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props:["stock"],
    data(){
        return{
            quantity:0
        }
    },
    computed:{
        funds(){
            return this.$store.getters.funds;
        },
        insufficient(){
            return this.quantity * this.stock.price > this.funds
        }
    },
    methods:{
        buyStock1(){
            let order = {
                stockid :this.stock.id,
                stockPrice:this.stock.price,
                quantity:this.quantity
            };
            console.log(order);
            this.$store.dispatch("buyStock",order);
        }
    }
}
</script>