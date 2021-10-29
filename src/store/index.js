import { createStore, compose, applyMiddleware } from 'redux'
import mainReducer from '../reducers'
import { persistStore, persistReducer } from 'redux-persist'
import localStorage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt'
import thunk from 'redux-thunk'


export const initialState = {
  cityWeather: null
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const persistConfig = {
    key: 'root',
    storage: localStorage,
    transforms: [
      encryptTransform({
        secretKey: process.env.REACT_APP_SECRET_KEY,
        onError: (error) => {
          console.log(error)
        },
      }),
    ],
  }
  const persistedReducer = persistReducer(persistConfig, mainReducer)

const configureStore = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
)
const persistor = persistStore(configureStore)


export  {configureStore, persistor}