<template>
        <b-navbar fixed-top  class="has-background-light" v-if="!isAdmin">
            
        <template #brand >
           
            <b-navbar-item tag="router-link" :to="{ path: '/' }" v-if="!isLogin">
                <p class="title is-1 is-uppercase"  >adog moi</p>
            </b-navbar-item>

            <b-navbar-item tag="router-link" :to="{ path: '/compte' }" v-else>
                <p class="title is-1 is-uppercase"  >compte</p>
            </b-navbar-item>

        </template>
        <template #start>

            
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                Acceuil
            </b-navbar-item>



            <!--  menu déroulant  -->
            <b-navbar-dropdown label="Information">
                <b-navbar-item href="#">
                    à propos de nous 
                </b-navbar-item>
                <b-navbar-item href="#">
                    Nous contacter
                </b-navbar-item>
            </b-navbar-dropdown>


        </template>


        


       
        <template #end>
            <b-navbar-item tag="div" >
                <div class="buttons" v-if="isLogin == false">
                    <b-navbar-item tag="router-link" :to="{ path: '/inscription' }">
                    <a class="button is-primary" >
                        <strong>Inscription</strong>
                    </a>
                    </b-navbar-item>
                    <b-navbar-item tag="router-link" :to="{ path: '/connexion' }">
                    <a class="button is-light">
                        Connexion
                    </a>
                    </b-navbar-item>
                </div>

                <div class="buttons" v-else @click="logout">
                    <b-navbar-item tag="router-link" :to="{ path: '/logout' }">
                        <a class="button is-danger" >
                            <strong>Déconnexion</strong>
                         </a>
                    </b-navbar-item>
                </div>
            </b-navbar-item>

            
        </template>
    </b-navbar>
</template>

<script>
export default {
    name :'NavigationBar',
    computed: {
        isLogin(){
            return this.$store.getters.isLogin;
        },
        isAdmin(){
            return this.$store.getters.getRule;
        }
        
    },
    methods: {
        logout(){
            this.$store.dispatch('changeIsLogin',false);
            this.$router.push('/')
        },
    }
}
</script>