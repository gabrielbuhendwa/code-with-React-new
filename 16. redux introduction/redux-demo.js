//this is how w import redux or any othe things from node module
const redux = require('redux');


//declaring the reducer function and what it should return as a new state 
const counterReducer = (state = { counter: 0 }, action) => {
    return {
        counter: state.counter + 1
    };

};

//creating the central data (state) store 
const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
   const latestState =  store.getState();
   console.log(latestState);
};

store.subscribe(counterSubscriber);

//store that dispatch an action, action which is a js object 
store.dispatch({ type: 'increment'});