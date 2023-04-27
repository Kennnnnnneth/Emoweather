import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text } from 'react-native';
import { Polygon, Svg } from 'react-native-svg';
import { current_data, setBorder } from '../../common/Math';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { CView, RowView } from '../../common/Box';

export default ({ data, size }) => {
    const { uvi, visibility, wind_speed, humidity, clouds, sunrise, sunset } = data
    const radius = size / 2
    const center_point = size / 2
    const level = 3

    const current_path = current_data([uvi, visibility, wind_speed, humidity, clouds, (sunset - sunrise) / 86400], radius, center_point)

    const border_path = setBorder(radius, center_point, level)

    return <CView >
        <View style={{
            paddingVertical: styles._va.rw * 5
        }}>

            <MaterialCommunityIcons name="sunglasses" size={24} color="#e7e7e7" style={{
                position: 'absolute',
                left: radius + Math.cos(Math.PI / 6) * radius + 5,
                top: radius - Math.sin(Math.PI / 6) * radius
            }} />

            <Ionicons name="md-eye-sharp" size={24} color={'#e7e7e7'} style={{
                position: 'absolute',
                top: -12,
                left: radius - 11,
            }} />

            <MaterialCommunityIcons name="tailwind" size={24} color="#e7e7e7" style={{
                position: 'absolute',
                top: radius - Math.sin(Math.PI / 6) * radius,
                left: -5,
            }} />
            <MaterialCommunityIcons name="water" size={24} color="#e7e7e7" style={{
                position: 'absolute',
                top: radius + radius * Math.sin(Math.PI / 6) + 5,
                left: -5,
            }} />
            <MaterialCommunityIcons name="cloud" size={24} color="#e7e7e7" style={{
                position: 'absolute',
                left: radius - 11,
                top: size + 20
            }} />
            <MaterialCommunityIcons name="weather-sunset" size={24} color="#e7e7e7" style={{
                position: 'absolute',
                left: radius + Math.cos(Math.PI / 6) * radius + 5,
                top: radius + radius * Math.sin(Math.PI / 6) + 5
            }} />
            <Svg width={size} height={size}>
                {
                    border_path.map((e, i) => <Polygon
                        key={i + 's'}
                        points={e}
                        stroke={"#e7e7e7"}
                        strokeWidth={1}
                    />)
                }
                <Polygon
                    points={current_path}
                    fill={"#e7decc"}
                    strokeWidth={1}
                />
            </Svg>
        </View>

    </CView>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth'
    },
    text: {
        fontSize: '2rem',
        color: '#f5fefd',
        textShadowColor: 'black',
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        fontWeight: '600',
    },
})