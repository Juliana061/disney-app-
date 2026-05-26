import { useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { collection, addDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'

export default function DetailScreen({ route }: any) {
  const { character } = route.params
  const [guardado, setGuardado] = useState(false)

  const guardarEnFirebase = async () => {
    try {
      await addDoc(collection(db, 'favoritos'), {
        characterId: character._id,
        name: character.name,
        imageUrl: character.imageUrl,
        films: character.films,
        userId: auth.currentUser?.uid,
        savedAt: new Date()
      })
      setGuardado(true)
      Alert.alert('✅', `${character.name} guardado en favoritos`)
    } catch (e: any) {
      Alert.alert('Error', e.message)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: character.imageUrl }} style={styles.img} />

      <View style={styles.content}>
        <Text style={styles.name}>{character.name}</Text>

        {character.films?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎬 Películas</Text>
            {character.films.map((film: string, i: number) => (
              <Text key={i} style={styles.item}>• {film}</Text>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={[styles.btn, guardado && styles.btnGuardado]}
          onPress={guardarEnFirebase}
          disabled={guardado}
        >
          <Text style={styles.btnText}>
            {guardado ? '✅ Guardado en Firebase' : '💾 Guardar en favoritos'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1b2a' },
  img: { width: '100%', height: 300 },
  content: { padding: 20 },
  name: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#7eb8f7', marginBottom: 8 },
  item: { color: '#ccc', fontSize: 15, marginBottom: 4 },
  btn: { backgroundColor: '#1a6fc4', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  btnGuardado: { backgroundColor: '#27ae60' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
})
