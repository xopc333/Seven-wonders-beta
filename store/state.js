import { defineStore } from 'pinia'
import {ref, reactive} from "vue";
import {gsap} from "gsap";

export const useTransitionsStore = defineStore('transitions', ()=>{
  const position = reactive({homeX: 0, homeY: 0, itemW: 0, viewportW: 0, viewportH: 0});


  const articleFromEnter = (el)=> {
    // let x = `${position.homeX}px` // - position.itemX;
    // let y = `${position.homeY}px` // - position.itemY
    const elem = el.childNodes[1].childNodes[0];
    const {width,height} = window.visualViewport;
    //const boxW = (width - ((height * 0.5)*1.777777777777778)) / 2 - 5;
    const boxW = (width - position.itemW) / 2;
    const boxH = (height - (height * 0.3)) / 2;
    let x = position.homeX - boxW; // - position.itemX;
    let y = position.homeY - boxH; // - position.itemY
    //const tl = gsap.timeline();

    // console.log(x,y);
    // console.log(boxW,boxH);
    // console.log(position.homeX,position.homeY);
    //console.log(position.itemW);

    //el.style.cssText = `--top: ${y}; --left: ${x};`
    //gsap.set(el.childNodes[1].childNodes[0],{top: y, left: x}); //.includes('aaa')
    // el.style.setProperty(`--top`, `calc(${y}`);
    // el.style.setProperty(`--left`, `calc(${x})`);

    // gsap.set(el,{'--top': `calc(${y})`, '--left': `calc(${x})`,
    // '--width': `${position.itemW}px`, '--height': '30vh'});
    // gsap.set(el.childNodes[1].childNodes[0],{x: x, y: y, '--width': `${position.itemW}px`, '--height': '30vh'});

    gsap.set(elem,{width: `${position.itemW}px`, height: '30vh',x: x, y: y,z: 0});

    //el.childNodes[1].childNodes[0].classList.add('ac-header')
  }
  const articleEnter = (el, done)=> {
    const elem = el.childNodes[1].childNodes[0];
    //const tl = gsap.timeline();

    //gsap.set(el,{'--top': 'calc(50% - 30vh)', '--left': 'calc(50% - 540px)',
      //'--width': '1200px', '--height': '60vh'}).then(done);

    gsap.to(elem,{duration: 0.6,x: 0, y: 0,z: 0,width: 800, height: '50vh'})
      //.to(elem,{duration: 0.8,width: 800, height: '50vh'},'st')
      .then(done);

    //console.log(el);
  }
  const homeBeforeLeave = (el)=> {
    gsap.set(el,{opacity: 1})
  }
  const homeLeave = (el, done)=> {
    gsap.to(el, {duration: 1.6, opacity: 1}).then(done);
    //console.log(el);
  }

  return {position, articleFromEnter, articleEnter, homeBeforeLeave, homeLeave}
})
