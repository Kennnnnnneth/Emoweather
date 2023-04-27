import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CView, RowSpread, look } from '../../../common/Box';
import { codeWeather } from '../../../common/Math';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { useContext } from 'react';
import BarContext from "../../../nav/BarContext"
export default ({ hourly, theRef }) => {
    const { isBar, setIsBar } = useContext(BarContext)
    return <CView style={{
        marginBottom: 10
    }}>
        <View style={{
            width: styles._va.rw * 85
        }}>
            <Animated.View style={[{}, {
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(255, 255, 255, 0.34)',
                marginVertical: styles._va.unit * 1,
                paddingBottom: styles._va.unit * 1,
            }]}
                entering={FadeInRight}
            >

                <Text style={styles.text}>
                    {"Today"}
                </Text>
                <Text style={[styles.text, { color: '#3184b0' }]} onPress={() => {
                    if(isBar){setIsBar(false)}
                    theRef.current.expand()
                    }}>
                    {"See more"}
                </Text>
            </Animated.View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={hourly}
                renderItem={({ item, index }) => <Cell item={item} index={index} />}
                style={styles.list}
            />
        </View>
    </CView>
}
const Cell = ({ item, index }) => {
    const time = new Date(item.dt * 1000).getHours()
    const iconName = codeWeather(item.weather[0].id, item.weather[0].icon)
    return <Animated.View style={[{}, {
        alignItems: 'center',
        marginLeft: styles._va.unit * 1,
    }]}
        entering={FadeInLeft}
    >

        <Text style={[styles.list_text, { color: '#fff' }]}>{index === 0 ? "Now" : time > 12 ? time % 12 + " pm" : time % 12 + " am"}</Text>
        <CView style={{
            backgroundColor: '#fff',
            width: styles._va.unit * 4,
            borderRadius: styles._va.unit * 5,
            paddingVertical: styles._va.unit,
            marginTop: styles._va.unit * 0.5,
        }}>
            <MaterialCommunityIcons name={iconName} size={20} color={"#69a8dc"} style={{
                marginBottom: styles._va.unit,
            }} />
            <Text style={[styles.list_text, {
                color: '#69a8dc'
            }]}>{Math.round(item.temp)}</Text>
        </CView>

    </Animated.View>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth'
    },
    text: {
        fontSize: '2rem',
        color: '#e7e7e7',
        textShadowColor: 'black',
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        fontWeight: '600',
    },
    list: {

    },
    list_text: {
        fontSize: '1.8rem',
        color: '#e7e7e7',
        textShadowColor: 'black',
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        fontWeight: '700',
    }
})