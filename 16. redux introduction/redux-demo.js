const redux = require('redux'); // Import redux library from node_modules

const counterReducer = (state = { counter: 0 }, action) => { // Reducer: handles actions and returns updated state
    if (action.type === 'increment') { // Check if action is 'increment'
        return {
            counter: state.counter + 1, // Increment counter in state
        };
    }
    if (action.type === 'decrement') { // Check if action is 'decrement'
        return {
            counter: state.counter - 1, // Decrement counter in state
        };
    }
    return state; // Return unchanged state for unknown action types
};

const store = redux.createStore(counterReducer); // Create store using the reducer

const counterSubscriber = () => { // Listener function for state changes
    const latestState = store.getState(); // Get current/latest state from store
    console.log(latestState); // Log the current state
};

store.subscribe(counterSubscriber); // Register subscriber to be called on state changes

store.dispatch({ type: 'increment' }); // Dispatch 'increment' action to update state
store.dispatch({ type: 'decrement' }); // Dispatch 'decrement' action to update state