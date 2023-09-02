<template>
  <div class="body-wrap">
    <div class="wrap-img" :class="{'active': active === 'chichen-itza'}">
      <picture>
        <source media="screen and (min-width: 992px)" srcset="/seven-wonders/chichen-itza.jpg">
        <img src="/seven-wonders/small-1000/chichen-itza(1000).jpg" class="img" alt="">
      </picture>
    </div>

    <picture class="wrap-img" :class="{'active': active === 'coliseum'}">
      <source media="screen and (min-width: 992px)" srcset="/seven-wonders/coliseum.jpg">
      <img src="/seven-wonders/small-1000/coliseum(1000).jpg" class="img" alt="">
    </picture>

    <picture class="wrap-img" :class="{'active': active === 'machu-picchu'}">
      <source media="screen and (min-width: 992px)" srcset="/seven-wonders/machu-picchu.jpg">
      <img src="/seven-wonders/small-1000/machu-picchu(1000).jpg" class="img" alt="">
    </picture>

    <picture class="wrap-img" :class="{'active': active === 'petra'}">
      <source media="screen and (min-width: 992px)" srcset="/seven-wonders/petra.jpg">
      <img src="/seven-wonders/small-1000/petra(1000).jpg" class="img" alt="">
    </picture>

    <picture class="wrap-img" :class="{'active': active === 'statue'}">
      <source media="screen and (min-width: 992px)" srcset="/seven-wonders/statue.jpg">
      <img src="/seven-wonders/small-1000/statue(1000).jpg" class="img" alt="">
    </picture>

    <picture class="wrap-img" :class="{'active': active === 'taj-mahal'}">
      <source media="screen and (min-width: 992px)" srcset="/seven-wonders/taj-mahal.jpg">
      <img src="/seven-wonders/small-1000/taj-mahal(1000).jpg" class="img" alt="">
    </picture>

    <picture class="wrap-img" :class="{'active': active === 'wall'}">
      <source media="screen and (min-width: 992px)" srcset="/seven-wonders/wall.jpg">
      <img src="/seven-wonders/small-1000/wall(1000).jpg" class="img" alt="">
    </picture>
    <div class="wrap-img" :class="{'active': active === 'pyramids'}">

      <picture>
        <source media="screen and (min-width: 992px)" srcset="/seven-wonders/pyramids.jpg">
        <img src="/seven-wonders/small-1000/pyramids(1000).jpg" class="img" alt="">
      </picture>
    </div>

    <NuxtPage @dataName="(i)=>{ active = i}"/>

    <NuxtLink to="/" class="button-exit">Exit</NuxtLink>
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
    let w = (W_Width - 800) / 2;
    store.widthItem = w;
    //let n = W_Width / W_Height;

    //if (W_Width > W_Height && n > 1.78) {
    if (W_Width < 880) {
      let vw = Math.floor(W_Height * 1.777777777777778);
      root.style.setProperty("--vw", `${vw / 100}px`);
      //console.log(vw)
    } else {
      root.style.setProperty("--vw", "1vw");
    }

    if (!store.check) {
      if (W_Width < 832) {
        gsap.set(root, {'--left': '3vw', '--right': '3vw'})
        store.widthItem = W_Width * 0.03;
        //gsap.set(root, {'--left': `${store.widthItem}px`, '--right': `${store.widthItem}px`})
        //console.log('check.value');
      } else {
        gsap.set(root, {'--left': `${w}px`, '--right': `${w}px`})
        //console.log('check.value', 'ypa');
      }
    }

    // if (W_Width < 400) {
    //   //store.heightHeaderH1 = '85vh';
    //   gsap.set(root,{'--bottom-header-h1': '85vh'});
    // } else {
    //   gsap.set(root,{'--bottom-header-h1': '82vh'});
    // }

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
    backdrop-filter: blur(6px)
    background-color: rgba(0, 0, 0, 0.3)
    transition: 0.4s
    will-change: contents
    opacity: var(--opacity-bg)
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
