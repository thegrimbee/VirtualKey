import { Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import { username } from './login';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import { styles } from './styles';

export default function Register() {
  const [inputUsername, setInputUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}>Register</Text>
      <Text style={styles.label}>Username</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Enter your username" 
        value={inputUsername}
        onChangeText={setInputUsername}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Enter your password" 
        value={password}
        onChangeText={setPassword}
        secureTextEntry 
      />
      <Link href="/(main)/lock" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}