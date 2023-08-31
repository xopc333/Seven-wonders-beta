import { defineStore } from 'pinia'
import {ref, reactive} from "vue";
import {gsap} from "gsap";

export const useTransitionsStore = defineStore('transitions', ()=>{
  const position = ref();
  const dataName = ref();
  const widthItem = ref();
  const check = ref(false);
  const checkTouch = ref(false);

  let right, bottom,root,Top,Left,Height;
  function sizeBox() {
    let {top,height,left,width} = position.value;
    Top = top;
    Left = left;
    Height = height * 0.1;
    right = (window.visualViewport.width - (left + width)).toFixed(2)
    bottom = (window.visualViewport.height - (top + height)).toFixed(2)
  }
  const articleFromEnter = (el)=> {
    root = document.documentElement;
    sizeBox();

    gsap.set(el.childNodes[2],{classList:'article'});
    gsap.set(root,{'--top': `${Top}px`, '--right': `${right}px`,'--bottom': `${bottom}px`,'--left': `${Left}px`});
    gsap.set(el,{position: "absolute",})
  }
  const articleEnter = (el, done)=> {
    //check.value = false;
    //console.log(check.value, 'ypa');
    gsap.set(root,{'--top': '25vh', '--right': `${widthItem.value}px`,'--bottom': '25vh','--left': `${widthItem.value}px`,'--opacity-header-h1': 1});
    //gsap.set(el.childNodes[1].childNodes[2],{classList: 'header-h1 active-header-h1'});
    gsap.set(el,{delay: 1, position: 'relative'}).then(done);
  }
  const articleBeforeLeave = (el)=> {
    // console.log(el.childNodes[1].childNodes[2]);
    //gsap.set(el.childNodes[1].childNodes[2],{classList: 'header-h1'});
    // gsap.set(el.childNodes[1].childNodes[2],{, '--boottom-header-h1': '75vh'});
    // console.log(el.childNodes[1].childNodes[2]);
  }
  const articleLeave = (el, done)=> {
    root = document.documentElement;
    check.value = false;

    let topHeight,bottomHeight;

    if (checkTouch.value) {
      topHeight = Top + Height;
      bottomHeight = bottom - Height;
      checkTouch.value = false;
    } else {
      topHeight = Top;
      bottomHeight = bottom;
    }

    gsap.set(el.childNodes[2],{classList:'article'});
    gsap.set(root,{'--top': `${topHeight}px`, '--right': `${right}px`,'--bottom': `${bottomHeight}px`,'--left': `${Left + 5}px`, '--bottom-header-h1': '25vh','--opacity-header-h1': 0});
    gsap.to(el,{duration: 0.6}).then(done);
  }
  //_______________ home________________//
  const homeBeforeEnter = (el)=> {
    root = document.documentElement;
    gsap.set(root,{'--transform': '150%', '--opacity': 0});
    gsap.set(el,{opacity: 0,position: "absolute"});
  }
  const homeEnter = (el, done)=> {
    gsap.set(root,{'--transform': 0, '--opacity': 1}) //.then(done);
    gsap.to(el,{duration: 0.6, opacity: 1, ease: "power1.out"}).delay(0.2)//.then(done);
    gsap.set(el,{delay: 1, position: 'relative'}).then(done);
  }
  const homeLeave = (el, done)=> {
    const item = el.childNodes[1].querySelector(`[data-name="${dataName.value}"]`);

    gsap.set(item.childNodes[0],{visibility: 'hidden'});
    //item.childNodes[0].style.setProperty('visibility', 'hidden');
    gsap.to(el,{duration: 0.4, opacity: 0}).then(done);

  }

  return {position, dataName, widthItem, check, checkTouch, articleFromEnter, articleEnter,
    homeLeave, homeEnter, homeBeforeEnter, articleLeave, articleBeforeLeave}
})
