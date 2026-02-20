import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from "react-native"
import MissionCard from "../../components/MissionCard"
import { useQuery } from "@tanstack/react-query"
import { getMissions } from "../../services/missions.service"
import { useState } from "react"

export default function Missions() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const { data, isLoading } = useQuery({
    queryKey: ["missions"],
    queryFn: getMissions,
  })

  const categories = ["All", "Cleanup", "Planting", "Workshop"]

  const filtered = data?.filter((m) => {
    const matchSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.location.toLowerCase().includes(search.toLowerCase())

    const matchCategory =
      category === "All" || m.category === category

    return matchSearch && matchCategory
  })

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Chargement...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Missions</Text>

      {/* SEARCH */}
      <TextInput
        placeholder="Rechercher une mission..."
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      {/* FILTER CATEGORIES */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setCategory(cat)}
            style={[
              styles.filterBtn,
              category === cat && styles.activeFilter
            ]}
          >
            <Text style={category === cat ? styles.activeText : styles.filterText}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* LIST MISSIONS */}
      {filtered?.map((mission) => (
        <MissionCard
          key={mission.id}
          id={mission.id}
          title={mission.title}
          date={mission.date}
          location={mission.location}
        />
      ))}

      {filtered?.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Aucune mission trouvée
        </Text>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },

  search: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },

  filters: { flexDirection: "row", marginBottom: 15 },

  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginRight: 8,
  },

  activeFilter: {
    backgroundColor: "#2f7d57",
  },

  filterText: { color: "#333" },

  activeText: { color: "#fff", fontWeight: "bold" },
})