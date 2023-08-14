<template>
  <div class="main-wrap">
<!--    <div class="wrap-img" :class="{'active': active === 'chichen-itza'}">-->
<!--      <img src="/seven-wonders/chichen-itza.jpg" alt="" class="img">-->
<!--    </div>-->
<!--    <div class="wrap-img" :class="{'active': active === 'coliseum'}">-->
<!--      <img src="/seven-wonders/coliseum.jpg" alt="" class="img">-->
<!--    </div>-->
<!--    <div class="wrap-img" :class="{'active': active === 'machu-picchu'}">-->
<!--      <img src="/seven-wonders/machu-picchu.jpg" alt="" class="img">-->
<!--    </div>-->
<!--    <div class="wrap-img" :class="{'active': active === 'petra'}">-->
<!--      <img src="/seven-wonders/petra.jpg" alt="" class="img">-->
<!--    </div>-->
<!--    <div class="wrap-img" :class="{'active': active === 'statue'}">-->
<!--      <img src="/seven-wonders/statue.jpg" alt="" class="img">-->
<!--    </div>-->
<!--    <div class="wrap-img" :class="{'active': active === 'taj-mahal'}">-->
<!--      <img src="/seven-wonders/taj-mahal.jpg" alt="" class="img">-->
<!--    </div>-->
<!--    <div class="wrap-img" :class="{'active': active === 'wall'}">-->
<!--      <img src="/seven-wonders/wall.jpg" alt="" class="img">-->
<!--    </div>-->
<!--    <div class="wrap-img" :class="{'active': active === 'pyramids'}">-->
<!--      <img src="/seven-wonders/pyramids.jpg" alt="" class="img">-->
<!--    </div>-->

    <div class="wrap-h1">
      <h2 class="item-h2"
          :class="{'active-h1': active === 'chichen-itza','act-h1': active !== 'chichen-itza'}"
      >Chichen-Itza</h2>

      <h2 class="item-h2"
          :class="{'active-h1': active === 'coliseum','act-h1': active !== 'coliseum'}"
      >Coliseum</h2>

      <h2 class="item-h2"
          :class="{'active-h1': active === 'machu-picchu','act-h1': active !== 'machu-picchu'}"
      >Machu-Picchu</h2>

      <h2 class="item-h2"
          :class="{'active-h1': active === 'petra','act-h1': active !== 'petra'}"
      >Petra</h2>

      <h2 class="item-h2"
          :class="{'active-h1': active === 'statue','act-h1': active !== 'statue'}"
      >Statue of<br>Christ the Redeemer</h2>

      <h2 class="item-h2"
          :class="{'active-h1': active === 'taj-mahal','act-h1': active !== 'taj-mahal'}"
      >Taj-Mahal</h2>

      <h2 class="item-h2"
          :class="{'active-h1': active === 'wall','act-h1': active !== 'wall'}"
      >The great Wall of China</h2>

      <h1 class="h1"
          :class="{'active-h1-home': active === 'pyramids','act-h1-home': active !== 'pyramids'}"
      >7 wonders of the world<br><span class="h2">Our time</span></h1>
    </div>

    <div class="block-wrap">
      <NuxtLink to="/about" class="item-wrap" data-name="chichen-itza">
        <img src="/seven-wonders/small-1000/chichen-itza(1000).jpg" alt="" class="item">
      </NuxtLink>
      <NuxtLink to="/" class="item-wrap" data-name="coliseum">
        <img src="/seven-wonders/small-1000/coliseum(1000).jpg" alt="" class="item">
      </NuxtLink>
      <NuxtLink to="/" class="item-wrap" data-name="machu-picchu">
        <img src="/seven-wonders/small-1000/machu-picchu(1000).jpg" alt="" class="item">
      </NuxtLink>
      <NuxtLink to="/" class="item-wrap" data-name="petra">
        <img src="/seven-wonders/small-1000/petra(1000).jpg" alt="" class="item">
      </NuxtLink>
      <NuxtLink to="/" class="item-wrap" data-name="statue">
        <img src="/seven-wonders/small-1000/statue(1000).jpg" alt="" class="item">
      </NuxtLink>
      <NuxtLink to="/" class="item-wrap" data-name="taj-mahal">
        <img src="/seven-wonders/small-1000/taj-mahal(1000).jpg" alt="" class="item">
      </NuxtLink>
      <NuxtLink to="/" class="item-wrap" data-name="wall">
        <img src="/seven-wonders/small-1000/wall(1000).jpg" alt="" class="item">
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import {onMounted,ref,nextTick,watch,watchEffect,defineEmits} from "vue";

