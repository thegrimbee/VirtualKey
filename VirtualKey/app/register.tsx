import { Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import { Link } from 'expo-router';
import { styles } from './styles';

export default function Register() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}>Register</Text>
      <Text style={styles.label}>Username</Text>
      <TextInput style={styles.input} placeholder="Enter your username" />
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry />
      <Link href="/(main)/lock" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}