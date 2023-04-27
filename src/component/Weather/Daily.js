import EStyleSheet from 'react-native-extended-stylesheet';
import { mixColor } from 'react-native-redash';
import { useEffect } from 'react';
import { Canvas, Rect, useComputedValue,useValue, vec, LinearGradient, runTiming } from "@shopify/react-native-skia"
export default () => {
    const time = useValue(0)
    const colors = useComputedValue(() => [
        '#228baa',
        mixColor(time.current, "#228baa", "#7a9bae"),
        mixColor(time.current, "#228baa", "#d6a59d"),
        mixColor(time.current, "#228baa", "#f79128"),
    ], [time])
    useEffect(() => {
        runTiming(time, { to: 1 })
    }, [])

    return <Canvas style={{ position: 'absolute', width: styles._va.rw * 100, height: styles._va.rh * 100 }} >
        <Rect x={0} y={0} width={styles._va.rw * 100} height={styles._va.rh * 100} >
            <LinearGradient 
            colors={colors} 
            start={vec(0, 0)} 
            end={vec(0, styles._va.rh * 100)} 
            positions={[0,0.6,0.9,1]}
             />
        </Rect>
    </Canvas>
}

const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth',
        rh: '$rheight',
    }
})