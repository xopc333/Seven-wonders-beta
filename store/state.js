import { defineStore } from 'pinia'
import {ref, reactive} from "vue";
import {gsap} from "gsap";

export const useTransitionsStore = defineStore('transitions', ()=>{
  const position = reactive({homeX: 0, homeY: 0, itemW: 0});

  let Width, elemArticle,root;
  const articleFromEnter = (el)=> {
    elemArticle = el.childNodes[1].childNodes[0];
    const {width,height} = window.visualViewport;
    Width = width;

    const boxW = (width - position.itemW) / 2;
    const boxH = (height - (height * 0.3)) / 2;
    let x = +(position.homeX - boxW).toFixed(2);
    let y = +(position.homeY - boxH).toFixed(2);

    //console.log(width, height);
    // console.log(x,y);
    //console.log(elemArticle);

    //const tl = gsap.timeline();

    gsap.set(elemArticle,{width: `${position.itemW}px`, height: '30vh',x: x, y: y,z: 0});
    // tl.set(elemArticle,{width: `${position.itemW}px`, height: '30vh',x: x, y: y,z: 0},'st')
    //   .set(root,{'--blur': '6px'},'st');
  }
  const articleEnter = (el, done)=> {
    root = document.documentElement;
    let  w = 800;
    if(Width <= 832 ) w = Width - 32;

    //const tl = gsap.timeline();

    // tl.set(root,{'--blur': '6px','--bgc': 'rgba(0, 0, 0, 0.3)'},'st')
    //   .to(elemArticle,{duration: 0.4,x: 0, y: 0,z: 0, width: w, height: '50vh'},'st')
    //   .then(done);

    gsap.to(elemArticle,{duration: 0.4,x: 0, y: 0,z: 0, width: w, height: '50vh'})
      .then(done);

    //console.log(root);
  }
  const homeBeforeEnter = (el)=> {
    gsap.set(root,{'--transform': '150%', '--opacity': 0});
  }
  const homeEnter = (el, done)=> {
    // gsap.set(root,{'--blur': 0,'--bgc': 'rgba(0, 0, 0, 0.0)',
    //   '--transform': 0, '--opacity': 1}).then(done);
    gsap.set(root,{'--transform': 0, '--opacity': 1}).then(done);
  }
  const homeBeforeLeave = (el)=> {
    gsap.set(el,{opacity: 1})
  }
  const homeLeave = (el, done)=> {
    gsap.to(el,{duration: 0.1, opacity: 0})
      .then(done);
    //console.log(root);
  }

  return {position, articleFromEnter, articleEnter, homeBeforeLeave,
    homeLeave, homeEnter, homeBeforeEnter}
})
