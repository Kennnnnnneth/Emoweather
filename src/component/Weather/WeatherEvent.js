import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text } from 'react-native';
import Cloud from './Cloud';
export default () => {
    return <View>
        <Cloud />
    </View>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth'
    }
})