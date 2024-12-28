import { Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { Accelerometer } from 'expo-sensors';
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
  const animationRef = useRef<LottieView>(null);
  const lastRotation = useRef(0);
  const rotationThreshold = 2.5; // Adjust this value to make it more or less sensitive

  const detectRotation = (newData: { x: number, y: number, z: number }) => {
    // Calculate rotation angle from x and z acceleration
    const rotation = Math.atan2(newData.x, newData.z);
    const rotationDegrees = rotation * (180 / Math.PI);
    const rotationChange = Math.abs(rotationDegrees - lastRotation.current);

    // Check if rotation exceeds threshold
    if (rotationChange > rotationThreshold && !isUnlocked) {
      setIsUnlocked(true);
      animationRef.current?.play();
      console.log("Lock opened!");
    }

    lastRotation.current = rotationDegrees;
  };

  useEffect(() => {
    let subscription;

    const checkAvailability = async () => {
      const isAvailable = await Accelerometer.isAvailableAsync();
      setAvailable(isAvailable);
      
      if (isAvailable) {
        await Accelerometer.setUpdateInterval(100);
        
        subscription = Accelerometer.addListener(accelerometerData => {
          setData(accelerometerData);
          detectRotation(accelerometerData);
        });
      }
    };

    checkAvailability();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  // Reset function to lock again
  const resetLock = () => {
    setIsUnlocked(false);
    animationRef.current?.reset();
  };

  if (!available) {
    return (
      <View style={styles.container}>
        <Text>Accelerometer not available</Text>
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
        onAnimationFinish={() => {
          console.log("Animation finished");
          // Optional: add any code you want to run after animation finishes
        }}
      />
      <Text style={styles.label}>
        {isUnlocked ? "Unlocked!" : "Rotate phone like a key to unlock"}
      </Text>
      
      {isUnlocked && (
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={resetLock}
        >
          <Text>Reset Lock</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}