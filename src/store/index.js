import { configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rememberEnhancer } from 'redux-remember';
import { weatherApi, geoApi } from './Api';
import reducer from './rootReducer';
export default configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherApi.middleware).concat(geoApi.middleware),
    enhancers: [
        rememberEnhancer(
            AsyncStorage,
            []
        )
    ]
})