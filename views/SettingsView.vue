<template>
    <main>
     <h1>Настройки</h1>
      <select class="sel" @change="onChange($event)">
        <option value="btcusdt" >BTCUSDT</option>
        <option value="bnbbtc" >BNBBTC</option>
        <option value="ethbtc" >ETHBTC</option>    
      </select>
      <h2>Блог</h2>
        <ol>
          <li v-for="item in arr" :key="item.index">
           В {{ item.time }} настройка валюты была изменена с {{ item.lastsost }} на {{ item.sost }}
         </li> 
        </ol>
        Cейчас активно значение - {{ $store.state.payload }}
    </main>
</template>
<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const sost = ref('')
const lastsost = ref('')
const arr = ref([])
const time = ref('')
  



function onChange(event) {
      const moonLanding = new Date();  
      time.value=moonLanding.toTimeString();

      sost.value=event.target.value
      lastsost.value=arr.value[arr.value.length - 1]
          
      arr.value.push({"lastsost":lastsost.value?.sost,"sost":sost.value,"time":time.value})
      localStorage.setItem("object", JSON.stringify(arr.value));
      arr.value = JSON.parse(localStorage.getItem("object"));
          
      
      store.commit('rest',event.target.value)
      store.commit('openws')
    }    


if(JSON.parse(localStorage.getItem("object"))!=null){
   arr.value = JSON.parse(localStorage.getItem("object"));
 }

 

</script>
<style scoped>

main{
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  }
  h1,h2{
    margin: auto;
    color: brown;
    margin-bottom: 20px;
  }
  select{
    margin: auto;
    margin-bottom: 50px;
    }
</style>