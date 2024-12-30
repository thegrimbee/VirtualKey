import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { styles } from './styles';
import LottieView from 'lottie-react-native';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

export default function Lock() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [nfcDetected, setNfcDetected] = useState(false);
  const [detectingNfc, setDetectingNfc] = useState(false);
  const [nfcData, setNfcData] = useState(null);
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    // Initialize the NFC manager when the component mounts
    NfcManager.start();

    // Cleanup function to stop the NFC manager when the component unmounts
    return () => {
      NfcManager.setEventListener(NfcTech.Ndef, null);
      NfcManager.stop();
    };
  }, []); // Empty dependencies array means this runs only once after the initial render

  const startNfcDetection = async () => {
    setDetectingNfc(true);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      console.log('NFC Tag:', tag);
      setNfcDetected(true);
      setNfcData(tag);
      setIsUnlocked(true);
      animationRef.current?.play();
      console.log("Lock opened with NFC!");
    } catch (ex) {
      console.warn(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
      setDetectingNfc(false);
    }
  };

  const writeNfcData = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([Ndef.textRecord('Hello from React Native!')]);
      await NfcManager.writeNdefMessage(bytes);
      console.log('NFC data written successfully!');
    } catch (ex) {
      console.warn(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  const resetLock = () => {
    setIsUnlocked(false);
    setNfcDetected(false);
    setNfcData(null);
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
      {isUnlocked && (
        <Text style={styles.unlockedText}>Lock is opened!</Text>
      )}
      {isUnlocked && (
        <TouchableOpacity onPress={resetLock} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset Lock</Text>
        </TouchableOpacity>
      )}
      {!isUnlocked && (
        <TouchableOpacity onPress={startNfcDetection} style={styles.nfcButton}>
          <Text style={styles.nfcButtonText}>
            {detectingNfc ? 'Detecting NFC...' : 'Start NFC Detection'}
          </Text>
        </TouchableOpacity>
      )}
      {nfcDetected && (
        <Text style={styles.nfcText}>NFC Device Detected!</Text>
      )}
      <TouchableOpacity onPress={writeNfcData} style={styles.writeButton}>
        <Text style={styles.writeButtonText}>Write NFC Data</Text>
      </TouchableOpacity>
      {nfcData && (
        <Text style={styles.nfcDataText}>NFC Data: {JSON.stringify(nfcData)}</Text>
      )}
    </View>
  );
}