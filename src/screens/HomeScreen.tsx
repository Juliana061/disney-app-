import { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

interface Character {
  _id: number
  name: string
  imageUrl: string
  films: string[]
}

export default function HomeScreen({ navigation }: any) {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    fetch('https://api.disneyapi.dev/character?pageSize=50')
      .then(r => r.json())
      .then(data => {
        setCharacters(data.data || [])
        setLoading(false)
      })
  }, [])

  const filtrados = characters.filter(c =>
    c.name.toLowerCase().includes(busqueda.toLowerCase())
  )

  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>🏰 Disney</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      {/* BOTON ORIGINAL */}
      <TouchableOpacity
        style={styles.originalBtn}
        onPress={() => navigation.navigate('Original')}
      >
        <Text style={styles.originalText}>🎭 ¿A qué personaje Disney te pareces?</Text>
      </TouchableOpacity>

      {/* BUSCADOR */}
      <TextInput
        style={styles.input}
        placeholder="Buscar personaje..."
        placeholderTextColor="#aaa"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {loading ? (
        <ActivityIndicator color="#1a6fc4" size="large" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtrados}
          keyExtractor={item => item._id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Detail', { character: item })}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.img} />
              <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1b2a', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, marginTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  logoutBtn: { backgroundColor: '#c0392b', padding: 8, borderRadius: 8 },
  logoutText: { color: '#fff', fontWeight: 'bold' },
  originalBtn: { backgroundColor: '#8e44ad', padding: 14, borderRadius: 12, marginBottom: 12, alignItems: 'center' },
  originalText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  input: { backgroundColor: '#1c2e42', color: '#fff', borderRadius: 12, padding: 12, marginBottom: 16, fontSize: 15 },
  row: { justifyContent: 'space-between', marginBottom: 12 },
  card: { backgroundColor: '#1c2e42', borderRadius: 12, width: '48%', overflow: 'hidden' },
  img: { width: '100%', height: 160 },
  name: { color: '#fff', padding: 8, fontSize: 13, fontWeight: 'bold' }
})