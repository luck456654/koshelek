import { createStore } from "vuex";

const store = createStore({
    state(){
        return{
            payload:'BTCUSDT',
            data:[]            
        }
    },
    mutations:{
        rest(state,payload){
            state.payload = payload
        },
        changedata(state,data){
            state.data = data
        }
    }
})
export default store;