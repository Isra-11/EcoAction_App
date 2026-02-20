import { View, Text, StyleSheet, ScrollView } from "react-native"
import StatCard from "../../components/StatCard"
import MissionCard from "../../components/MissionCard"
import { useAuth } from "../../context/auth"
import { useQuery } from "@tanstack/react-query"
import { getMissions } from "../../services/missions.service"

export default function Home() {
  const { user } = useAuth()

  const { data } = useQuery({
    queryKey: ["missions"],
    queryFn: getMissions,
  })

  // missions à la une (3 premières)
  const featured = data?.slice(0, 3)

  return (
    <ScrollView style={styles.container}>
      {/* HERO */}
      <View style={styles.hero}>
        <Text style={styles.title}>
          Bonjour, {user ? user.name : "Invité"} 👋
        </Text>

        <Text style={styles.subtitle}>
          Découvrez des missions de bénévolat près de chez vous
        </Text>
      </View>

      {/* STATS */}
      <View style={styles.stats}>
        <StatCard label="Bénévoles" value="2,400+" />
        <StatCard label="Missions" value="180+" />
        <StatCard label="Déchets" value="12T" />
      </View>

      {/* MISSIONS A LA UNE */}
      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>🔥 Missions à la une</Text>

        {featured?.map((mission) => (
          <MissionCard
            key={mission.id}
            id={mission.id}
            title={mission.title}
            date={mission.date}
            location={mission.location}
          />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },

  hero: {
    backgroundColor: "#2f7d57",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  title: { color: "#fff", fontSize: 22, fontWeight: "bold" },

  subtitle: { color: "#fff", marginTop: 5 },

  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },

  featuredSection: {
    marginTop: 25,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
})