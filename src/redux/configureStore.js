import { createStore } from 'redux'
import authReducer from './authReducer';
import appReducer from './appReducer';
import { setAuthorizationHeader } from '../api/apiCalls';
import { storeUserCreds } from '../db/EncryptedStorage';
import { combineReducers } from 'redux'


const configureStore = () => {

    const store = createStore(combineReducers({
        auth: authReducer,
        app: appReducer
    }));
    store.subscribe(() => {//it subscribes to store & listen every changes on it
        if (typeof store.getState().auth.token !== 'undefined') {//for bug solve
            setAuthorizationHeader(store.getState().auth);
            console.log("STORE'A KAYDEDİYORUM:", store.getState())
            storeUserCreds(store.getState().auth)//save loggedin user creds
        }else{
            console.log("auth harici bir dispatch geldi")
        }
    })
    return store;
}

export default configureStore;