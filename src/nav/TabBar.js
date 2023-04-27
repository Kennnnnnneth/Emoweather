import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, interpolate, FadeInDown, FadeInUp, withTiming } from 'react-native-reanimated';
import { useContext, useEffect } from 'react';
import BarContext from './BarContext';
export default ({ state, navigation }) => {
    const { isBar } = useContext(BarContext)
    const appear = useSharedValue(0)
    const insets = useSafeAreaInsets();
    const size = styles._va.unit * 3
    useEffect(() => {
        if (isBar) {
            appear.value = withTiming(1)
        } else {
            appear.value = withTiming(0)
        }
    }, [isBar])
    const animateStyle = useAnimatedStyle(() => {
        const translateY = interpolate(appear.value, [0, 1], [0, -insets.bottom * 2], 'extend')
        const scale = interpolate(appear.value, [0, 1], [0, 1], 'extend')
        const opacity = interpolate(appear.value, [0, 1], [0.5, 1], 'extend')
        return {
            opacity,
            transform: [
                { translateY },
                { scale },
            ]
        }
    })
    return <Animated.View style={[animateStyle, {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: -insets.bottom,
        left: styles._va.rw * 50 - size * 2 - styles._va.unit / 2
    }]}>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 8 * 2 + size,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        }}>
            {
                state.routes.map((route, index) => {
                    const control = useSharedValue(0)
                    const animatedStyle = useAnimatedStyle(() => {
                        const scale = interpolate(control.value, [0, 1], [1, 1.5], 'extend')
                        const translateY = interpolate(control.value, [0, 1], [0, -0.5 * size, -1], 'extend')
                        return {
                            transform: [
                                { scale },
                                { translateY }
                            ]
                        }
                    })
                    useEffect(() => {
                        if (state.index === index) {
                            control.value = withSpring(1, { duration: 80 })
                        } else {
                            control.value = withSpring(0, { duration: 80 })
                        }
                    }, [state.index])
                    return <Pressable key={index + 'l'} onPress={() => {
                        navigation.navigate(route.name)
                    }}>
                        <Animated.View style={[animatedStyle, {
                            paddingVertical: 8,
                            paddingHorizontal: styles._va.unit * 2,
                        }]}>
                            {index === 0 ? <MaterialCommunityIcons name="weather-sunny" size={size} color="black" /> : <FontAwesome name="location-arrow" size={size} color="black" />}
                        </Animated.View>
                    </Pressable>
                })
            }
        </View>
    </Animated.View>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth'
    },

})