<template>
  <div class="article-template">
    <NuxtLink to="/" class="button button-back" title="Back">
      <div class="button-box">
				<span class="button-elem">
					<svg viewBox="0 0 46 40" id="fleche" xmlns="http://www.w3.org/2000/svg">
						<path
                d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
					</svg>
				</span>
        <span class="button-elem">
          <svg viewBox="0 0 46 40"><use xlink:href="#fleche"></use></svg>
        </span>
      </div>
    </NuxtLink>

    <section class="header">
      <picture>
        <source media="screen and (min-width: 992px)" :srcset="`${itemData[`img-big`]}`">
        <img :src="`${itemData[`img-small`]}`" class="header-img" :alt="`${itemData.title}`"/>
      </picture>
      <h1 class="header-h1" v-html="itemData.h1"></h1>
    </section>

    <section class="article">
      <div class="article-text">
        <div v-html="itemData.content"></div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {onMounted, ref, watchEffect, defineEmits} from "vue";
import {gsap} from "gsap";
import {useTransitionsStore} from '~/store/state';
import {useGetApiStore} from "~/store/getApi";

definePageMeta({
  layout: "default",
  pageTransition: {
    mode: 'in-out',
    css: false,
    onBeforeEnter(el) {
      useTransitionsStore().articleFromEnter(el);
    },
    onEnter(el, done) {
      useTransitionsStore().articleEnter(el, done)
    },
    onLeave(el, done) {
      useTransitionsStore().articleLeave(el, done);
    }
  }
});

const route = useRoute().path.substring(1);
console.log('ypa', route)
const emit = defineEmits(['dataName', 'check']);
const active = ref(route);
const itemData = ref({});
const storeData = ref();

const store = useTransitionsStore();

watchEffect(async () => {
  storeData.value = useGetApiStore().data;
  emit('dataName', active.value)
  if (Object.keys(useGetApiStore().data).length > 0) {
    itemData.value = await useGetApiStore().data[route]
    useHead({
      title: await itemData.value.title
    })
  }
})

onMounted(() => {
  const article = document.querySelector('.article');
  const root = document.documentElement;
  let touchstartY = 0;
  let touchendY = 0;

  gsap.set(root, {'--opacity-bg': 1});

  function moveArticle() {
    gsap.set(article, {className: 'article active-article'});

    if (store.check) return false

    store.check = true;

    let value;

    if (store.W_Width < 880) {
      store.widthItem = Math.round(store.W_Width * 0.03);
    } else {
      store.widthItem = 70;
    }

    if (store.W_Width < 1380) {
      value = 'calc(var(--left) + 20px)';
    } else {
      value = 'calc(50% - 600px)'
    }

    gsap.set(root, {
      '--top': '3vh', '--right': `${store.widthItem}px`, '--bottom': '82dvh',
      '--left': `${store.widthItem}px`, '--bottom-header-h1': '82dvh', '--left-header-h1': value
    });

  }

  document.addEventListener('wheel', function (e) {
    if (e.deltaY >= 100) moveArticle();
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === 'ArrowDown') moveArticle();
  });

  document.addEventListener('touchstart', e => {
    touchstartY = e.changedTouches[0];
  });

  document.addEventListener('touchend', e => {
    touchendY = e.changedTouches[0];
    let xAbs = Math.abs(touchstartY.pageY - touchendY.pageY);
    if (xAbs > 50) moveArticle();
  });

})

</script>

<style lang="sass" scoped>
.article-template
  position: relative
  inset: 0

.button-box
  display: flex
  position: absolute
  top: 0
  left: 0

.button-elem
  display: block
  width: 20px
  height: 20px
  margin: 17px 18px 0 18px
  transform: rotate(180deg)
  fill: var(--color-button-one)

.button-back
  position: fixed
  top: 10px
  left: 10px
  z-index: 1

  &:hover, &:focus
    > .button-box
      transition: .4s
      transform: translateX(-56px)

.header
  display: flex
  position: sticky
  top: 0
  width: 100%
  clip-path: inset(var(--top) var(--right) var(--bottom) var(--left) round 16px)
  transition: 0.4s
  will-change: contents

.header-img
  height: 100%
  object-fit: cover

picture
  width: 100%
  height: 100dvh

.header-h1
  position: absolute
  bottom: var(--bottom-header-h1)
  left: var(--left-header-h1)
  font: 6.5vmin 'Avantgardectt-bold'
  opacity: var(--opacity-header-h1)
  color: #F0EEEF
  text-shadow: 0 0 20px rgba(0, 0, 0, 1)
  transition: 0.4s

.article
  width: 100%
  height: 72dvh
  overflow-x: hidden
  scrollbar-width: thin
  //Fire Fox
  scrollbar-color: #31363B #232629
  //Fire Fox
  transform: translateY(0)
  transition: 0.6s
  opacity: 0

  &::-webkit-scrollbar
    width: 8px

.active-article
  transform: translateY(-78dvh)
  opacity: 1

.article::-webkit-scrollbar-track-piece
  background-color: #232629

.article::-webkit-scrollbar-thumb:vertical
  border-radius: 8px
  background-color: #31363B

.article-text
  max-width: 1200px
  padding: 0 70px
  margin: 0 auto
  color: #F0EEEF

@media only screen and (max-width: 880px)
  .button-back
    top: auto
    bottom: 10px

  .article-text
    padding: 0 16px


@media only screen and (max-width: 760px)
  .header-h1
    font-size: 7vmin

@media only screen and (max-width: 480px)
  .header-h1
    margin: 0 0 16px

</style>
