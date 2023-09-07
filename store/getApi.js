import {defineStore} from 'pinia'
import {ref} from "vue";

export const useGetApiStore = defineStore('getApi', () => {
  const url = 'https://xopc333.github.io/Seven-wonders/seven-wonders.json';
  const data = ref({});

  const fetchData = async function () {
    if (data.value.length > 0) {
      return
    }
    if (localStorage.getItem("data") && data.value.length === undefined) {
      data.value = JSON.parse(localStorage.getItem("data"));
      return
    }

    const res = await fetch(url)
      .catch(() => {
        console.log('Error occurred!')
      })
    data.value = await res.json();
    await localStorage.setItem('data', JSON.stringify(data.value))
  }

  return {data, fetchData}
})
