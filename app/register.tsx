import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { router } from "expo-router"
import { useState } from "react"

export default function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleRegister = () => {
    if (!name) return setError("Nom requis")
    if (!email.includes("@")) return setError("Email invalide")
    if (password.length < 4) return setError("Mot de passe trop court")

    // simulation création compte
    setError("")
    setSuccess("Compte créé avec succès 🎉")

    // redirection après 1 seconde
    setTimeout(() => {
      router.replace("/login")
    }, 1000)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}

      <TextInput
        placeholder="Nom"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

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

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/login")}>
        <Text style={styles.link}>Déjà un compte ?</Text>
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

  success: { color: "#2f7d57", marginBottom: 10 },
})