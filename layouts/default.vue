<template>
  <NuxtLink to="/" class="button-exit">Exit</NuxtLink>
  <div class="body-wrap">
    <div class="wrap-img" :class="{'active': active === 'chichen-itza'}">
<!--      <img src="/seven-wonders/chichen-itza.jpg" alt="" class="img">-->
      <picture>
        <source media="screen and (min-width: 992px)" srcset="/seven-wonders/chichen-itza.jpg">
        <img src="/seven-wonders/small-1000/chichen-itza(1000).jpg"   class="img" alt="">
      </picture>
    </div>

<!--    <div class="wrap-img" :class="{'active': active === 'coliseum'}">-->
<!--      <img src="/seven-wonders/coliseum.jpg" alt="" class="img">-->
<!--    </div>-->
    <picture class="wrap-img" :class="{'active': active === 'coliseum'}">
      <source media="screen and (min-width: 992px)" srcset="/seven-wonders/coliseum.jpg">
      <img src="/seven-wonders/small-1000/coliseum(1000).jpg" class="img" alt="">
    </picture>
<!--    <div class="wrap-img" :class="{'active': active === 'machu-picchu'}">-->
<!--      <img src="/seven-wonders/machu-picchu.jpg" alt="" class="img">-->
<!--    </div>-->
    <picture class="wrap-img" :class="{'active': active === 'machu-picchu'}">
      <source media="screen and (min-width: 992px)" srcset="/seven-wonders/machu-picchu.jpg">
      <img src="/seven-wonders/small-1000/machu-picchu(1000).jpg" class="img" alt="">
    </picture>
<!--    <div class="wrap-img" :class="{'active': active === 'petra'}">-->
<!--      <img src="/seven-wonders/petra.jpg" alt="" class="img">-->
<!--    </div>-->
    <picture class="wrap-img" :class="{'active': active === 'petra'}">
      <source media="screen and (min-width: 992px)" srcset="/seven-wonders/petra.jpg">
      <img src="/seven-wonders/small-1000/petra(1000).jpg" class="img" alt="">
    </picture>
<!--    <div class="wrap-img" :class="{'active': active === 'statue'}">-->
<!--      <img src="/seven-wonders/statue.jpg" alt="" class="img">-->
<!--    </div>-->
    <picture class="wrap-img" :class="{'active': active === 'statue'}">
      <source media="screen and (min-width: 992px)" srcset="/seven-wonders/statue.jpg">
      <img src="/seven-wonders/small-1000/statue(1000).jpg" class="img" alt="">
    </picture>
<!--    <div class="wrap-img" :class="{'active': active === 'taj-mahal'}">-->
<!--      <img src="/seven-wonders/taj-mahal.jpg" alt="" class="img">-->
<!--    </div>-->
    <picture class="wrap-img" :class="{'active': active === 'taj-mahal'}">
      <source media="screen and (min-width: 992px)" srcset="/seven-wonders/taj-mahal.jpg">
      <img src="/seven-wonders/small-1000/taj-mahal(1000).jpg" class="img" alt="">
    </picture>
<!--    <div class="wrap-img" :class="{'active': active === 'wall'}">-->
<!--      <img src="/seven-wonders/wall.jpg" alt="" class="img">-->
<!--    </div>-->
    <picture class="wrap-img" :class="{'active': active === 'wall'}">
      <source media="screen and (min-width: 992px)" srcset="/seven-wonders/wall.jpg">
      <img src="/seven-wonders/small-1000/wall(1000).jpg" class="img" alt="">
    </picture>
    <div class="wrap-img" :class="{'active': active === 'pyramids'}">
<!--      <img src="/seven-wonders/pyramids.jpg" alt="" class="img">-->
      <picture>
        <source media="screen and (min-width: 992px)" srcset="/seven-wonders/pyramids.jpg">
        <img src="/seven-wonders/small-1000/pyramids(1000).jpg" class="img" alt="">
      </picture>
    </div>

    <NuxtPage @dataName="(i)=>{ active = i}"/>
  </div>

</template>

<script setup>
import {defineEmits, onMounted, ref, watch} from "vue";
import {gsap} from "gsap";
import {useTransitionsStore} from '~/store/state';

const store = useTransitionsStore();

//const emit = defineEmits(['dataName']);

const active = ref();

onMounted(() => {
  const root = document.documentElement;

  function sizeBody() {
    let W_Height = window.screen.availHeight; //window.outerHeight;
    let W_Width = window.screen.availWidth; //outerWidth;
    let w = (W_Width - 800)/ 2;
    store.widthItem = w;
    //let n = W_Width / W_Height;

    //if (W_Width > W_Height && n > 1.78) {
    if (W_Width < 800) {
      let vw = Math.floor(W_Height * 1.777777777777778);
      root.style.setProperty("--vw", `${vw / 100}px`);
      //console.log(vw)
    } else {
      root.style.setProperty("--vw", "1vw");
    }

    if(!store.check){
      if (W_Width < 832) {
        gsap.set(root, {'--left': '3vw', '--right': '3vw', '--top': '25vh', '--bottom': '25vh'})
        //root.style.setProperty("--width", '16px');
        store.widthItem = W_Width * 0.03;
        console.log('check.value');
      } else {
        //store.widthItem = w;
        gsap.set(root, {'--left': `${w}px`, '--right': `${w}px`})
        //root.style.setProperty("--width", `${w}px`);
        console.log('check.value', 'ypa');
      }
    }

    // store.position.viewportW = Math.round(W_Width); //.toFixed(2);
    // store.position.viewportH = Math.round(W_Height); //.toFixed(2);

  }
  sizeBody();
  window.addEventListener("resize", sizeBody);
})
</script>

<style lang="sass" scoped>
.button-exit
  position: fixed
  top: 30px
  right: 30px

.body-wrap
  position: relative
  //position: fixed
  //top: 0
  //left: 0
  //width: 100%
  //z-index: -1
  overflow: hidden
  &:after
    position: absolute
    content: ''
    inset: 0
    backdrop-filter: blur(var(--blur))
    background-color: var(--bgc)
    //transition: 0.4s
    //will-change: backdrop-filter, background-color contents
    z-index: -1

.wrap-img
  position: absolute
  //top: 0
  //left: 0
  //width: 100%
  //height: 100vh
  inset: 0
  overflow: hidden
  z-index: -1
  opacity: 0
  transition: 0.6s

.active
  opacity: 1

.img
  //width: 100vw
  height: 100%
  object-fit: cover

</style>
