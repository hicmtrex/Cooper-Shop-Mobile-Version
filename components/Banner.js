import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';

let { width } = Dimensions.get('window');

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  useEffect(() => {
    setBannerData([
      'https://m.media-amazon.com/images/I/71YsF5seP6L._AC_SY450_.jpg',
      'https://static.turbosquid.com/Preview/2019/12/12__07_47_48/001.jpgFA7C74F9-9769-4697-977E-9798EC170A58Large.jpg',
      'https://assets1.ignimgs.com/2019/04/05/graphicscards2019-blogroll-1554499813756_160w.jpg?width=1280',
    ]);
    return () => {
      setBannerData([]);
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.swiper}>
        <Swiper
          style={{ height: width / 2 }}
          showButtons={false}
          autoplay={true}
          autoplayTimeout={5}
        >
          {bannerData.map((item) => (
            <TouchableOpacity>
              <Image
                style={styles.imageBanner}
                key={item}
                source={{ uri: item }}
                resizeMode='contain'
              />
            </TouchableOpacity>
          ))}
        </Swiper>
        <View style={{ height: 20 }}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  swiper: {
    width: width,
    alignItems: 'center',
    marginTop: 10,
  },
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});
export default Banner;
