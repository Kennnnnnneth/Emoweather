import { rememberReducer } from "redux-remember"
import { weatherApi, geoApi } from "./Api"
import city from './City'

export default rememberReducer(
    {
        city,
        [weatherApi.reducerPath]: weatherApi.reducer,
        [geoApi.reducerPath]: geoApi.reducer,

    }
)