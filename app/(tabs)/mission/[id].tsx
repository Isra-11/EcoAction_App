import { View, Text, Button, StyleSheet } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../../../services/api"
import { useAuth } from "../../../context/auth"

export default function MissionDetails() {
  const { id } = useLocalSearchParams()
  const queryClient = useQueryClient()

  const { user, joinMission, cancelMission } = useAuth()

  const missionId = Number(id)

  // récupérer mission
  const { data, isLoading } = useQuery({
    queryKey: ["mission", missionId],
    queryFn: async () => {
      const res = await api.get(`/missions/${missionId}`)
      return res.data
    },
  })

  // inscription mutation
  const joinMutation = useMutation({
    mutationFn: async () =>
      api.patch(`/missions/${missionId}`, {
        spotsLeft: data.spotsLeft - 1,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["missions"] })
      queryClient.invalidateQueries({ queryKey: ["mission", missionId] })
    },
  })

  // annulation mutation
  const cancelMutation = useMutation({
    mutationFn: async () =>
      api.patch(`/missions/${missionId}`, {
        spotsLeft: data.spotsLeft + 1,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["missions"] })
      queryClient.invalidateQueries({ queryKey: ["mission", missionId] })
    },
  })

  if (isLoading || !data) {
    return (
      <View style={styles.center}>
        <Text>Chargement...</Text>
      </View>
    )
  }

  const isJoined = user?.missions.includes(missionId)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>

      <Text style={styles.description}>{data.description}</Text>

      <Text style={styles.info}>📍 {data.location}</Text>
      <Text style={styles.info}>📅 {data.date}</Text>

      <Text style={styles.spots}>
        Places restantes : {data.spotsLeft}
      </Text>

      {!user && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          Connectez-vous pour vous inscrire
        </Text>
      )}

      {user && !isJoined ? (
        <Button
          title="S'inscrire"
          color="#2f7d57"
          disabled={data.spotsLeft === 0}
          onPress={() => {
            joinMutation.mutate()
            joinMission(missionId)
          }}
        />
      ) : null}

      {user && isJoined ? (
        <Button
          title="Annuler inscription"
          color="red"
          onPress={() => {
            cancelMutation.mutate()
            cancelMission(missionId)
          }}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },

  description: { marginBottom: 10 },

  info: { marginBottom: 5 },

  spots: { marginVertical: 10, fontWeight: "bold", color: "#2f7d57" },
})
