<template>
  <div class="body-wrap">
    <div class="wrap-img" :class="{'active': active === 'chichen-itza'}">
      <img src="/seven-wonders/chichen-itza.jpg" alt="" class="img">
    </div>
    <div class="wrap-img" :class="{'active': active === 'coliseum'}">
      <img src="/seven-wonders/coliseum.jpg" alt="" class="img">
    </div>
    <div class="wrap-img" :class="{'active': active === 'machu-picchu'}">
      <img src="/seven-wonders/machu-picchu.jpg" alt="" class="img">
    </div>
    <div class="wrap-img" :class="{'active': active === 'petra'}">
      <img src="/seven-wonders/petra.jpg" alt="" class="img">
    </div>
    <div class="wrap-img" :class="{'active': active === 'statue'}">
      <img src="/seven-wonders/statue.jpg" alt="" class="img">
    </div>
    <div class="wrap-img" :class="{'active': active === 'taj-mahal'}">
      <img src="/seven-wonders/taj-mahal.jpg" alt="" class="img">
    </div>
    <div class="wrap-img" :class="{'active': active === 'wall'}">
      <img src="/seven-wonders/wall.jpg" alt="" class="img">
    </div>
    <div class="wrap-img" :class="{'active': active === 'pyramids'}">
      <img src="/seven-wonders/pyramids.jpg" alt="" class="img">
    </div>
    <NuxtPage @dataName="(i)=>{ active = i}"/>
  </div>

</template>

<script setup>
import {defineEmits, onMounted, ref, watch} from "vue";

const emit = defineEmits(['dataName']);

const active = ref();

onMounted(() => {
  const root = document.documentElement;

  function sizeBody() {
    let W_Height = window.screen.availHeight; //window.outerHeight;
    let W_Width = window.screen.availWidth; //outerWidth;
    let n = W_Width / W_Height;

    //if (W_Width > W_Height && n > 1.78) {
    if (W_Width < 800) {
      let vw = Math.floor(W_Height * 1.777777777777778);
      root.style.setProperty("--vw", `${vw / 100}px`);
    } else {
      root.style.setProperty("--vw", "1vw");
    }

  }
  sizeBody();
  window.addEventListener("resize", sizeBody);
})
</script>

<style lang="sass" scoped>
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
    //background-color: rgba(255, 255, 255, 0.3)
    background-color: var(--bgc)
    z-index: -1

.wrap-img
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100vh
  overflow: hidden
  z-index: -1
  opacity: 0
  transition: 0.6s

.active
  opacity: 1

.img
  //width: 100vw
  height: 100%
  object-fit: none

</style>
