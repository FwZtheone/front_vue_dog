<template>
    <b-carousel>
      
   
        <b-carousel-item  v-for="(carousel, i) in carousels" :key="i">
            <!-- <section :class="`hero is-medium is-${carousel.color} 
            
            `background-image: url('/src/assets/pictures/slide1.jpg');
                   background-repeat: no-repeat; background-position: center top; background-size: cover;`
            
            
            `"> -->
                    
                <section
                class="hero is-medium"
                 :style="{'background-image' : 'url(' + carousel.path + ')', 
                 'background-repeat': 'no-repeat', 'background-position': 'center top', 'background-size': 'cover'
                 }"
                
                 
                 >

                <div class="hero-body has-text-centered ">
                  
                </div>
            </section>
        </b-carousel-item>

    </b-carousel>

</template>



<script>
export default {
    name: 'Carousel',
     data: function(){
        return {
            carousels: [
                { text: 'Slide 1', path: "/assets/slide1.jpg" },
                { text: 'Slide 2', path: '/assets/slide2.jpg' },
                { text: 'Slide 3', path: '/assets/slide3.jpg' },
                { text: 'Slide 4', path: '/assets/slide4.jpg' },
                { text: 'Slide 5', path: '/assets/slide5.jpg' }
            ]
        }
    }
}
</script>


<style scoped>


    .customback{
        background-image: url('/assets/slide1.jpg');
    }

 
</style>