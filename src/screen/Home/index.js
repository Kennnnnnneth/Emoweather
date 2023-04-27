import EStyleSheet from 'react-native-extended-stylesheet';
import { View, ActivityIndicator } from 'react-native';
import { useContext, useRef } from 'react';
import Animated from 'react-native-reanimated';
import { useGetWeatherQuery } from "../../store/Api"
import Weather from "../../component/Weather"
import Sign from "./Sign"
import Today from './Today';
import Week from './Week';
import Detail from './Detail';
import { useSelector } from 'react-redux';
import citySelector from '../../store/City/Selector'
import TodayGraph from './Today/TodayGraph';
import BarContext from '../../nav/BarContext';

export default () => {
    const city = useSelector(citySelector)
    const { isBar, setIsBar } = useContext(BarContext)
    const todayRef = useRef()
    const { isLoading, isError, data, error } = useGetWeatherQuery({
        lat: city.lat,
        lon: city.lon,
    })

    if (error) {
        console.log(error)
        return <></>
    }
    if (isLoading) {

        return <View style={{
            flex: 1,
            justifyContent: 'center',
        }}>
            <ActivityIndicator size={'large'} />
        </View>
    }

    return data && <View>
        <Weather />
        <Animated.ScrollView showsVerticalScrollIndicator={false}>

            <Sign current={data.current} place={city.name} daily={data.daily[0]} />
            <Today hourly={data.hourly.slice(0, 25)} theRef={todayRef} />
            <Week daily={data.daily.slice(0, 8)} />
            <Detail current={data.current} />
            <NotImportant />
        </Animated.ScrollView>
        <TodayGraph input={data.hourly.slice(0, 25)} theRef={todayRef} place={city.name} />
    </View>

}
const NotImportant = () => {
    return <View>
        {
            Array.from(Array(4), (_, index) => index + 1).map((e) => <View key={e + 'f'} style={{
                height: styles._va.rw * 15
            }}>

            </View>)
        }
    </View>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth'
    }
})