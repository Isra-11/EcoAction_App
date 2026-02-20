import { Redirect } from "expo-router"
import { useAuth } from "../context/auth"

export default function Index() {
  const { user } = useAuth()

  if (user) {
    return <Redirect href="/(tabs)" />
  }

  return <Redirect href="/login" />
}
