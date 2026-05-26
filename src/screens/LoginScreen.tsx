import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Error', 'Completa todos los campos')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e: any) {
      Alert.alert('Error', e.message)
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🏰</Text>
      <Text style={styles.title}>Disney App</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={loading}>
        <Text style={styles.btnText}>{loading ? 'Cargando...' : 'Iniciar sesión'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1b2a', alignItems: 'center', justifyContent: 'center', padding: 24 },
  logo: { fontSize: 64, marginBottom: 8 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 32 },
  input: { width: '100%', backgroundColor: '#1c2e42', color: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, fontSize: 16 },
  btn: { width: '100%', backgroundColor: '#1a6fc4', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { color: '#7eb8f7', marginTop: 16, fontSize: 14 }
})
