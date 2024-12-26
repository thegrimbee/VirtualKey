import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 24,
    },
    label: {
      fontSize: 16,
      alignSelf: 'flex-start',
      marginBottom: 8,
    },
    input: {
      width: '100%',
      padding: 12,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      marginBottom: 16,
    },
    button: {
      backgroundColor: '#007BFF',
      padding: 12,
      borderRadius: 4,
      alignItems: 'center',
      width: '100%',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export const screenOptions = {
    headerShown: false,
};