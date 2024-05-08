import { createStore } from "vuex";


const store = createStore({
    state(){
        return{
            payload:'btcusdt',
            evdata:[],
            pos:100,
            asks:[],
            bids:[]
        }
    },
    mutations:{
        rest(state,payload){
            state.payload = payload
        }, 
        changepos(state,pos){
          state.pos = pos          
        },      
        openws(state){
           // alert("Я открываю  ws для - "+state.payload )

            let socket = new WebSocket("wss://stream.binance.com:9443/ws/"+state.payload+"@depth");

            socket.onopen = function() {
            //  alert("[open] Соединение установлено");
            //  alert("Отправляем данные на сервер");
              let req=JSON.stringify({
                "method": "SUBSCRIBE",
                "params": [
                  state.payload+"@aggTrade",
                  state.payload+"@depth"
                ],
                "id": 1
              })
              
              socket.send(req);
            };
            
            socket.onmessage = function(event) {
               state.evdata = JSON.parse(event.data)             
             
             
            let res = Array.isArray(state.evdata.a)           
            if(res==true){
              state.evdata.a.forEach(el => {
                Object.assign({}, el);
                state.asks.push(el)  
              });
            }
            
            let resb = Array.isArray(state.evdata.b)           
            if(resb==true){
              state.evdata.b.forEach(el => {
                Object.assign({}, el);
                state.bids.push(el)  
              });
            }
             
            }
            
           socket.onclose = function(event) {
              if (event.wasClean) {
               // alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
              } else {
                
               // alert('[close] Соединение прервано');
              }
            };
            
            socket.onerror = function(error) {
              alert([error]);
            };

        },

    }
})
export default store;