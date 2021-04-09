<template>
  <div class="tile is-ancestor ">
  <div class="tile is-vertical is-8">
    <div class="tile">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box has-background-link card-1">

          <div class="block ">
            <div class=" has-text-centered">
              <b-icon icon="user" pack="fas" size="is-large" type="is-white"></b-icon>
            </div>
            <div class="block has-text-centered">
              <p class="is-size-4  has-text-white">informations personnelles</p>
            </div>
          </div>
          
          

        </article>
        <article class="tile is-child box has-background-success card-1">
          <div class="block">
            <div class=" has-text-centered">
              <b-icon icon="list" pack="fas" size="is-large" type="is-white" ></b-icon>
            </div>

            <div class="block has-text-centered" >
              <p class="is-size-4 has-text-white" v-if="!isAdmin">activitées en cours</p>
              <p class="is-size-4 has-text-white" v-else>liste d'activitées</p>
            </div>


            
          </div>

        </article>
      </div>
      <div class="tile is-parent  ">
        <article class="tile is-child box  has-background-info card-1 ">
           <div class="block is-flex is-flex-direction-column is-justify-content-center is-align-items-center" style="height:100%;">
              <div class=" has-text-centered">
                <b-icon icon="comments" pack="fas" size="is-large" type="is-white"></b-icon>
              </div>
              <div class="block has-text-centered">
                <p class="is-size-4 has-text-white">messages</p>
              </div>
          </div>
        </article>
      </div>
    </div>
    <!-- ici l'admin aura toutes les stats -->
    <div class="tile is-parent" v-if="isAdmin">
      <article class="tile is-child box has-background-danger card-1">
         <div class="block is-flex is-flex-direction-column is-justify-content-center is-align-items-center" style="height:100%;">
              <div class=" has-text-centered">
                <b-icon icon="chart-line" pack="fas" size="is-large" type="is-white"></b-icon>
              </div>
              <div class="block has-text-centered">
                <p class="is-size-4 has-text-white">statistiques</p>
              </div>
          </div>
      </article>
    </div>
  </div>
  <!-- ici l'admin verra tous les chiens  -->
  <div class="tile is-parent">
    <article class="tile is-child box has-background-warning card-1">
       <div class="block is-flex is-flex-direction-column is-justify-content-center is-align-items-center" style="height:100%;">
              <div class=" has-text-centered">
                <b-icon icon="paw" pack="fas" size="is-large" type="is-white"></b-icon>
              </div>
              <div class="block has-text-centered">
                <p class="is-size-4 has-text-white">liste des chiens</p>
              </div>
          </div>
    </article>
  </div>
    <div class="tile is-parent" v-if="isAdmin">
    <article class="tile is-child box has-background-dark card-1">
       <div class="block is-flex is-flex-direction-column is-justify-content-center is-align-items-center" style="height:100%;">
              <div class=" has-text-centered">
                <b-icon icon="users" pack="fas" size="is-large" type="is-white"></b-icon>
              </div>
              <div class="block has-text-centered">
                <p class="is-size-4 has-text-white">liste des utilisateurs</p>
              </div>
          </div>
    </article>
  </div>

  
</div>
</template>

<script>
export default {
    name:'BoardCompte',
    computed: {
      isAdmin: function(){
        
        return this.$store.getters.getRule;
      }
    }

}
</script>

<style scoped>


.card-1 {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  cursor: pointer;
}

.card-1:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  transform: translate(0,-5px);
}
</style>