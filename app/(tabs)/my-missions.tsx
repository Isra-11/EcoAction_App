import { View, Text, StyleSheet, ScrollView, Button } from "react-native"
import { useAuth } from "../../context/auth"
import { useQuery } from "@tanstack/react-query"
import { getMissions } from "../../services/missions.service"
import MissionCard from "../../components/MissionCard"
import { router } from "expo-router"

export default function MesMissions() {
  const { user } = useAuth()

  const { data } = useQuery({
    queryKey: ["missions"],
    queryFn: getMissions,
  })

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mes Missions</Text>
        <Text style={styles.empty}>Vous devez vous connecter</Text>
        <Button
          title="Découvrir les missions"
          color="#2f7d57"
          onPress={() => router.push("/(tabs)/missions")}
        />
      </View>
    )
  }

  const myMissions = data?.filter((m) => user.missions.includes(m.id))

  if (!myMissions || myMissions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mes Missions</Text>
        <Text style={styles.empty}>Aucune mission inscrite</Text>

        <Button
          title="Découvrir les missions"
          color="#2f7d57"
          onPress={() => router.push("/(tabs)/missions")}
        />
      </View>
    )
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={styles.title}>Mes Missions</Text>

      {myMissions.map((mission) => (
        <MissionCard
          key={mission.id}
          id={mission.id}
          title={mission.title}
          date={mission.date}
          location={mission.location}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },

  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },

  empty: { color: "gray", marginBottom: 20 },
})
