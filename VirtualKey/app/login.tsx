import { Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import React, { useState } from 'react';
import { Link } from 'expo-router';
import { styles } from './styles';

export let username = '';

export default function Login() {
  const [inputUsername, setInputUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    username = inputUsername;
    console.log('Logged in as:', username);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/register" asChild>
        <TouchableOpacity>
          <Text style={{ color: 'blue', marginTop: 10 }}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

