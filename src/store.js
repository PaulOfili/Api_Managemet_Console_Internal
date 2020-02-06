import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import {throttle} from "lodash";
import { loadState, saveState } from './localStorage';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { getSession } from './session/cookies';

let secondsRemaining = 0;

if (getSession().expiryDate) {
	let expiry = new Date(getSession().expiryDate);
	let currentDate = new Date();
	let timeRemaining = expiry - currentDate;
    secondsRemaining =  Math.floor(timeRemaining / 1e3);
}

const composeEnhancers = composeWithDevTools({  
    trace: true, 
    traceLimit: 25 
}); 
const persistedState = loadState();
const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(
        applyMiddleware(
            loadingBarMiddleware(),
            thunk
            )
    )
);

store.subscribe(
    throttle(() => {
        saveState({
            account: {
                isLoggedIn: store.getState().account.isLoggedIn,
                userData: {
                    email: store.getState().account.userData.email,
                    user_name: store.getState().account.userData.user_name,
                    sessionInterval: secondsRemaining,
                },
                // role: store.getState().account.role
                
            }
        });
    }, 1000)
);
export default store;