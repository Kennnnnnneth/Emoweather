import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Week } from '../../../common/config';
import { codeWeather } from '../../../common/Math';
import { Canvas, LinearGradient, Path, runTiming, useComputedValue, useValue, vec } from '@shopify/react-native-skia';
import { CView, RowSpread, } from '../../../common/Box';
import { useEffect } from 'react';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import { parse, mixPath } from "react-native-redash"


export default ({ daily }) => {
    const end_path = parse("M0.6,3.8c10.1-3.3,20.3-2.3,24.6-0.5C38,8.6,42.1,21.7,55,26.9c7.5,3,19.8,0.7,24.3-0.5")
    const start_path = parse("M0.4,15.1c10.5,0,19.9-0.1,24.8-0.1c14.6-0.2,17.2-0.1,31.2-0.1c8,0,18.4,0.1,23.2,0.1")
    return <CView style={{
        marginBottom: 10
    }}>
        <View style={{
            width: styles._va.rw * 85
        }}>
            <RowSpread style={{
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(255, 255, 255, 0.34)',
                marginVertical: styles._va.unit * 1.5,
                paddingBottom: styles._va.unit * 1,
            }}>
                <Text style={styles.text}>
                    {"Next 7 days"}
                </Text>
                <Text style={[styles.text, { color: '#3184b0' }]}>
                    {"See more"}
                </Text>
            </RowSpread>

            {
                daily.map((el, i) => <Cell key={"b" + i} data={el} now={i === 0 ? true : false} start={start_path} end={end_path} />)
            }
        </View>
    </CView>
}


const Cell = ({ data, now, start, end }) => {
    const path_control = useValue(0)
    const text_control = useSharedValue(0)
    const animated_path = useComputedValue(() => mixPath(path_control.current, start, end), [path_control])
    const animated_text = useAnimatedStyle(() => {
        return {
            opacity: text_control.value
        }
    }, [])
    const week = now ? 'Now' : Week[new Date(data.dt * 1000).getDay()]
    const iconName = codeWeather(data.weather[0].id, data.weather[0].icon)
    useEffect(() => {
        runTiming(path_control, 1, { duration: 450 })
        text_control.value = 0,
            text_control.value = withSequence(withTiming(0, { duration: 450 }), withTiming(1))
    }, [data])
    return <CView>
        <RowSpread style={{
            width: styles._va.rw * 85
        }}>
            <Animated.View style={{ width: 40 }} entering={FadeIn.duration(1000)} >
                <Text style={styles.text}>{week}</Text>
            </Animated.View>

            <MaterialCommunityIcons name={iconName} size={20} color={"#fff"} />

            <View>
                <Canvas style={{
                    width: 80,
                    height: 30,
                    position: 'absolute'
                }}>
                    <Path
                        style={"stroke"}
                        path={animated_path}
                        strokeWidth={3}
                    >
                        <LinearGradient
                            colors={["rgb(20, 136, 246)", "rgb(245, 88, 94)"]}
                            start={vec(0, 0)}
                            end={vec(80, 0)}
                            positions={[0, 1]}
                        />
                    </Path>
                </Canvas>
                <Animated.View style={[{
                    height: 30,
                    width: 80,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }, animated_text]}>
                    <Text style={styles.text}>{" " + Math.round(data.temp.min)}</Text>
                    <Text style={styles.text}>{Math.round(data.temp.max) + " "}</Text>
                </Animated.View>

            </View>
        </RowSpread>
    </CView>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth'
    },
    text: {
        fontSize: 20,
        color: '#e7e7e7',
        textShadowColor: 'black',
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        fontWeight: '700',
    }
})