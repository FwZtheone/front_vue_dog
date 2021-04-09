<template>


<!-- box-shadow : #ffdd57 0 7px 25px 0 -->

<div class="columns section" style="height: 30em;">
        <div class="column is-half is-offset-one-quarter    is-half-mobile is-offset-one-quarter-mobile" >
            <div class="box box-shadow-light is-flex is-justify-content-center is-align-items-center is-flex-direction-column">
                <div class="mt-4 mb-4">
                    <p class="title is-1 has-text-centered  has-text-link  is-size-5-mobile ">Inscription</p>
                </div>

                <section class="container is-max-desktop mb-0">
                    <b-field class="mb-4">
                        <b-input placeholder="Nom" type="text" v-model="name"></b-input>
                    </b-field>

                    <b-field>
                        <b-input placeholder="Prenom" type="text" v-model="lastname"></b-input>
                    </b-field>

                    <b-field>
                        <b-input placeholder="Email" type="email" v-model="email"></b-input>
                    </b-field>

    

                    <b-field >
                        <b-input type="password"
                            placeholder="Mot de passe"
                            minlength="8"
                            maxlength="100"
                            password-reveal
                            v-model="password"
                            >
                        </b-input>
                    </b-field>
                    <b-field 
                    position="is-centered"
                    grouped
                    >
            
                        <b-button type="is-primary is-light is-uppercase "   @click="inscription" >inscription</b-button> 
                    </b-field>

                </section>
            </div>
        </div>

    

    </div>



</template>



<script>

/*
http://localhost:8000/user/register
*/

import axios from 'axios';
export default {
    name:'Connexion',
    data : function(){
        return {
            email : '',
            password:'',
            name: '',
            lastname:'',
            errors: []
        }
    },
    methods : {
        inscription: function(){
            axios.post('http://localhost:8000/user/register', {
                name : this.name.toLowerCase().trim(),
                lastname: this.lastname.toLowerCase().trim(),
                email : this.email.toLowerCase().trim(),
                password : this.password.trim()
            }).then( rep => {
                //requete réussie
                if(rep.data.createUser == true){
                    this.success();
                    console.log(rep);
                }
                else if(rep.data.errors){
                    this.danger();
                     console.log(rep);
                }
                else if(rep.data == "undefined must be unique"){
                    this.dangerSqlUnique();
                }
            }).catch(error => console.log(error))
          

        },
        danger :  function(){
             this.$buefy.notification.open({
                duration : 5000,
                message : ' un ou plusieurs champ(s) manquant(s) !',
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
        },
        dangerSqlUnique: function(){
            this.$buefy.notification.open({
                duration : 5000,
                message :'cette email est déjà prise !',
                position: 'is-bottom-right',
                type:'is-danger'
            })
        }
    }
}
</script>


<style scoped>
    .box-shadow-light{
        box-shadow:#e6ceff 0 7px 25px 0  ;
        height: 100%;
    }
</style>