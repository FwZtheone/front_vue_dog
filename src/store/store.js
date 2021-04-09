import Vue from "vue";
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
const vuexLocalStorage = new VuexPersist({
    key: 'vuex', // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
    // Function that passes the state and returns the state with only the objects you want to store.
    // reducer: state => state,
    reducer: state => ({
        user : {
            isLogin : state.user.isLogin,
            rule: state.user.rule,
            name : state.user.name,
            lastName: state.user.lastName,
            email : state.user.email,
            token : state.user.token
        }
    })
    
    // Function that passes a mutation and lets you decide if it should update the state in localStorage.
    // filter: mutation => (true)
  })


//module user 

Vue.use(Vuex);

const moduleUser = {
    state : {
        id : '',
        name : '',
        lastName: '',
        email :'',
        password: '',
        token : '',
        isLogin: false,
        rule: false
        
    },
    mutations : {
        CHANGE_ID(state,payload){
            state.id = payload
        },
        CHANGE_NAME(state,payload){
            state.name = payload
        },
        CHANGE_LASTNAME(state,payload){
            state.lastName = payload
        },
        CHANGE_EMAIL(state,payload){
            state.email = payload
        },
        CHANGE_PASSWORD(state,payload){
            state.password = payload
        },
     
        CHANGE_TOKEN(state,payload){
            state.token = payload
        },
        CHANGE_ISLOGIN(state,payload){
            state.isLogin = payload
        },
        CHANGE_RULE(state, payload){
            state.rule = payload
        },
        LOGOUT(state){
            state.isLogin = false;
            state.rule = false;
        }
         
    },
    getters : {
        getId: (state) => {return state.id},
        getName : state => {return state.name},
        getLastName : state => {return state.lastName},
        getEmail : state => { return state.email},
        getPassword: state => {return state.password},
        getToken : state => {return state.token},
        isLogin : state => {return state.isLogin},
        getRule : state => {return state.rule}

    },
    actions: {
        changeId(context,{id}){
            context.commit('CHANGE_ID', id);
        },
        changeName(context, {name}){
            context.commit('CHANGE_NAME', name)
        },
        changeLastName(context, {lastName}){
            context.commit('CHANGE_LASTNAME', lastName)
        },
        changeEmail(context, {email}){
            context.commit('CHANGE_EMAIL', email)
        },
        changeToken(context, {token}){
            context.commit('CHANGE_TOKEN', token)
        },
        changePassword(context, {password}){
            context.commit('CHANGE_PASSWORD',password)
        },
        changeIsLogin(context, etat){
            context.commit('CHANGE_ISLOGIN', etat)

        },
        changeRule(context,{rule}){
            context.commit('CHANGE_RULE', rule)
        },
        logout(context){
            context.commit('LOGOUT');
        }

    }
}





export const store = new Vuex.Store({
    
    modules:{
        user : moduleUser,
    },
    plugins: [vuexLocalStorage.plugin]


});