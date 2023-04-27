import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScreenArray from "../screen"
import TabBar from './TabBar';

const { Navigator, Screen } = createBottomTabNavigator();
export default () => {

    return <Navigator
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
            headerShown: false
        }}
    >
        {
            ScreenArray.map((e, i) => <Screen name={e.name} component={e.component} key={i + 'o'} />)
        }
    </Navigator>

}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem'
    }
})