import { useEffect } from "react"
import { useSelector } from "react-redux"
import { AppState, useAppDispatch } from "../redux"
import { setUser } from "../redux/features/auth"
import { getUser } from "../utils/users"

export const useUser = () => {
const dispatch = useAppDispatch()

    useEffect(() => {
        getUser().then((data) => {
          dispatch(setUser(data))
        })
      }, [])
    
    return useSelector((state: AppState) => state.auth.user)
}