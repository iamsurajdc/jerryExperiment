<template>
<div>
    <h1>the home component</h1>
    Funds:{{Funds | currency}}
</div>
</template>
<script>
export default {
    computed:{
        Funds(){
            return this.$store.getters.funds;
        }
    }
}
</script>