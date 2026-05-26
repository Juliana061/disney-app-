import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

const PREGUNTAS = [
  { pregunta: '¿Cómo eres en grupo?', opciones: ['Líder natural', 'El gracioso', 'El inteligente', 'El aventurero'] },
  { pregunta: '¿Cuál es tu mayor fortaleza?', opciones: ['Valentía', 'Humor', 'Sabiduría', 'Curiosidad'] },
  { pregunta: '¿Qué harías en un momento difícil?', opciones: ['Enfrentarlo de frente', 'Hacerlo reír', 'Pensar una solución', 'Explorar opciones'] },
  { pregunta: '¿Cuál es tu lugar favorito?', opciones: ['Un castillo', 'La jungla', 'Una biblioteca', 'El mar'] }
]

const RESULTADOS = [
  { nombre: 'Simba', emoji: '🦁', descripcion: 'Eres un líder valiente que enfrenta sus miedos.' },
  { nombre: 'Olaf', emoji: '⛄', descripcion: 'Eres alegre, positivo y contagias tu energía.' },
  { nombre: 'Belle', emoji: '📚', descripcion: 'Eres inteligente, curioso y amas aprender.' },
  { nombre: 'Moana', emoji: '🌊', descripcion: 'Eres aventurero y sigues tu corazón.' }
]

export default function OriginalScreen() {
  const [paso, setPaso] = useState(0)
  const [puntos, setPuntos] = useState([0, 0, 0, 0])
  const [resultado, setResultado] = useState<number | null>(null)

  const responder = (indice: number) => {
    const nuevos = [...puntos]
    nuevos[indice]++
    setPuntos(nuevos)
    if (paso + 1 >= PREGUNTAS.length) {
      setResultado(nuevos.indexOf(Math.max(...nuevos)))
    } else {
      setPaso(paso + 1)
    }
  }

  const reiniciar = () => {
    setPaso(0)
    setPuntos([0, 0, 0, 0])
    setResultado(null)
  }

  if (resultado !== null) {
    const r = RESULTADOS[resultado]
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.center}>
        <Text style={styles.titulo}>¡Tu personaje Disney es!</Text>
        <Text style={styles.emoji}>{r.emoji}</Text>
        <Text style={styles.nombre}>{r.nombre}</Text>
        <Text style={styles.desc}>{r.descripcion}</Text>
        <TouchableOpacity style={styles.btn} onPress={reiniciar}>
          <Text style={styles.btnText}>🔄 Jugar de nuevo</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  const p = PREGUNTAS[paso]

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.center}>
      <Text style={styles.subtitulo}>Pregunta {paso + 1} de {PREGUNTAS.length}</Text>
      <View style={styles.barraFondo}>
        <View style={[styles.barraRelleno, { width: `${(paso / PREGUNTAS.length) * 100}%` }]} />
      </View>
      <Text style={styles.titulo}>{p.pregunta}</Text>
      {p.opciones.map((op, i) => (
        <TouchableOpacity key={i} style={styles.opcion} onPress={() => responder(i)}>
          <Text style={styles.opcionText}>{op}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1b2a' },
  center: { alignItems: 'center', padding: 24, paddingTop: 60 },
  subtitulo: { color: '#7eb8f7', fontSize: 14, marginBottom: 8 },
  titulo: { color: '#fff', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  emoji: { fontSize: 80, marginBottom: 8 },
  nombre: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  desc: { color: '#ccc', fontSize: 16, textAlign: 'center', marginBottom: 32 },
  opcion: { width: '100%', backgroundColor: '#1c2e42', padding: 16, borderRadius: 12, marginBottom: 12 },
  opcionText: { color: '#fff', fontSize: 16, textAlign: 'center' },
  btn: { backgroundColor: '#1a6fc4', padding: 16, borderRadius: 12, width: '100%', alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  barraFondo: { width: '100%', height: 6, backgroundColor: '#1c2e42', borderRadius: 99, marginBottom: 24 },
  barraRelleno: { height: 6, backgroundColor: '#1a6fc4', borderRadius: 99 }
})