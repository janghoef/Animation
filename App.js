import {
  View,
  Text,
  Animated,
  PanResponder,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';

const App = () => {
  const {width} = Dimensions.get('window');
  const [Data, setData] = useState([1, 1, 1, 1, 1]);
  const [oneindex, setOneindex] = useState(0);

  ///////////// Animated box/////////////////
  const position = new Animated.ValueXY({x: 0, y: 0});
  //  Animated.timing(position, {
  //   toValue: {x: 200, y: 400},
  //   duration:2000
  // }).start();

  const Pan = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, {dx: position.x, dy: position.y}],
      {useNativeDriver: false}, // Add options here
    ),
    onPanResponderRelease: () => {
      position.setValue({x: 0, y: 0});
    },
  });

  const rotate = position.x.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '180deg'],
  });
  ///////////// Animated box/////////////////

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <View style={{width: '95%', height: 400, backgroundColor: 'lightgreen'}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={Data}
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            setOneindex((x / width).toFixed(0));
          }}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  paddingLeft: 10,
                  height: 380,
                  width: 350,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    
                    height: '90%',
                    width: '90%',
                    borderRadius: 10,
                    backgroundColor: 'green',
                  }}
                
                />
               
              </View>
            );
          }}
        />
      </View>

      <View
        style={{flexDirection: 'row', marginTop: 20, alignContent: 'center'}}>
        {Data.map((item, index) => {
          return (
            <View
              style={{
                width: 8,
                height: 8,
                backgroundColor: oneindex == index ? 'green' : 'grey',
                borderRadius: 10,
                marginLeft: 5,
              }}
            />
          );
        })}
      </View>

      {/* animated.box */}
      <View>
        <Animated.View
          {...Pan.panHandlers} // Spread the panHandlers onto the Animated.View
          style={{
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
            height: 100,
            width: 100,
            backgroundColor: 'lightblue',
            transform: [
              {translateX: position.x},
              {translateY: position.y},
              {rotate: rotate},
            ],
          }}>
          <Text>BOX</Text>
        </Animated.View>
      </View>
      {/* animated.box */}
    </View>
  );
};
export default App;
