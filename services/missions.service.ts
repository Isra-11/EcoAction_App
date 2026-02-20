import { api } from "./api"
import { Mission } from "../types/mission"

export const getMissions = async (): Promise<Mission[]> => {
  const response = await api.get("/missions")
  return response.data
}
