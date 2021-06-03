import { useSelector } from "react-redux"
import { AppState } from "../redux"

export const useUser = () => {
    return useSelector((state: AppState) => state.auth.user)
}