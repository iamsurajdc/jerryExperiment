<template>
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link to="/" class="navbar-brand"><a><h2>Visualization Tool</h2></a></router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" >
            <ul class="navbar-nav">
                <!-- <router-link to="/xlxshtml" tag="li" active-class="active"><a>(xlxshtml)</a></router-link> -->
               <!--  <router-link to="/portfolio" tag="li" active-class="active"><a>portfolio</a></router-link>
                <router-link to="/stocks" tag="li" active-class="active"><a>stocks-{{this.$store.getters.isAuthenticated}}</a></router-link>
                <router-link to="/surveycreator" tag="li" active-class="active"><a>surveycreator</a></router-link>
                <button @click="onlogout" tag="li" active-class="active"><a>logout</a></button> 
                <button @click="signinUser" tag="li" active-class="active"><a>logIN</a></button>  -->
            </ul>
            <!-- <ul>
                <li><a href="#">End day</a></li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">save & load data
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" @click="savedata">save data</a>
                <a class="dropdown-item" href="#">load data</a>
                <a class="dropdown-item" @click="saveuser">save user data</a>
                <a class="dropdown-item" @click="signinUser">Login user</a>
                </div>
            </li>
            </ul> -->
        </div>

    </nav>
</template>
<script>
import axios from 'axios';
// import axiosinstance from '../axios-auth';
// import globalaxios from 'axios';
export default {
    created(){
      console.log(this.$store.getters.isAuthenticated);  
    },
    methods:{
        savedata(){
            const data={
                funds:this.$store.getters.funds,
                portfolio:this.$store.getters.stocks
            }
            //this.$http.put("data.json",data);
            axios.post('/users.json',data)
            .then(res=>console.log(res))
            .catch(data=>console.log(data)) 
        },
        saveuser(){
             const data={
                email:'test4@test.com',
                password:'test4@123',
                returnSecureToken:true
            };
           /* axiosinstance.post(":signUp?key=AIzaSyDnf3RJAI0ubPuPhEP3g3Ih-LEmC0UUIE8",data)
            .then(res=>console.log(res))
            .catch(err=>console.log(err)) */
            this.$store.dispatch("signup",data);
        },
        signinUser(){
           /*  axiosinstance.post(":signInWithPassword?key=AIzaSyDnf3RJAI0ubPuPhEP3g3Ih-LEmC0UUIE8",{email:'test@test.com',password:'test@123',returnSecureToken:true})
            .then(res=>console.log(res))
            .catch(err=>console.log(err)) */
            let data ={email:'test2@test.com',password:'test2@123',returnSecureToken:true}
            

             this.$store.dispatch("signIn",data);
        },
        onlogout(){
            this.$store.dispatch('logout');
        } 
    }
}
</script>