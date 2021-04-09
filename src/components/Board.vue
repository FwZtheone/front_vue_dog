<template>

   <div class="tile ancestor">
       <div class="tile">
           <div class="tile is-parent is-2 is-vertical p-0 " style="height: 100vh;">
               <div class="tile is-child box has-background-link-light  ">


                <b-menu>
                    <b-menu-list label="adogmoi">
                        <b-menu-item label="Expo" icon="link" tag="router-link"  to="/informatonAdmin"></b-menu-item>
                        <b-menu-item icon="settings" :active="isActive" expanded>
                                <template #label="props">
                                    Administration
                                    <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
                                </template>
                            <b-menu-item icon="account" label="Utilisateurs"></b-menu-item>
                            <b-menu-item icon="account" label="Chiens"></b-menu-item>
                            <b-menu-item icon="account" label="Activitées"></b-menu-item>
                      
                        </b-menu-item>
                        <b-menu-item icon="account" label="Mon compte">
                            <b-menu-item label="données personnelles"></b-menu-item>
                        </b-menu-item>
                    </b-menu-list>
                    <b-menu-list>
                    <!-- <b-menu-item label="Expo" icon="link" tag="router-link" target="_blank" to="/expo"></b-menu-item> -->
                    </b-menu-list>
                    <b-menu-list>
                        <b-menu-item label="Déconnexion" class="is-active "></b-menu-item>
                    </b-menu-list>
            </b-menu>
                            
               </div>

           </div>
        
        <router-view>

        </router-view>

        

       </div>

   </div>
  
</template>

<script>
export default {
    name : 'Board',
    data : function(){
        return {
            isActive : true
        }
    }

}
</script>

<style scoped>
 


</style>