import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useLazyGetGeoQuery } from "../../store/Api"
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { changeCity } from '../../store/City';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { CView, RowSpread, RowView } from '../../common/Box';
import { Svg, Path, SvgUri } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withTiming, interpolate, FadeInUp } from 'react-native-reanimated';
import { mixPath, parse } from 'react-native-redash';
const AnimatedPath = Animated.createAnimatedComponent(Path);
export default () => {
    const insets = useSafeAreaInsets();
    const [location, setLocatioin] = useState("")
    const [city, setCity] = useState([])
    const [trigger, { isLoading, isError, data, error }] = useLazyGetGeoQuery()
    const navigation = useNavigation();

    useEffect(() => {
        if (data) {
            setCity(data)
        }
    }, [data])
    useEffect(() => {
        if (location) {
            trigger(location)

        }
    }, [location])
    return <ScrollView style={{
        paddingTop: insets.top,
        backgroundColor: '#DEDEDE',
    }}
        stickyHeaderIndices={[0]}
    >
        <View style={{
            marginBottom: '8%'
        }}>
            <Text style={{
                fontSize: styles._va.unit * 5,
                fontWeight: '600'
            }}>
                {"Weather"}
            </Text>


            <SearchBar value={location} onChange={setLocatioin} size={styles._va.unit * 2} />
        </View>
        {
            location && city && city.map((e, i) => <Cell key={nanoid()} geoData={e} index={i} nav={navigation} />)
        }

    </ScrollView>
}
const Cell = ({ geoData, index, nav }) => {
    const { name, state, country, lat, lon } = geoData
    const size = 24
    const dispatch = useDispatch()

    return geoData && <CView style={{
        marginBottom: styles._va.unit * 1,
    }}>
        <Animated.View
            entering={FadeInUp.delay(index * 100)}
            style={{
                width: '80%',
                padding: 4,
                borderRadius: 4 + size,
                backgroundColor: '#fff',
                padding: 4,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
            <RowView style={{
                margin: 10,
            }}>
                <RowView style={{
                    paddingRight: 4,
                    width: size * 2.5
                }}>
                    <SvgUri uri={`https://hatscripts.github.io/circle-flags/flags/${country.toLowerCase()}.svg`} width={size} height={size} style={{
                        marginHorizontal: 4,
                    }} />
                    <Text style={{
                        fontSize: size - 6,
                        fontWeight: '600',
                        color: '#404040',
                    }}>{country}</Text>
                </RowView>
                {
                    state && <RowView>
                        <Ionicons name="location-sharp" size={size} color="black" style={{
                            marginHorizontal: 4,
                        }} />
                        <Text style={{
                            fontSize: size - 6,
                            fontWeight: '600',
                            color: '#404040',
                        }}>{state.length > 15 ? state.slice(0, 15) + "..." : state}</Text>
                    </RowView>
                }
            </RowView>
            <Pressable onPress={() => {
                nav.goBack()
                dispatch(changeCity(name, state, country, lat, lon))
            }}>
                <View>
                    <AntDesign name="right" size={size} color="#3184b0" />
                </View>
            </Pressable>
        </Animated.View>
    </CView>

}
const SearchBar = ({ value, onChange, size }) => {
    const action = useSharedValue(0)
    const left_circle = useAnimatedProps(() => {
        const strokeWidth = interpolate(action.value, [1, 0], [0, 3], 'identity')
        return {
            strokeWidth
        }
    })
    const svg_path = [
        [
            "M13.5,25.8c-6.8,0-12.3-5.5-12.3-12.3S6.7,1.2,13.5,1.2c0,0,0.1,0,0.1,0",
            parse("M13.6,1.2c6.7,0.1,12.2,5.6,12.2,12.3c0,6.8-5.5,12.3-12.3,12.3"),
            parse("M21.2,23.6c2.6,1.7,5.1,3.5,7.7,5.2")
        ],
        [
            "M13.5,25.8c-6.8,0-12.3-5.5-12.3-12.3S6.7,1.2,13.5,1.2c0,0,0.1,0,0.1,0",
            parse("M28,2c-4.5,4.5-8.1,8-13,13c-4.8,4.8-7.9,8-13,13"),
            parse("M2,2c2.5,2.5,23.8,23.8,26,26")
        ]
    ]
    const right_circle = useAnimatedProps(() => {
        const d = mixPath(action.value, svg_path[0][1], svg_path[1][1])
        return {
            d
        }
    })
    const bot_path = useAnimatedProps(() => {
        const d = mixPath(action.value, svg_path[0][2], svg_path[1][2])
        return {
            d
        }
    })
    return <CView >
        <RowSpread style={{
            width: '80%',
            backgroundColor: '#fff',
            borderRadius: size,
            padding: 4,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        }}>
            {/* <FontAwesome5 name="search-location" size={size} color="black" style={{
                marginLeft: 10
            }} /> */}
            <TextInput
                onChangeText={onChange}
                value={value}
                onFocus={() => {
                    action.value = withTiming(1)
                }}
                onBlur={() => {
                    if (!value) {
                        action.value = withTiming(0)
                    }
                }}
                style={{
                    height: 40,
                    width: '70%',
                    fontSize: size
                }} />
            <TouchableOpacity onPress={() => {
                if (action.value) {
                    onChange('')
                    action.value = withTiming(0)
                }
            }}>
                {/* <Entypo name="cross" size={size} color="black" style={{
                    marginRight: 10
                }} /> */}
                <Svg width={size} height={size} viewBox='-2 -2 32 32' style={{
                    left: -4,
                }}>
                    <AnimatedPath animatedProps={left_circle} d={"M13.5,25.8c-6.8,0-12.3-5.5-12.3-12.3S6.7,1.2,13.5,1.2c0,0,0.1,0,0.1,0"} fill={"none"} stroke="black" strokeLinecap='round' />
                    <AnimatedPath animatedProps={right_circle} fill={"none"} stroke="black" strokeWidth={3} strokeLinecap='round' />
                    <AnimatedPath animatedProps={bot_path} fill={"none"} stroke="black" strokeWidth={3} strokeLinecap='round' />
                </Svg>
            </TouchableOpacity>
        </RowSpread>
    </CView>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth'
    },
})