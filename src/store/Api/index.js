import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { myApiKey } from '../../common/config'

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/3.0/' }),
    endpoints: (builder) => ({
        getWeather: builder.query({
            query: (arg) => {
                const { lat, lon } = arg
                return `onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${myApiKey}&units=metric`
            },
        }),
    }),
})

export const { useGetWeatherQuery } = weatherApi

export const geoApi = createApi({
    reducerPath: 'geoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://api.openweathermap.org/geo/1.0/' }),
    endpoints: (builder) => ({
        getGeo: builder.query({
            query: (city) => {
                return `direct?q=${city}&limit=5&appid=${myApiKey}&units=metric`
            },
        }),
    }),
})

export const { useLazyGetGeoQuery } = geoApi