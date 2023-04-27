import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Canvas, Path, LinearGradient, vec, useValue, runTiming, useComputedValue } from '@shopify/react-native-skia';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useCallback, useContext } from 'react';
import { scaleLinear } from 'd3';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';
import { codeWeather } from '../../../common/Math';
import BarContext from '../../../nav/BarContext';

export default ({ current, place, daily }) => {
    const { isBar, setIsBar } = useContext(BarContext)
    const insets = useSafeAreaInsets();
    const different_temp = useValue(daily.temp.min)
    const time = useSharedValue(0)
    const iconName = codeWeather(current.weather[0].id, current.weather[0].icon)
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            different_temp.current = daily.temp.min
            time.value = 0
            runTiming(different_temp, { to: current.temp })
            time.value = withTiming(1)
        }
        if (!isBar) {
            setIsBar(true)
        }
    }, [current])

    const complete = useComputedValue(() => {
        const x = scaleLinear().domain([daily.temp.min, daily.temp.max]).range([0, 1]).clamp(true)(different_temp.current)
        return x
    }, [different_temp, daily])
    const iconStyle = useAnimatedStyle(() => {
        return {
            opacity: time.value
        }
    }, [time])
    return <View style={{
        marginTop: insets.top,
        alignItems: 'center',
        paddingBottom: 50
    }} >

        <Animated.View style={[iconStyle, { alignItems: 'center', }]} >
            <Text style={{
                textTransform: 'capitalize',
                color: "#fff",
                fontSize: 35
            }}
            >{place}</Text>
            <Text style={{
                fontSize: 150,
                fontWeight: '300',
                color: '#fff',

            }}>
                {Math.round(current.temp)}
            </Text>
            <MaterialCommunityIcons size={50} color={'#fff'} name={iconName} />
            <Text style={{
                fontSize: 20,
                color: '#fff',
                textTransform: 'capitalize'
            }}>{current.weather[0].main}</Text>
            <Text style={{
                fontSize: 20,
                color: '#fff'
            }}>{Math.round(daily.temp.min) + "/" + Math.round(daily.temp.max)}</Text>
        </Animated.View>
        <Canvas style={{
            width: 260,
            height: 220,
            zIndex: -1,
            position: 'absolute',
            top: 100
        }} >
            <Path
                style={"stroke"}
                path={"M39.1,215.4C18,193,5,162.8,5,129.6c0-69,56-125,125-125s125,56,125,125c0,33.3-13,63.5-34.2,85.9"}
                strokeWidth={5.9}
                color={"rgba(34, 139, 170, 0.2)"}
            />
            <Path
                style={"stroke"}
                path={"M39.1,215.4C18,193,5,162.8,5,129.6c0-69,56-125,125-125s125,56,125,125c0,33.3-13,63.5-34.2,85.9"}
                strokeWidth={6}
                start={0}
                end={complete}
            >
                <LinearGradient
                    colors={["rgb(20, 136, 246)", "rgb(245, 88, 94)"]}
                    start={vec(0, 0)}
                    end={vec(260, 0)}
                    positions={[0, 1]}
                />
            </Path>
        </Canvas>



    </View>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth',
        rh: '$rheight',
    }
})