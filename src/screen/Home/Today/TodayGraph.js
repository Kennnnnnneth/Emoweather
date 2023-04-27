import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import HourGraph from '../../../component/HourGraph'
import { CView } from '../../../common/Box';
import { useContext } from 'react';
import BarContext from '../../../nav/BarContext';
export default ({ input, theRef, place }) => {
    const { isBar, setIsBar } = useContext(BarContext)

    return <BottomSheet
        ref={theRef}
        index={-1}
        snapPoints={['60%']}
        enablePanDownToClose={true}
        onAnimate={(fromIndex, toIndex) => {
            if (toIndex === -1) {
                if (!isBar) {
                    setIsBar(true)
                }
            }
        }}
    >
        <CView>
            <Text style={{
                fontSize: styles._va.unit * 2,
                fontWeight: '300'
            }}>{'Next 24 Hours in ' + place}</Text>
        </CView>
        <HourGraph data={input} w={80} h={40} />
    </BottomSheet>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth'
    }
})