<template>
  <div class=" section tile is-ancestor   ">
    <div class="tile  min-height-100vh  ">
      <div
        class="tile
         is-parent 
         is-vertical 
         pb-0 is-flex 
         is-justify-content-start 
         is-flex-direction-column 
          min-height-100vh"
        style="padding-right: 0;"
      >
        <div class="is-child is-flex-grow-1">
          <div class="menu">
            <p
              class="
              has-text-white
              has-background-primary
              menu-label has-text-centered  is-flex is-justify-content-center is-align-items-center  is-capitalized has-text-weight-semibold is-size-5  title-label "
              style=" color:white; height:50px;"
            >
              administrateur
            </p>
            <p
              class="menu-label has-text-centered pt-4 is-capitalized  title-label"
            >
              {{ email }}
            </p>

            <ul class="menu-list pt-4">
              <li>
                <p class="menu-label pl-2 is-capitalized is-size-6 title-label">
                  administration
                </p>
                <ul>
                  <li>
                    <b-navbar-item
                      tag="router-link"
                      :to="{ path: '/compte/admin-users' }"
                      >Utilisateurs</b-navbar-item
                    >
                  </li>
                  <li>
                    <b-navbar-item
                      tag="router-link"
                      :to="{ path: '/compte/admin-chiens' }"
                      >Chiens</b-navbar-item
                    >
                  </li>
                  <li>
                    <b-navbar-item
                      tag="router-link"
                      :to="{ path: '/compte/activites' }"
                      >Activitées</b-navbar-item
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- <AllinformationBoardAmin></AllinformationBoardAmin> -->
      <div class=" tile is-parent is-10 pl-0 pb-0">
      
          <router-view></router-view>
       
      </div>
    </div>
  </div>
</template>

<script>
// import AllinformationBoardAmin from './AllInformationBoardAdmin'
export default {
  name: "Compte",
  components: {},
  computed: {
    email: function() {
      return this.$store.getters.getEmail;
    },
  },
};
</script>

<style scoped>
/*  background color body #f1f4f5 */

.container-logout {
  background-color: #263238;
  opacity: 4;
}
.section {
  padding: 0 !important;
  min-height: 100vh;
  background-color: #263238;
}

.min-height-100vh {
  min-height: 100vh;
}
/*

#000063 dark color blue
#6746c3  color light blue
#311b92 primary color blue
*/
.menu-list a:hover {
  background-color: #37474f;
}

.menu-list a {
  color: rgba(163, 175, 183, 0.9);
}
.title-label {
  color: #76838f;
}

.navbar-left {
  position: fixed;
}




</style>
