import { View, Text, StyleSheet, Pressable } from "react-native"
import { router } from "expo-router"

type MissionCardProps = {
  id: number
  title: string
  date: string
  location: string
}

export default function MissionCard({ id, title, date, location }: MissionCardProps) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(tabs)/mission/[id]",
          params: { id: id.toString() },
        })
      }
    >
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text>
          {date} • {location}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: { fontWeight: "bold", marginBottom: 5 },
})