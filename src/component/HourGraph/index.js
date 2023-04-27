import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Pressable } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Path, Svg } from 'react-native-svg';
import { codeWeather, getPath, getWindDirection } from '../../common/Math';
import { useEffect, useState } from 'react';
import Animated, { useAnimatedProps, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { mixPath, getYForX } from 'react-native-redash';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Hour, Week } from '../../common/config';
import { RowSpread, RowView } from '../../common/Box';
import { CView } from '../../common/Box';

const iconName = [
    'thermometer',
    'weather-windy',
    'eye-outline',
    'water-outline'
]
const title = [
    'Temp',
    'Wind',
    'Visibility',
    'Humidity',
]
const AnimatedPath = Animated.createAnimatedComponent(Path)

export default ({ data, w, h, place }) => {
    const figsize = [styles._va.rw * w, styles._va.rw * h]
    const [value, setValue] = useState(0)
    const [content, setContent] = useState(0)
    const btn_control = useSharedValue(0)
    const icon_size = styles._va.unit * 2.5
    const btn_height = icon_size * 2
    const btn_size = styles._va.rw * 15
    const btn_space = ((styles._va.rw * 85 - 8) - (4 * btn_size)) / 3
    const hr_path = [
        getPath(data, figsize, Hour[0]),
        getPath(data, figsize, Hour[1]),
        getPath(data, figsize, Hour[2]),
        getPath(data, figsize, Hour[3])
    ]
    const gesture_x = useSharedValue(0)
    const previous = useSharedValue(0)
    const now = useSharedValue(0)
    const path_interpolate = useSharedValue(0)
    const cursor_show = useSharedValue(0)
    const cursor_size = 10
    const path_props = useAnimatedProps(() => {
        const d = mixPath(path_interpolate.value, hr_path[previous.value], hr_path[now.value])
        return {
            d
        }
    })
    const cursor_set = useAnimatedStyle(() => {
        //center to topLeft
        const translateX = gesture_x.value - cursor_size / 2
        const translateY = getYForX(hr_path[now.value], gesture_x.value) - cursor_size / 2
        const scale = cursor_show.value ? 1 : 0
        return {
            transform: [
                { translateX },
                { translateY },
                { scale }
            ]
        }
    })
    const onPan = Gesture.Pan().runOnJS(true).onStart((e) => { cursor_show.value = 1 }).onUpdate((e) => {
        if (e.x >= 0 && e.x <= figsize[0]) {
            gesture_x.value = e.x
            setValue(Math.round(e.x * 20 / figsize[0]))
        }
    }).onEnd(() => {
        cursor_show.value = 0
        setValue(0)
    })

    const btn_style = useAnimatedStyle(() => {
        const translateX = btn_control.value * (btn_size + btn_space)
        return {
            transform: [
                { translateX },
            ]
        }
    }, [now])

    return <View style={{
        alignItems: 'center',
        marginTop: styles._va.rw * 10
    }}>


        <View style={{
            borderColor: '#fff',
            width: '85%'
        }} >

            <Description input={data[value]} name={content} local={place} />
            <View style={{
                marginTop: styles._va.unit * 1
            }} >
                <GestureDetector gesture={onPan}>
                    <Svg width={figsize[0]} height={figsize[1] + 10}>
                        <AnimatedPath animatedProps={path_props} stroke={'black'} />
                    </Svg>
                </GestureDetector>
                <Animated.View style={[
                    {
                        position: 'absolute',
                        width: cursor_size,
                        height: cursor_size,
                        borderRadius: cursor_size / 2,
                        backgroundColor: "#72ACF2"
                    },
                    cursor_set
                ]} />
            </View>


            <CView>
                <RowSpread style={{
                    backgroundColor: '#fff',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    borderRadius: 8 + btn_height,
                    padding: 4,
                    width: styles._va.rw * 85
                }}>
                    <Animated.View style={[{
                        position: 'absolute',
                        top: 4,
                        left: 4,
                        width: btn_size,
                        height: btn_height,
                        borderRadius: btn_height,
                        backgroundColor: '#9977F4'
                    }, btn_style]} />
                    {iconName.map((e, i) => {

                        return <Pressable key={i + 'l'} onPress={() => {
                            if (now !== i) {
                                previous.value = now.value
                                now.value = i
                                path_interpolate.value = 0
                                path_interpolate.value = withTiming(1)
                                setContent(i)
                                btn_control.value = withTiming(i, { duration: 150 })
                            }
                        }}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingVertical: icon_size * 0.5,
                                width: btn_size
                            }}>
                                <MaterialCommunityIcons name={e} size={icon_size} color={"black"} />
                            </View>
                        </Pressable>
                    })}

                </RowSpread>
            </CView>

        </View>
    </View>
}

const Description = ({ input, name, local }) => {
    const date = new Date(input.dt * 1000)
    const week_index = date.getDay()
    const hour = date.getHours()
    const wind_direction = getWindDirection(input.wind_deg)
    const weather_icon = codeWeather(input.weather[0].id, input.weather[0].icon)
    const text = name === 0 ? input.temp + 'C°' : name === 1 ? input.wind_speed + 'm/s ' : name === 2 ? input.visibility + 'm' : input.humidity + '%'
    const sup_text = name === 0 ? 'Feels Like ' + input.feels_like + 'C°' : name === 1 ? wind_direction : ""
    return <CView>
        <RowSpread style={{
            width: styles._va.rw * 85,
            // height: styles._va * rw * 25,
            padding: styles._va.rw * 5,
            backgroundColor: '#5673FF',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderRadius: 8,
        }}>

            <View style={{

            }}>
                <MaterialCommunityIcons name={weather_icon} size={styles._va.unit * 5} color={"#fff"} />
                <View style={{
                    marginTop: styles._va.unit * 0.8,
                    marginBottom: styles._va.unit * 0.4,
                }}>
                    <Text style={{
                        textTransform: 'capitalize',
                        fontSize: styles._va.unit * 2.6,
                        fontWeight: '300',
                        color: '#fff'
                    }}>{input.weather[0].description}</Text>
                </View>
                <View>
                    <Text style={{
                        fontSize: styles._va.unit * 2,
                        fontWeight: '600',
                        color: '#fff'
                    }}>
                        <Text>{local}</Text>
                        <Text>{Week[week_index]}</Text>
                        <Text>{" "}</Text>
                        <Text>{hour > 12 ? hour % 12 + "pm" : hour % 12 + "am"}</Text>
                    </Text>
                </View>
            </View>

            <View >
                <View style={{

                }}>
                    <Text style={{
                        textAlign: 'right',
                        fontSize: styles._va.unit * 5,
                        color: '#fff',
                        fontWeight: '700'
                    }}>{text}</Text>
                </View>
                <View style={{
                }}>
                    <Text style={{
                        textAlign: 'right',
                        fontSize: styles._va.unit * 2,
                        color: '#fff',
                        fontWeight: '400'
                    }}>
                        {sup_text}
                    </Text>
                </View>
            </View>

        </RowSpread>
    </CView>

}

const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth'
    }
})