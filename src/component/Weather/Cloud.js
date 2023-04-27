import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import { look } from '../../common/Box';
import { useAssets } from 'expo-asset';

const img = [
    ["https://www.transparentpng.com/thumb/clouds/lWJcbf-clouds-free-png.png", 3200, 1200],

]


export default () => {
    const [assets, error] = useAssets([
        require("../../asset/Cloud/cloud1.png"),
        require("../../asset/Cloud/cloud2.png"),
        require("../../asset/Cloud/cloud3.png"),
        require("../../asset/Cloud/cloud4.png"),
    ])

    if (error) {
        console.log("cloud Wrong")
    }

    return assets && <View>
        {/* {
            img.map((e, i) => {
                return <Animated.View key={"i" + i} >
                    <Image source={assets[i]} style={{
                        width: assets[i].width,
                        height: assets[i].height,
                    }} />
                </Animated.View>
            })
        } */}
        <Image source={{ uri: img[0][0] }} style={{
            width: img[0][1] * 0.4,
            height: img[0][2] * 0.4,
        }} />
        <Image source={{ uri: img[0][0] }} style={{
            width: img[0][1] * 0.4,
            height: img[0][2] * 0.4,
            position: 'absolute',
            transform: [
                { scaleX: -1, },
                { scaleY: -1, }

            ],
            left:-img[0][1] * 0.4+200,
            top:-50,
        }} />


    </View>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth'
    }
})