import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { styles } from './styles';
import LottieView from 'lottie-react-native';
// import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

export default function Lock() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const animationRef = useRef<LottieView>(null);
  const apiURL = 'http://192.168.126.247:8000/test';

  const sendRequest = async () => {
    setLoading(true);
    const requestData = {
      username: 'test1',
      received_hash: 'test2',
    };
    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      setResponseData(data);
      console.log('Response data:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetLock = () => {
    setIsUnlocked(false);
    animationRef.current?.reset();
    console.log("Lock reset!");
  };

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={require('@/assets/animations/lock.json')}
        autoPlay={false}
        loop={false}
        style={styles.lottie}
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading && (
        <TouchableOpacity onPress={sendRequest} style={styles.button}>
          <Text style={styles.buttonText}>Send Request</Text>
        </TouchableOpacity>
      )}
      {responseData && (
        <Text style={styles.responseText}>Response: {JSON.stringify(responseData)}</Text>
      )}
      {isUnlocked && (
        <TouchableOpacity onPress={resetLock} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset Lock</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}