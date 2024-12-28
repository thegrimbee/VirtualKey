import { Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import { Link } from 'expo-router';
import { styles } from './styles';

export default function Login() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}>Login</Text>
      <Text style={styles.label}>Username</Text>
      <TextInput style={styles.input} placeholder="Enter your username" />
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry />
      <Link href="/(main)/lock" asChild>
        <TouchableOpacity style={styles.button}>
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

