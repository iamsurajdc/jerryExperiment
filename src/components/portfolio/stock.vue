<template>
<div class="col-3"> 
    <div class="panel panel-success">
        
    <div class="panel-heading">ID:{{stock.stockid}}<small>Price: {{stock.stockPrice}}- Quantity : {{stock.quantity}}</small></div>
    </div>
    <div class="panel-body">
        <div class="pull-left">
            <input type="text" placeholder="quantity" v-model="quantity">
        </div>
        <div class="pull-right">
            <button @click="sellStock1">Sell</button>
        </div>
    </div>
</div>
</template>
<script>
import { mapActions} from 'vuex';
export default {
    props:["stock"],
    data(){
        return{
            quantity:0
        }
    },
    /* computed:{
        ...mapActions([
            'sellstock'
        ])
    }, */
    methods:{
        ...mapActions([
            'sellstock'
        ]),
        sellStock1(){
            let order = {
                stockid :this.stock.stockid,
                stockPrice:this.stock.stockPrice,
                quantity:this.stock.quantity
            };
            console.log(order);
            this.sellstock(order);
            // this.$store.dispatch("buyStock",order);
        }
    }
}
</script>