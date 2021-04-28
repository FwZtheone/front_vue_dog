import Compte from "./components/Compte";
import Acceuil from "./components/Acceuil";
import Connexion from "./components/Connexion.vue";
import Inscription from "./components/Inscription.vue";

import AllinformationBoardAmin from "./components/AllInformationBoardAdmin";
import TableUsers from './components/admin/TableUsers.vue';
import TableDogs from './components/admin/TableDogs.vue';



export const routes = [
  { path: "/", component: Acceuil },
  { path: "/connexion", component: Connexion },
  { path: "/inscription", component: Inscription },
  {
    path: "/compte",
    component: Compte,
    children: [
      {
        path: "/",
        component: AllinformationBoardAmin,
      },
      {
        path:'admin-users',
        component: TableUsers,
        
      },
      {
        path:'admin-chiens',
        component: TableDogs,
        
      }
    ],
    beforeEnter:  async (to,from,next) => {
      
      const {user} =  await JSON.parse(localStorage.getItem("vuex"));
        
      if(user.rule){
        next();
      }else{
        next({path: "/"})
      }
      
     
    }
  },
];
