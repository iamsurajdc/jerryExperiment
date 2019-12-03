// import home from "./components/home";
import portfolio from "./components/portfolio/portfolio";
import stocks from "./components/stocks/stocks";
// import surveycreator from "./components/stocks/surveycreator";
import maincmp from "./components/xlxshtml/maincmp";
import store from './store/store';
export const routes = [
  // { path: "/", component: home },
  { path: "/portfolio", component: portfolio },
  { path: "/stocks", component: stocks,beforeEnter(to,from,next){
      if(store.state.tokenId){
        next();
      }else{
        next("/");
      }
  } },
  /* {
    path:"/surveycreator",component:surveycreator
  }, */
  {
    path:"/",component:maincmp
  }
];
