import { scaleLinear, scaleTime, line, curveBasis } from "d3"
import { parse } from "react-native-redash"
import { current_label } from "./config"

export const getPath = (data, size, pattern) => {
    const x_co = scaleTime().domain([new Date(data[0].dt * 1000), new Date(data[data.length - 1].dt * 1000)]).range([0, size[0]])
    const y_co = scaleLinear().domain([getMin(data, pattern), getMax(data, pattern)]).range([size[1], 2])
    //Has to be curveBasis
    const a_line = line().x(e => x_co(new Date(e.dt * 1000))).y(e => y_co(e[pattern])).curve(curveBasis)(data)
    return parse(a_line)
}
const getMin = (thisArray, pattern) => {
    return thisArray.length && thisArray.reduce((p, c) => {
        return p < c[pattern] ? p : c[pattern]
    })
}
const getMax = (thisArray, pattern) => {
    return thisArray.length && thisArray.reduce((p, c) => {
        return p > c[pattern] ? p : c[pattern]
    })
}

export const codeWeather = (id, icon) => {
    if (id === 616) {
        return "weather-snowy-rainy"
    } else if (id < 300) {
        return 'weather-lightning-rainy'
    } else if (id < 400) {
        return 'weather-partly-rainy'
    } else if (id < 600) {
        switch (icon) {
            case "10d":
                return 'weather-pouring'
            case "13d":
                return 'weather-snowy'
            case "09d":
                return 'weather-partly-rainy'
            case "10n":
                return 'weather-pouring'

        }
    } else if (id < 700) {
        return 'weather-snowy'
    } else if (id < 800) {
        return 'waves'
    } else if (id >= 800) {
        switch (id) {
            case 800:
                if (icon == "01d") {
                    return 'weather-sunny'
                } else if (icon == "02d") {
                    return 'weather-cloudy'
                } else {
                    return 'weather-night'
                }
            case 801:
                return 'weather-cloudy'
            case 802:
                return 'weather-cloudy'
            case 803:
                return 'weather-cloudy'
            case 804:
                return 'weather-cloudy'
        }
    }
    return ''
}

export const current_data = (data, radius, center) => {
    const range_Group = [
        [0, 11],
        [0, 400],
        [0, 32],
        [0, 70],
        [0, 100],
        [0, 0.7]
    ]
    const the_path = data.map((e, i) => {
        const scaleValue = scaleLinear().domain(range_Group[i]).range([0, radius]).clamp(true)(e)
        const angle = getAngle(i)
        const y_fix = i < 3 ? -Math.abs(Math.sin(angle) * scaleValue) : Math.abs(Math.sin(angle) * scaleValue)

        return {
            name: current_label[i],
            x: center + Math.cos(angle) * scaleValue,
            y: center + y_fix,
            a_sin: Math.sin(angle),
            a_cos: Math.cos(angle),
            value: scaleValue,
            origin: e,
            y_fix
        }
    })
    return the_path.reduce((a, c) => {
        return a + ` ${c.x},${c.y}`
    }, '')
}

const getAngle = (index) => index * (Math.PI / 3) + (Math.PI / 6)
export const setBorder = (radius, center, level) => {
    const step = Array.from(Array(level), (_, index) => (index + 1) * radius / level)
    return step.map((e, i) => {
        const this_path = current_label.reduce((a, _, ci) => {
            const angle = getAngle(ci)
            const point_x = e * Math.cos(angle) + center
            const point_y = e * Math.sin(angle) + center
            return a + ` ${point_x},${point_y}`
        }, '')
        return this_path
    })
}

export const getWindDirection = (deg) => {
    const main = ["N", "E", "S", "W"]
    const between = ["N", "S", "S", "N"]
    const between_second = ["E", "E", "W", "W"]
    const notInportant = deg % 90
    const second = Math.floor(deg / 90)
    if (10 < notInportant < 80) {
        return between[second] + between_second[second]
    } else {
        return main[second]
    }
}