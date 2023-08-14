import { defineStore } from 'pinia'
import {ref} from "vue";

export const useTransitionsStore = defineStore('transitions', ()=>{
  const position = ref({homeX: 0, homeY: 0, itemX: 0, itemY: 0})
  return {position}
})
