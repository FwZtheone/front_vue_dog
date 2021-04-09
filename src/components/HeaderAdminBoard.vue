<template>
  <div class="is-child tile box ">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>123</strong>
            messages
          </p>
        </div>
        <div class="level-item">
            <b-autocomplete
                
                :data="['user','compte','chien']"
                placeholder="recherche"
                icon="magnify"
                clearable
                @select=" () => console.log('option')">
                <template #empty>No results found</template>
            </b-autocomplete>
        </div>
      </div>

      <div class="level-right ">
        <div class="level-item">
              <b-dropdown       
                position="is-bottom-left"
                append-to-body
                aria-role="menu"
              >
                <template #trigger>
                  <a>
                    <figure class="image is-48x48">
                      <img src="https://via.placeholder.com/48" alt="picture" class="is-rounded" />
                    </figure>
                    
                  </a>
                </template>

                <b-dropdown-item custom aria-role="menuitem">
                  Connecté en tant que <b>{{nom}} {{prenom}} </b>
                </b-dropdown-item>
                <hr class="dropdown-divider" />
                <b-dropdown-item value="home" aria-role="menuitem">
                  <b-icon icon="home"></b-icon>
                  Acceuil
                </b-dropdown-item>
    
                <hr class="dropdown-divider" aria-role="menuitem" />
                <b-dropdown-item value="settings">
                  <b-icon icon="settings"></b-icon>
                  Paramétre
                </b-dropdown-item>
                <b-dropdown-item value="logout" aria-role="menuitem" @click="logout">
                  <b-icon icon="logout"></b-icon>
                  Déconnexion
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>

  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isActive: true,
      navigation: 'home',
   
    };
  },  methods: {

    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          window.localStorage.removeItem("vuex");
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
  },
  computed: {
        nom : function(){
      return this.$store.getters.getName;
    },
    prenom : function(){
      return this.$store.getters.getLastName;
    },
  }
};
</script>

<style scoped>
.dropdown-menu {
  left: -180px !important;
}
</style>
