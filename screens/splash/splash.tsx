import {View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import styles from './splash.styles';
import LottieView from 'lottie-react-native';
const Splash = props => {
  const animation = useRef(null);
  useEffect(() => {
    const time = setTimeout(() => {
      props.navigation.navigate('Home');
    }, 3000);

    return () => {
      clearTimeout(time);
    };
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        ref={animation}
        style={styles.lottie}
        source={require('../../assets/lotties/splash.json')}
        loop
      />
    </View>
  );
};

export default Splash;
