import Compte from "./components/Compte";
import Acceuil from "./components/Acceuil";
import Connexion from "./components/Connexion.vue";
import Inscription from "./components/Inscription.vue";

import AllinformationBoardAmin from "./components/AllInformationBoardAdmin";
import TableUsers from './components/admin/TableUsers.vue';
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
        path:'users',
        component: TableUsers
      }
    ],
  },
];
