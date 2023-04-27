import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text } from 'react-native';
import { ABView } from "../../common/Box"
import Daily from "./Daily"
import WeatherEvent from "./WeatherEvent"
export default () => {
    return <ABView>
        <Text>{"Weather"}</Text>
        <Daily />
        <WeatherEvent />
    </ABView>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth'
    }
})