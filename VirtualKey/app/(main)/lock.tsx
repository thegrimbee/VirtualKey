import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { styles } from './styles';
import LottieView from 'lottie-react-native';

export default function Lock() {
  return (
    <View
      style={styles.container}
    >
      <LottieView
        source={require('../../assets/animations/lock-animation.json')}
        autoPlay
        style={{
          width: 200,
          height: 200,
          backgroundColor: '#eee',
        }}
      />
    </View>
  );
}

