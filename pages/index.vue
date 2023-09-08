<template>
  <div class="home-template">

    <div class="wrap-h1">
      <template v-for="item of itemData" :key="item.id">
        <h2 class="item-h2" v-html="item.h1"
            :class="{'active-h1': active === `${item[`data-name`]}`,'act-h1': active !== `${item[`data-name`]}`}"
        ></h2>
      </template>

      <h1 class="h1" v-html="homeData.h1"
          :class="{'active-h1-home': active ==='pyramids','act-h1-home': active !== 'pyramids'}"
      ></h1>
    </div>

    <div class="block-wrap">
      <template v-for="elem of itemData" :key="elem.id">
        <NuxtLink :to="`${elem[`data-name`]}`" class="item-wrap" :data-name="`${elem[`data-name`]}`" prefetch>
          <img :src="`${elem[`img-small`]}`" :alt="`${elem.title}`" class="item">
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, onUpdated, nextTick, watchEffect, defineEmits} from "vue";
import {gsap} from "gsap";
import {useTransitionsStore} from '~/store/state';
import {useGetApiStore} from "~/store/getApi";

definePageMeta({
  layout: "default",
  pageTransition: {
    mode: 'in-out',
    css: false,
    onBeforeEnter(el) {
      useTransitionsStore().homeBeforeEnter(el);
    },
    onEnter(el, done) {
      useTransitionsStore().homeEnter(el, done)
    },
    onLeave(el, done) {
      useTransitionsStore().homeLeave(el, done);
    }
  }
});

const emit = defineEmits(['dataName']);
const store = useTransitionsStore();
const active = ref('pyramids');
const homeData = ref({});
const itemData = ref();

watchEffect(async () => {
  emit('dataName', active.value)
  store.dataName = active.value;
  if (Object.keys(useGetApiStore().data).length > 0) {
    homeData.value = await useGetApiStore().data["/"]
    useHead({
      title: await homeData.value.title
    })
    itemData.value = {...useGetApiStore().data};
    delete itemData.value["/"]
  }
})

onMounted(() => {
  const root = document.documentElement;

  gsap.set(root, {'--opacity-bg': 0});

  const bMobile =
      navigator.userAgent.indexOf("Mobile") !== -1 ||
      navigator.userAgent.indexOf("iPhone") !== -1 ||
      navigator.userAgent.indexOf("Android") !== -1 ||
      navigator.userAgent.indexOf("Windows Phone") !== -1;

  if (bMobile) {
    store.checkTouch = true;
    gsap.set(root, {'--hoverFocus': 'translateY(0%)'});
  }
})

onUpdated(() => {
  const arrItem = [...document.querySelectorAll('.item-wrap')];
  const blockWrap = document.querySelector('.block-wrap');

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
      store.position = elem.getBoundingClientRect();
    });
  })

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

.wrap-h1
  position: relative
  max-width: 1000px
  margin: auto auto 0

.h2
  font: 68px 'Roboto-bold'

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
  max-width: 1000px
  padding: 0 5px
  margin: 50px auto auto
  z-index: 1

.item-wrap
  padding: 0 5px
  transition: 0.6s
  outline: none

  &:hover,
  &:focus
    transform: var(--hoverFocus)

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
