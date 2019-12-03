<template>
    <div>
        <appstock v-for="stock in stocks" :key="stock" :stock="stock"></appstock>
    </div>
</template>
<script>
import stock from './stock.vue';
import {mapGetters,mapActions} from 'vuex';
export default {
    components:{
        appstock : stock
    },
    computed:{
        ...mapGetters({
            stocks : 'portfoliostock'
        })
    },
    methods:{
        ...mapActions(["loaddata"])
    },
    created(){
       // console.log(this.$store.getters.portfoliostock);
         this.loaddata();
       // this.$store.dispatch("loaddata");
    },
}
</script>