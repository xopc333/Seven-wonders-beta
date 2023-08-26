import { defineStore } from 'pinia'
import {ref, reactive} from "vue";
import {gsap} from "gsap";

export const useTransitionsStore = defineStore('transitions', ()=>{
  const position = ref();//reactive({homeX: 0, homeY: 0, itemW: 0, itemSize: 0});
  const dataName = ref();
  const widthItem = ref();

  let right, bottom,root,Top,Left,Height;
  function sizeBox() {
    let {top,height,left,width} = position.value;
    Top = top;
    Left = left;
    Height = height * 0.1;
    right = (window.visualViewport.width - (left + width)).toFixed(2)
    bottom = (window.visualViewport.height - (top + height)).toFixed(2)
  }
  //let  w = 800;
  const articleFromEnter = (el)=> {
    root = document.documentElement;
    sizeBox();
    //const tl = gsap.timeline();

    //gsap.set(elemArticle,{width: `${position.itemW}px`, height: '30vh',x: x, y: y,z: 0});

    gsap.set(el.childNodes[2],{classList:'article'});
    gsap.set(root,{'--top': `${Top}px`, '--right': `${right}px`,'--bottom': `${bottom}px`,'--left': `${Left}px`});
    gsap.set(el,{position: "absolute",})


  }
  const articleEnter = (el, done)=> {
    //root = document.documentElement;
    gsap.set(root,{'--top': '25vh', '--right': `${widthItem.value}px`,'--bottom': '25vh','--left': `${widthItem.value}px`})
    gsap.set(el,{delay: 1, position: 'relative'}).then(done);
    // gsap.set(el.childNodes[2],{className:'article'}).then(done);
    //
    // console.log(el.childNodes[2])
    //if(Width <= 832 ) w = Width - 32;

    //const tl = gsap.timeline();

    // tl.set(root,{'--blur': '6px','--bgc': 'rgba(0, 0, 0, 0.3)'},'st')
    //   .to(elemArticle,{duration: 0.4,x: 0, y: 0,z: 0, width: w, height: '50vh'},'st')
    //   .then(done);

    // gsap.to(elemArticle,{duration: 0.4,x: 0, y: 0,z: 0, width: w, height: '50vh'})
    //   .then(done);

    //console.log(el);
  }
  const articleBeforeLeave = (el)=> {
    //gsap.set(el.childNodes[2],{classList:'article'});
    // gsap.set(elemArticle.childNodes[0],{className:'header-img'});
    // el.childNodes[1].classList.remove('active-header');
    // elemArticle.childNodes[0].classList.remove('active-header-wrap');
  }
  const articleLeave = (el, done)=> {
    root = document.documentElement;
    //sizeBox();
    gsap.set(el.childNodes[2],{classList:'article'});
    gsap.set(root,{'--top': `${Top + Height}px`, '--right': `${right}px`,'--bottom': `${bottom - Height}px`,'--left': `${Left + 5}px`}); //.then(done);
    gsap.set(el.childNodes[1].childNodes[1],{className:'header-h1'});

    gsap.to(el,{duration: 0.6}).then(done);



    // el.childNodes[1].classList.remove('active-header');
    // elemArticle.childNodes[0].classList.remove('active-header-wrap');
    // gsap.to(elemArticle,{duration: 0.4,x: x, y: y,z: 0,
    //   width: `${position.itemW}px`, height: '30vh'})
    //   .then(done);
  }
  //_______________ home________________//
  const homeBeforeEnter = (el)=> {
    root = document.documentElement;
    gsap.set(root,{'--transform': '150%', '--opacity': 0});
    gsap.set(el,{opacity: 0,position: "absolute"});
  }
  const homeEnter = (el, done)=> {
    gsap.set(root,{'--transform': 0, '--opacity': 1}) //.then(done);
    gsap.to(el,{duration: 0.6, opacity: 1, ease: "power1.out"}).delay(0.4)//.then(done);
    gsap.set(el,{delay: 1, position: 'relative'}).then(done);
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

  return {position, dataName, widthItem, articleFromEnter, articleEnter,
    homeLeave, homeEnter, homeBeforeEnter, articleLeave, articleBeforeLeave}
})
