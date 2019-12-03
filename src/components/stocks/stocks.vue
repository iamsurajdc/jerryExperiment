<template>
    <div>
        <appstock v-for="stock in stocks" :key="stock" :stock="stock"></appstock>
    </div>
</template>
<script>
import stock from './stock'
export default {
    components:{
        appstock : stock
    },
    computed:{
        stocks(){
            return this.$store.getters.stocks;
        }
    }
}
</script>