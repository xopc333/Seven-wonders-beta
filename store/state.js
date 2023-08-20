import { defineStore } from 'pinia'
import {ref, reactive} from "vue";
import {gsap} from "gsap";

export const useTransitionsStore = defineStore('transitions', ()=>{
  const position = reactive({homeX: 0, homeY: 0, itemW: 0});
  const dataName = ref();

  let Width, elemArticle,root,x,y;
  let  w = 800;
  const articleFromEnter = (el)=> {
    elemArticle = el.childNodes[1].childNodes[0];
    const {width,height} = window.visualViewport;
    Width = width;

    const boxW = (width - position.itemW) / 2;
    const boxH = (height - (height * 0.3)) / 2;
    x = +(position.homeX - boxW).toFixed(2);
    y = +(position.homeY - boxH).toFixed(2);

    //const tl = gsap.timeline();

    gsap.set(elemArticle,{width: `${position.itemW}px`, height: '30vh',x: x, y: y,z: 0});
  }
  const articleEnter = (el, done)=> {

    if(Width <= 832 ) w = Width - 32;

    //const tl = gsap.timeline();

    // tl.set(root,{'--blur': '6px','--bgc': 'rgba(0, 0, 0, 0.3)'},'st')
    //   .to(elemArticle,{duration: 0.4,x: 0, y: 0,z: 0, width: w, height: '50vh'},'st')
    //   .then(done);

    gsap.to(elemArticle,{duration: 0.4,x: 0, y: 0,z: 0, width: w, height: '50vh'})
      .then(done);

    //console.log(root);
  }
  const articleBeforeLeave = (el)=> {
    // gsap.set(el.childNodes[1],{className:'header'});
    // gsap.set(elemArticle.childNodes[0],{className:'header-img'});
    el.childNodes[1].classList.remove('active-header');
    elemArticle.childNodes[0].classList.remove('active-header-wrap');
  }
  const articleLeave = (el, done)=> {
    el.childNodes[1].classList.remove('active-header');
    elemArticle.childNodes[0].classList.remove('active-header-wrap');
    gsap.to(elemArticle,{duration: 0.4,x: x, y: y,z: 0,
      width: `${position.itemW}px`, height: '30vh'})
      .then(done);
  }
  //_______________ home________________//
  const homeBeforeEnter = (el)=> {
    root = document.documentElement;
    gsap.set(root,{'--transform': '150%', '--opacity': 0});
    gsap.set(el,{opacity: 0})
  }
  const homeEnter = (el, done)=> {
    gsap.set(root,{'--transform': 0, '--opacity': 1}) //.then(done);
    gsap.to(el,{duration: 0.4, opacity: 1}).delay(0.2).then(done);
  }
  // const homeBeforeLeave = (el)=> {
  //   //gsap.set(el,{opacity: 1})
  // }
  const homeLeave = (el, done)=> {
    const item = el.childNodes[1].querySelector(`[data-name="${dataName.value}"]`);

    gsap.set(item.childNodes[0],{visibility: 'hidden'});
    //item.childNodes[0].style.setProperty('visibility', 'hidden');
    gsap.to(el,{duration: 0.4, opacity: 0}).then(done);

  }

  return {position, dataName, articleFromEnter, articleEnter,
    homeLeave, homeEnter, homeBeforeEnter, articleLeave, articleBeforeLeave}
})
