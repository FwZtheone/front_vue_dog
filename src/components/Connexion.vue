<template>


    <div class="columns section" style="height: 30em;">
        <div class="column is-half is-offset-one-quarter    is-half-mobile is-offset-one-quarter-mobile" >
            <div class="box  box-shadow-light is-flex is-justify-content-center is-align-items-center is-flex-direction-column">
                <div class="mt-4 mb-4">
                    <p class="title is-1 has-text-centered  has-text-link is-size-5-mobile ">Connexion</p>
                </div>

                <section class="container is-max-desktop mb-0  ">

                <b-field class="mt-4">
                    <b-input placeholder="Email" type="email" v-model="email"></b-input>
                </b-field>

                <b-field class="mt-4"  message="votre mot de passe doit faire 8 caractéres au minimum" >
                    <b-input type="password"
                    placeholder="Mot de passe"
                    minlength="8"
                    maxlength="100"                   
                    v-model="password"
                    password-reveal>
                    </b-input>
                </b-field>
                <b-field  
                position="is-centered"
                grouped>
                    <b-button type="is-primary is-light is-uppercase"  @click="connexion" >connexion</b-button> 
                </b-field>
                </section>
            </div>
        </div>



    </div>

</template>


<script>
import axios from 'axios';

export default {
    name :'Connexion',
    data: function(){
        return {
            email: 'melly@gmail.com',
            password: '12345678',
            messagesError: [],
            isError : false
        }
    },
    methods : {
        setIsLogin(etat){
            this.$store.dispatch('changeIsLogin',etat)
        },
        setEmail(etat){
            this.$store.dispatch('changeEmail',etat)
        },
        setName(etat){
            this.$store.dispatch('changeName',etat)
        },
        setLastName(etat){
            this.$store.dispatch('changeLastName',etat)
        },
        setPassword(etat){
            this.$store.dispatch('changePassword',etat)
        },
        setId(etat){
            this.$store.dispatch('changeId',etat)
        },
        setToken(etat){
            this.$store.dispatch('changeToken',etat)
        },
        setRule(etat){
            this.$store.dispatch('changeRule',etat)
        },
        connexion : function(){
                axios.post('http://localhost:8000/user/login'  , {
                    email : this.email.toLowerCase(),
                    password : this.password
                })
                .then( ({data}) => {
                    

                    if(data.errors){
                        this.messagesError = data.errors.slice(0);
                        console.log(this.messagesError)
                        this.isError = true;
                        this.danger();
                        
                    }else if(data.message){                
                        this.isError = true;
                        this.danger();
                    }
                    

                    else{
                        //connexion réussie
                        
                        this.isError = false;
                        
                        this.setIsLogin(true);
                        this.setEmail(data);
                        this.setName(data);
                        this.setLastName(data);
                        this.setToken(data);
                        this.setPassword(data);
                        this.setId(data);
                        this.setRule(data);
                        this.success();
                        
                        this.$router.push('/compte')
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        danger :  function(){
             this.$buefy.notification.open({
                duration : 5000,
                message : 'le champ émail ou/et mot de passe ne sont pas correct',
                position: 'is-bottom-right',
                type: 'is-danger',
            })  
        },
        success: async function(){
             await this.$buefy.notification.open({
                duration : 5000,
                message :'connexion réussie',
                position: 'is-bottom-right',
                type:'is-success'
            })
        }
    },
 
    
}
</script>


<style scoped>

 .box-shadow-light{
        box-shadow:#e6ceff 0 7px 25px 0  ;
        height: 100%;
    }

    .box-height {
        height: 724px;
    }


</style>
