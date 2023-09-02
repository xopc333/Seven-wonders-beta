import {defineStore} from 'pinia'
import {ref, reactive} from "vue";
import {gsap} from "gsap";

export const useTransitionsStore = defineStore('transitions', () => {
  const position = ref();
  const dataName = ref();
  const widthItem = ref();
  const check = ref(false);
  const checkTouch = ref(false);

  let right, bottom, root, Top, Left, Height;

  function sizeBox() {
    let {top, height, left, width} = position.value;
    Top = top;
    Left = left;
    Height = height * 0.1;
    right = Math.round(window.visualViewport.width - (left + width));
    bottom = Math.round(window.visualViewport.height - (top + height));
  }

  function sizeWidthItem() {
    let W_Width = window.screen.availWidth;
    if (W_Width < 832) {
      widthItem.value = W_Width * 0.03;
    }
  }

  const articleFromEnter = (el) => {
    root = document.documentElement;
    sizeBox();
    sizeWidthItem();
    gsap.set(el.childNodes[2], {classList: 'article'});
    gsap.set(root, {'--top': `${Top}px`, '--right': `${right}px`, '--bottom': `${bottom}px`, '--left': `${Left}px`});
    gsap.set(el, {position: "absolute",})
  }

  const articleEnter = (el, done) => {
    gsap.set(root, {
      '--top': '25vh',
      '--right': `${widthItem.value}px`,
      '--bottom': '25dvh',
      '--left': `${widthItem.value}px`,
      '--opacity-header-h1': 1
    });
    //gsap.set(el.childNodes[1].childNodes[2],{classList: 'header-h1 active-header-h1'});
    gsap.set(el, {delay: 1, position: 'relative'}).then(done);
  }

  const articleBeforeLeave = (el) => {
  }

  const articleLeave = (el, done) => {
    root = document.documentElement;
    check.value = false;

    let topHeight, bottomHeight;

    if (checkTouch.value) {
      topHeight = Top;
      bottomHeight = bottom;
    }
    if (!checkTouch.value) {
      topHeight = Top + Height;
      bottomHeight = bottom - Height;
    }

    gsap.set(el.childNodes[2], {classList: 'article'});
    gsap.set(root, {
      '--top': `${topHeight}px`,
      '--right': `${right + 5}px`,
      '--bottom': `${bottomHeight}px`,
      '--left': `${Left + 5}px`,
      '--bottom-header-h1': '25dvh',
      '--opacity-header-h1': 0
    });
    gsap.to(el, {duration: 0.6}).then(done);
  }
  //_______________ home________________//

  const homeBeforeEnter = (el) => {
    root = document.documentElement;
    gsap.set(root, {'--transform': '150%', '--opacity': 0});
    gsap.set(el, {opacity: 0, position: "absolute"});
  }

  const homeEnter = (el, done) => {
    gsap.set(root, {'--transform': 0, '--opacity': 1}) //.then(done);
    gsap.to(el, {duration: 0.6, opacity: 1, ease: "power1.out"}).delay(0.2)//.then(done);
    gsap.set(el, {delay: 1, position: 'relative'}).then(done);
  }

  const homeLeave = (el, done) => {
    const item = el.childNodes[1].querySelector(`[data-name="${dataName.value}"]`);

    gsap.set(item.childNodes[0], {visibility: 'hidden'});
    //item.childNodes[0].style.setProperty('visibility', 'hidden');
    gsap.to(el, {duration: 0.4, opacity: 0}).then(done);

  }

  return {
    position, dataName, widthItem, check, checkTouch, articleFromEnter, articleEnter,
    homeLeave, homeEnter, homeBeforeEnter, articleLeave, articleBeforeLeave
  }
})
