<template>
  <div class="body-wrap">

    <template v-for="item of itemData" :key="item.id">
      <picture class="wrap-img" :class="{'active': active === `${item[`data-name`]}`}">
        <source media="screen and (min-width: 992px)" :srcset="`${item[`img-big`]}`">
        <img :src="`${item[`img-small`]}`" class="img" :alt="`${item.title}`">
      </picture>
    </template>

    <NuxtPage @dataName="(i)=>{ active = i}"/>

    <NuxtLink to="https://chibisov153.github.io/" class="button button-exit" title="Exit">
      <svg class="button-cross" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"/>
      </svg>
    </NuxtLink>
  </div>

</template>

<script setup>
import {onMounted, ref, watch, watchEffect} from "vue";
import {gsap} from "gsap";
import {useTransitionsStore} from '~/store/state';
import {useGetApiStore} from "~/store/getApi";

const store = useTransitionsStore();

const active = ref();
const itemData = ref();
const eventData = ref();

useGetApiStore().fetchData();

watch(eventData, async () => {
  itemData.value = await useGetApiStore().data;
})

watchEffect(() => {
  eventData.value = useGetApiStore().data
})

onMounted(() => {
  const root = document.documentElement;

  function sizeBody() {
    let W_Height = window.screen.availHeight;
    store.W_Width = window.screen.availWidth;
    store.widthItem = (store.W_Width - 800) / 2;

    if (store.W_Width < 880) {
      let vw = Math.floor(W_Height * 1.777777777777778);
      root.style.setProperty("--vw", `${vw / 100}px`);
    } else {
      root.style.setProperty("--vw", "1vw");
    }

    if (store.check) store.widthItem = 70;

    if (store.W_Width < 880) store.widthItem = Math.round(store.W_Width * 0.03);

    if (store.W_Width < 1380 && store.check) gsap.set(root, {'--left-header-h1': 'calc(var(--left) + 20px)'});
    if (store.W_Width > 1380 && store.check) gsap.set(root, {'--left-header-h1': 'calc(50% - 600px)'});

    gsap.set(root, {'--left': `${store.widthItem}px`, '--right': `${store.widthItem}px`})
  }

  sizeBody();
  window.addEventListener("resize", sizeBody);
})
</script>

<style lang="sass" scoped>
.button-exit
  position: fixed
  top: 10px
  right: 10px

.button-cross
  transform: scale(0.7)
  fill: var(--color-button-one)

.body-wrap
  position: relative
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
  inset: 0
  overflow: hidden
  z-index: -1
  opacity: 0
  transition: 0.6s

.active
  opacity: 1

.img
  height: 100%
  object-fit: cover

@media only screen and (max-width: 880px)
  .button-exit
    top: auto
    bottom: 10px

</style>
