<template>
    <main>
      <h1>OrderBook</h1>  
      {{ $store.state.data }} 
      <button @click="loaddata">Загрузить данные из тестового API</button><br>
      {{ pos }}
      <p>Выберите количество выводимых позиций</p>
      <select class="sel" @change="onChange($event)">
        <option value="100" >100</option>
        <option value="500" >500</option>
        <option value="1000" >1000</option>    
      </select>
    
      <div class="wrapper">
      <div>  
      <table>
        <tbody>
            <th>Bids</th>
            <tr>
                <td>Price</td>
                <td class="hide">Quantity</td>
                <td>Total</td>
            </tr>
            <tr>
                <td>1</td>
                <td class="hide">100</td>
                <td>100</td> 
            </tr>
        </tbody>
      </table>
      </div>
    <div>
        
      <table>
        <th>Asks</th>
        <tbody>
            <tr>
                <td>Price</td>
                <td class="hide">Quantity</td>
                <td>Total</td>
            </tr>
            <tr>
                <td>1</td>
                <td class="hide">100</td>
                <td>100</td> 
            </tr>
        </tbody>
      </table> 
      </div> 
    </div> 
    </main>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

export default { 
setup() {
  const store = useStore()
  const pos = ref('100');
  
    const loaddata = () => {
     //return axios.get('https://api.binance.com/api/v3/depth?symbol='+store.state.payload+'&'+'limit='+pos.value)
     return axios.get('https://api.binance.com/api/v1/exchangeInfo')  
       .then(response => {
           store.commit('changedata',response.data)              
        })       
    }    
    const onChange = (event) => {
        pos.value = event.target.value
        }
  return {loaddata,onChange,pos}
}}
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
  .wrapper{
    display: flex;
    justify-content: space-between;
    padding: 5%;
    width: 70%;
    margin: auto;
  }
  table{
    border-collapse:collapse; 
    width: 30vw;
  }
  td{
    border: 1px brown solid; 
    padding: 5%;
  }
  select{
    width: 10%;
    margin-bottom: 5px;
    }
@media (max-width: 768px){
        .hide{
            display: none;
        }
    }  
</style>