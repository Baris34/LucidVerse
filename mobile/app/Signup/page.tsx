import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Switch } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Geri Tuşu */}
      <TouchableOpacity style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Create your account</Text>

      {/* Facebook Login */}
      <TouchableOpacity style={styles.fbButton}>
        <AntDesign name="facebook-square" size={20} color="#fff" />
        <Text style={styles.fbButtonText}>  CONTINUE WITH FACEBOOK</Text>
      </TouchableOpacity>

      {/* Google Login */}
      <TouchableOpacity style={styles.googleButton}>
        <Image source={require('../../assets/google.png')} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>CONTINUE WITH GOOGLE</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR LOG IN WITH EMAIL</Text>

      {/* Username */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      {username.length > 2 && <AntDesign name="checkcircle" size={18} color="green" style={styles.checkIcon} />}

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {email.includes('@') && <AntDesign name="checkcircle" size={18} color="green" style={styles.checkIcon} />}

      {/* Password */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <Switch
            value={checked}
            onValueChange={setChecked}
            trackColor={{ false: '#ccc', true: '#9D84F7' }}
            thumbColor={checked ? '#fff' : '#fff'}
        />
        <Text style={styles.privacyText}>
            I have read the <Text style={styles.link}>Privacy Policy</Text>
        </Text>
       </View>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
            if (username.trim().length > 0) {
            router.push({
              pathname: "/Welcome/page",
              params: { username },
            });
          } else {
              alert("Please enter a username");
            }
  }}
>
  <Text style={styles.buttonText}>GET STARTED</Text>
</TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flex: 1,
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  fbButton: {
    backgroundColor: '#7B6EF6',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  fbButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  googleButton: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginBottom: 24,
  },
  googleIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  googleButtonText: {
    fontWeight: '600',
    fontSize: 14,
  },
  orText: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  checkIcon: {
    position: 'absolute',
    right: 16,
    top: -38,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  privacyText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#999',
  },
  link: {
    color: '#7B6EF6',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#9D84F7',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});