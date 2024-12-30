import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    lottie: {
      width: 200,
      height: 200,
    },
    text: {
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'stretch',
      marginTop: 15,
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eee',
      padding: 10,
    },
    middleButton: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: '#ccc',
    },
    unlockedText: {
      marginTop: 20,
      fontSize: 18,
      color: 'green',
    },
    resetButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#007BFF',
      borderRadius: 5,
    },
    resetButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    unlockButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#FF6347',
      borderRadius: 5,
    },
    unlockButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    nfcButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#32CD32',
      borderRadius: 5,
    },
    nfcButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    writeButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#FF6347',
      borderRadius: 5,
    },
    writeButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    nfcText: {
      marginTop: 20,
      fontSize: 18,
      color: 'blue',
    },
    nfcDataText: {
      marginTop: 20,
      fontSize: 16,
      color: 'black',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    responseText: {
      marginTop: 20,
      fontSize: 16,
      color: 'black',
    },
  });

export const tabOptions = {
    headerShown: false,
};