<template>
  <div>
    <NavigationBar></NavigationBar> 
    <main v-if="!isLogin">
      
      <Carousel class="is-hidden-mobile "  > </Carousel>
    </main>

    <section  style="height: 100vh;">
        <router-view> </router-view>
    </section>
    
 
      <Footer v-if="!isLogin"></Footer>

  </div>
</template>

<script>

import NavigationBar from './components/NavigationBar'
import Carousel from './components/Carousel';
import Footer from './components/Footer';
export default {
  name: 'App',
  computed : {
    isLogin : function(){
      return this.$store.getters.isLogin;
    }
  },
  components: {
    NavigationBar,
    Carousel,
    Footer
  }
}
</script>

<style>


</style>
