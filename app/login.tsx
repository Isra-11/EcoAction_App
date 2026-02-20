import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { router } from "expo-router"
import { useState } from "react"
import { useAuth } from "../context/auth"

export default function Login() {
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = () => {
    if (!email.includes("@")) {
      setError("Email invalide")
      return
    }

    if (password.length < 4) {
      setError("Mot de passe trop court")
      return
    }

   login(email.split("@")[0], email)

    router.replace("/(tabs)")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/register")}>
        <Text style={styles.link}>Créer un compte</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },

  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#2f7d57",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },

  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },

  link: { marginTop: 10, textAlign: "center", color: "#2f7d57" },

  error: { color: "red", marginBottom: 10 },
})
