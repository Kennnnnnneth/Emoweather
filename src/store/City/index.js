import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    city:{
    id: 1,
    name: 'Toronto',
    state: 'Ontario',
    country: 'CA',
    lat: 43.6534817,
    lon: -79.3839347,
    }
}


const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        changeCity: {
            reducer: (state, action) => {
                state.city = action.payload
            },
            prepare: (name, state, country, lat, lon) => {
                return {
                    payload: {
                        id: 1,
                        name,
                        state,
                        country,
                        lat,
                        lon,
                    }
                }
            }
        }
    }
})
export const { changeCity } = citySlice.actions
export default citySlice.reducer