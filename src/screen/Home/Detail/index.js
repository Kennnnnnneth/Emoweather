import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text } from 'react-native';
import CurrentGraph from '../../../component/CurrentGraph';
import { getWindDirection } from '../../../common/Math';
import { CView } from '../../../common/Box';
export default ({ current }) => {

    if (current) {
    }
    return <View style={{
        alignItems: 'center'
    }}>
        <View style={{
            flexWrap: 'wrap'
        }}>

            <View style={[{}, {
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(255, 255, 255, 0.34)',
                marginBottom: styles._va.rw * 3,
                width: styles._va.rw * 85
            }]}>
                <Text style={styles.title_text}>
                    {"Current Condition"}
                </Text>
                <Text style={[styles.title_text, { color: '#3184b0' }]}>
                    {"See more"}
                </Text>
            </View>
            <Summary data={current} />
            <CurrentGraph data={current} size={styles._va.rw * 75} />
        </View>
    </View>
}
const Summary = ({ data }) => {
    const { uvi, visibility, wind_speed, humidity, clouds, sunrise, sunset, wind_deg } = data
    const day_light = Math.round((sunset - sunrise) / 86400 * 100)
    const wind_direction = getWindDirection(wind_deg)
    return <CView>
        <View style={{
            width: styles._va.rw * 85,
            marginBottom: styles._va.rw * 6
        }}>
            <Text style={styles.text}>
                {
                    uvi > 0 && <Text>
                        <Text>{'the strength of the sunburn-producing '}</Text>
                        <Text>
                            {uvi <= 2 ? 'Low' : uvi <= 5 ? 'Moderate' : uvi <= 7 ? 'High' : uvi <= 10 ? 'Very high' : 'Extreme'}
                        </Text>
                        <Text>{", "}</Text>
                    </Text>
                }
                {
                    wind_speed > 0 && <Text>
                        <Text>{
                            wind_speed <= 5 ? 'Light breeze' : wind_speed <= 8 ? 'Moderate breeze' : wind_speed <= 13.5 ? 'Strong breeze' : wind_speed <= 23.5 ? 'Strong gale' : 'Storm'
                        }</Text>
                        <Text>
                            {' from ' + wind_direction}
                        </Text>
                        <Text>{", "}</Text>

                    </Text>
                }
                {
                    humidity > 0 && <Text>
                        <Text>
                            {humidity <= 25 ? 'Poor low humidity' : humidity <= 30 ? 'Fair humidity levels' : humidity <= 60 ? 'Comfort humidity levels' : humidity <= 70 ? 'High humidity levels' : 'Poor high humidity levels'}
                        </Text>
                        <Text>{", "}</Text>
                    </Text>

                }
                <Text>
                    {
                        clouds === 0 ? 'Clear Sky' : clouds < 40 ? 'Few Clouds' : clouds < 60 ? 'Few Clouds' : clouds < 80 ? 'Lots of Clouds' : 'Full Sky Clouds'
                    }
                </Text>
                <Text>{", "}</Text>
                <Text>{
                    visibility <= 50 ? 'Dangerous Vision to drive' : visibility <= 100 ? 'Foggy' : visibility <= 200 ? 'Slightly Foggy ' : visibility <= 400 ? 'Normal Vision' : 'Wide Vision'
                }</Text>

                {uvi > 0 && <Text>
                    <Text>{", "}</Text>
                    <Text>
                        {
                            day_light < 30 ? "Night Forever" : day_light < 43 ? 'Short Daylight' : day_light < 59 ? 'Noramal Daylight' : day_light < 70 ? "Long Daylight" : "Sun never down"
                        }
                    </Text>
                </Text>}
            </Text>
        </View>
    </CView>
}

const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth'
    },
    title_text: {
        fontSize: '2rem',
        color: '#f5fefd',
        textShadowColor: 'black',
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        fontWeight: '600',
    },
    text: {
        fontSize: '1.8rem',
        color: '#f5fefd',
        textShadowColor: 'black',
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        fontWeight: '400',
    },
})