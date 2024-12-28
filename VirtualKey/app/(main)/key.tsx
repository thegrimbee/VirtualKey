import { Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { Gyroscope } from 'expo-sensors';
import { styles } from './styles';
import LottieView from 'lottie-react-native';

export default function Lock() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [available, setAvailable] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const animationRef = useRef<LottieView>(null);
  const lastRotation = useRef(0);
  const rotationThreshold = 180; 

  useEffect(() => {
    let subscription;

    const checkPermissions = async () => {
      const { status } = await Gyroscope.getPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        const { status: newStatus } = await Gyroscope.requestPermissionsAsync();
        setHasPermission(newStatus === 'granted');
      }
    };

    const checkAvailability = async () => {
      const isAvailable = await Gyroscope.isAvailableAsync();
      setAvailable(isAvailable);
      
      if (isAvailable) {
        await Gyroscope.setUpdateInterval(100); // Faster updates for better responsiveness
        
        subscription = Gyroscope.addListener(gyroscopeData => {
          console.log('Gyroscope data:', gyroscopeData); // Debug log
          setData(gyroscopeData);

          // Calculate rotation angle from gyroscope data
          const rotation = Math.atan2(gyroscopeData.x, gyroscopeData.z);
          const rotationDegrees = rotation * (180 / Math.PI);
          const rotationChange = Math.abs(rotationDegrees - lastRotation.current);

          // Check if rotation exceeds threshold
          if (rotationChange >= rotationThreshold && !isUnlocked) {
            setIsUnlocked(true);
            animationRef.current?.play();
            console.log("Lock opened!");
          }

          lastRotation.current = rotationDegrees;
        });
      }
    }

    checkPermissions().then(checkAvailability);

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isUnlocked]);

  const resetLock = () => {
    setIsUnlocked(false);
    animationRef.current?.reset();
    lastRotation.current = 0;
    console.log("Lock reset!");
  };

  const unlockWithoutGyroscope = () => {
    setIsUnlocked(true);
    animationRef.current?.play();
    console.log("Lock opened without gyroscope!");
  };


  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Permission to access gyroscope is required.</Text>
      </View>
    );
  }

  if (!available) {
    return (
      <View style={styles.container}>
        <LottieView
          ref={animationRef}
          source={require('@/assets/animations/lock.json')}
          autoPlay={false}
          loop={false}
          style={styles.lottie}
        />
        <Text>Gyroscope not available</Text>
        <TouchableOpacity onPress={unlockWithoutGyroscope} style={styles.unlockButton}>
          <Text style={styles.unlockButtonText}>Unlock</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LottieView
      ref={animationRef}
        source={require('@/assets/animations/lock.json')}
        autoPlay={false}
        loop={false}
        style={styles.lottie}
      />
      <Text>Gyroscope:</Text>
      <Text>x: {data.x.toFixed(2)}</Text>
      <Text>y: {data.y.toFixed(2)}</Text>
      <Text>z: {data.z.toFixed(2)}</Text>
      {isUnlocked && (
        <Text style={styles.unlockedText}>Lock is opened!</Text>
      )}
      {isUnlocked && (
        <TouchableOpacity onPress={resetLock} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset Lock</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}