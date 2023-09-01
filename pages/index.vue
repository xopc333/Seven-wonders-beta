<template>
  <div class="home-template">

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
          :class="{'active-h1-home': active ==='pyramids','act-h1-home': active !== 'pyramids'}"
      >7 wonders of <span style="white-space: nowrap;">the world</span><br><span class="h2">Our time</span></h1>
    </div>

    <div class="block-wrap">
      <NuxtLink to="/about" class="item-wrap" data-name="chichen-itza">
        <img src="/seven-wonders/small-1000/chichen-itza(1000).jpg" alt="" class="item">
      </NuxtLink>
      <NuxtLink to="/" class="item-wrap" data-name="coliseum">
        <img src="/seven-wonders/small-1000/coliseum(1000).jpg" alt="" class="item">
      </NuxtLink>
      <NuxtLink to="/about" class="item-wrap" data-name="machu-picchu">
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
      <NuxtLink to="/about" class="item-wrap" data-name="wall">
        <img src="/seven-wonders/small-1000/wall(1000).jpg" alt="" class="item">
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, reactive, nextTick, watch, watchEffect, defineEmits} from "vue";
import {gsap} from "gsap";
import {useTransitionsStore} from '~/store/state';

definePageMeta({
  layout: "default",
  pageTransition: {
    mode: 'in-out',
    //name: 'page'
    css: false,
    onBeforeEnter(el) {
      useTransitionsStore().homeBeforeEnter(el);
      //(!state.check) ? actorFromEnterFalse(el):actorFromEnterTrue(el);
    },
    onEnter(el, done) {
      useTransitionsStore().homeEnter(el, done)
      //(!state.check) ? actorEnterFalse(el, done) : actorEnterTrue(el, done);
    },
    // onBeforeLeave(el) {
    //   useTransitionsStore().homeBeforeLeave(el);
    //   ///actorBeforeLeaveTrue(el);
    // },
    onLeave(el, done) {
      useTransitionsStore().homeLeave(el, done);
      ///(!state.check) ? actorLeave(el, done):actorLeaveTrue(el, done);
    }
  }
});

useHead({
  title: 'Home ',
})
const emit = defineEmits(['dataName']);
const store = useTransitionsStore();
const active = ref('pyramids');
//const route = useRoute().path;

// watch(active,() => {
//   emit('dataName', active.value)
//   console.log('ypa',active.value)
// })

watchEffect(() => {
  emit('dataName', active.value)
  store.dataName = active.value;
  //console.log('ypa',active.value)
})

onMounted(() => {
  const root = document.documentElement;
  const arrItem = [...document.querySelectorAll('.item-wrap')]
  const blockWrap = document.querySelector('.block-wrap');

  gsap.set(root, {'--opacity-bg': 0});

  if (typeof screen.orientation !== 'undefined') {
    store.checkTouch = true;
    gsap.set(root, {'--hoverFocus': 'translateY(0%)'});
  }

  function getDataName(event) {
    arrItem.forEach(elem => {
      elem.addEventListener(event, () => {
        nextTick().then(() => active.value = elem.attributes['data-name'].nodeValue)
      });
    })
  }

  function setDataName(event) {
    blockWrap.addEventListener(event, () => {
      nextTick().then(() => active.value = 'pyramids')
    });
  }

  getDataName('mouseenter');
  getDataName('focus');
  setDataName('mouseleave');
  setDataName('focusout');

  arrItem.forEach(elem => {
    elem.addEventListener('click', () => {
      // let {x,y} = elem.getBoundingClientRect();
      // store.position.homeX = x.toFixed(2); //Math.round(x);  //x.toFixed(2);
      // store.position.homeY = y.toFixed(2); //Math.round(y);  //y.toFixed(2);
      //console.log(elem.getBoundingClientRect());
      store.position = elem.getBoundingClientRect();
    });
  })
  //store.position.itemW = Math.round(arrItem[0].getBoundingClientRect().width);

  // const homeTemplate = document.querySelector('.home-template').getBoundingClientRect();
  // console.log(homeTemplate,'homeTemplate');

})
</script>

<style lang="sass" scoped>
.home-template
  position: relative
  width: 100%
  height: 100vh
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  inset: 0

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
  max-width: 1000px
  margin: auto auto 0
//outline: 1px solid red

.h2
  //width: max-content
  font: 68px 'Roboto-bold'
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
  max-width: 1000px
  font: 78px 'Avantgardectt-bold'
  text-transform: uppercase
  text-align: center
  color: #F0EEEF
  margin: 0
  text-shadow: 0 0 20px rgba(0, 0, 0, 1)
  transition: 0.6s
  transform: translateY(150%)
  opacity: 0

.active-h1-home
  transform: translateY(var(--transform))
  opacity: var(--opacity)
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
  width: 100%
  //max-content
  font: 78px 'Avantgardectt-bold'
  text-transform: uppercase
  text-align: center
  color: #F0EEEF
  text-shadow: 0 0 20px rgba(0, 0, 0, 1)
  transform: translate(-50%, 230%)
  transition: 0.6s
  opacity: 0

.active-h1
  transform: translate(-50%, 0)
  transition: 0.6s
  opacity: 1

.act-h1
  animation: move-h1 0.6s

@keyframes move-h1
  from
    transform: translate(-50%, 0)
  to
    transform: translate(-50%, -20vh)

.block-wrap
  display: flex
  flex-wrap: nowrap
  //gap: 0 10px
  max-width: 1000px
  padding: 0 5px
  margin: 50px auto auto
  //70px
  z-index: 1
//outline: 1px solid red

.item-wrap
  padding: 0 5px
  //overflow: hidden
  //box-shadow: 0 0 20px 0 rgba(0,0,0,1)
  transition: 0.6s
  outline: none

  &:hover,
  &:focus
    transform: var(--hoverFocus)
    //translateY(-10%)

.item
  height: 30vh
  border-radius: 10px
  object-fit: cover
  object-position: center
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 1)

@media only screen and (max-width: 880px)
  .h1,
  .item-h2
    font-size: 11.5vmin
  .h2
    font-size: 10.1vmin

</style>
