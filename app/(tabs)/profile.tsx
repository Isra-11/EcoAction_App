import { View, Text, StyleSheet, Button } from "react-native"
import { useAuth } from "../../context/auth"
import { router } from "expo-router"

export default function Profile() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Vous n'êtes pas connecté</Text>
      </View>
    )
  }

  const actionsCount = user.missions?.length ?? 0

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>

      <View style={styles.card}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.stats}>
        <Text style={styles.statsTitle}>Statistiques</Text>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{actionsCount}</Text>
          <Text style={styles.statLabel}>Actions réalisées</Text>
        </View>
      </View>

      <Button
        title="Se déconnecter"
        color="#e74c3c"
        onPress={() => {
          logout()
          router.replace("/login")
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },

  card: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },

  name: { fontSize: 18, fontWeight: "bold" },

  email: { color: "gray" },

  stats: { marginBottom: 20 },

  statsTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },

  statBox: {
    backgroundColor: "#2f7d57",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },

  statNumber: { color: "#fff", fontSize: 26, fontWeight: "bold" },

  statLabel: { color: "#fff" },
})