import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    setLoading(true); 
    try {
      const response = await fetch('http://172.16.8.140:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('authToken', data.token);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Drawer' }],
        });
      } else {
        alert(`Login Failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginComponent}>
        <View style={styles.loginView}>
          <Text style={styles.loginText}>Login Page</Text>
          <Text style={[styles.reqParam, styles.username]}>Enter Username</Text>
          <TextInput style={styles.inputBox} onChangeText={setUsername} value={username} />
          <Text style={styles.reqParam}>Enter Password</Text>
          <TextInput style={styles.inputBox} secureTextEntry onChangeText={setPassword} value={password} />
          
          {/* Button with Loader */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  loginComponent: {
    marginTop: 150,
    backgroundColor: 'white',
    height: 600,
    borderRadius: 70,
  },
  loginView: {
    margin: 20,
  },
  inputBox: {
    fontSize: 30,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
  },
  loginText: {
    marginTop: 30,
    fontSize: 40,
    textAlign: 'center',
  },
  reqParam: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    marginTop: 50,
  },
  button: {
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: 'green',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: 'gray', // Change color when disabled
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
  },
});

export default LoginPage;