definePageMeta({
  layout: "default",
});

useHead({
  title: 'Home ',
})
const emit = defineEmits(['dataName']);
const active = ref('pyramids');
const route = useRoute().path;

if(route === '/') active.value = 'pyramids';

// watch(active,() => {
//   emit('dataName', active.value)
//   console.log('ypa',active.value)
// })
// watch(route,() => {
//   if(route === '/') active.value = 'pyramids';
//
// })

watchEffect(() =>{
  emit('dataName', active.value)
  //console.log('ypa',active.value)
})

onMounted(() => {

  const arrItem = [...document.querySelectorAll('.item-wrap')]
  const blockWrap = document.querySelector('.block-wrap');

  function getDataName(event) {
    arrItem.forEach(elem => {
      elem.addEventListener(event,()=>{
        nextTick().then(() => active.value = elem.attributes['data-name'].nodeValue)
      });
    })
  }
  function setDataName(event) {
    blockWrap.addEventListener(event,()=>{
      nextTick().then(() => active.value = 'pyramids')
    });
  }

  getDataName('mouseenter');
  getDataName('focus');
  setDataName('mouseleave');
  setDataName('focusout');
})
</script>

<style lang="sass" scoped>
.main-wrap
  width: 100%
  height: 100vh
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

//.wrap-img
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100vh
  overflow: hidden
  z-index: -1
  opacity: 0
  transition: 0.6s

//.active
  opacity: 1

//.img
  height: 100%
  object-fit: cover

.wrap-h1
  position: relative
  margin: auto auto 0

.h2
  //width: max-content
  font: 70px 'Roboto-bold'
  //text-transform: uppercase
  //text-align: center
  //color: #F0EEEF //rgba(255, 255, 255, 0.6)
  //background: linear-gradient(180deg, transparent 0%, #ffffff)
  //-webkit-background-clip: text
  //-webkit-text-stroke: 1px #000
  //margin: 0 auto
  //text-shadow: 0 0 20px rgba(0,0,0,1)
  //visibility: hidden
  //transform: translateY(250%)
  //transition: 0.6s
  //opacity: 0

.h1
  width: max-content
  font: 80px 'Avantgardectt-bold'
  text-transform: uppercase
  text-align: center
  color: #F0EEEF
  margin: 0
  text-shadow: 0 0 20px rgba(0,0,0,1)
  transition: 0.6s
  transform: translateY(150%)
  opacity: 0

.active-h1-home
  transform: translateY(0)
  opacity: 1
  transition: 0.6s

.act-h1-home
  animation: move-h1-home 0.6s

@keyframes move-h1-home
  from
    transform: translateY(0)
  to
    transform: translateY(-20vh)

.item-h2
  position: absolute
  left: 50%
  bottom: 0
  width: max-content
  font: 80px 'Avantgardectt-bold'
  text-transform: uppercase
  text-align: center
  color: #F0EEEF
  text-shadow: 0 0 20px rgba(0,0,0,1)
  transform: translate(-50%,230%)
  transition: 0.6s
  opacity: 0

.active-h1
  transform: translate(-50%,0)
  transition: 0.6s
  opacity: 1

.act-h1
  animation: move-h1 0.6s

@keyframes move-h1
  from
    transform: translate(-50%,0)
  to
    transform: translate(-50%,-20vh)

.block-wrap
  display: flex
  flex-wrap: nowrap
  //gap: 0 10px
  max-width: 1000px
  padding: 0 5px
  margin: 50px auto 70px
  z-index: 1
  //outline: 1px solid red

.item-wrap
  //border-radius: 10px
  padding: 0 5px
  //overflow: hidden
  //box-shadow: 0 0 20px 0 rgba(0,0,0,1)
  transition: 0.6s
  outline: none
  &:hover,
  &:focus
    transform: translateY(-10%)

.item
  height: 30vh
  border-radius: 10px
  object-fit: cover
  object-position: center
  box-shadow: 0 0 20px 0 rgba(0,0,0,1)

</style>
