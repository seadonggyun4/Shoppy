import {createContext, useEffect} from "react";
import {useRecoilState} from "recoil";
import {authStore} from "store/authStore";
import {USER_STATE_CHANGE} from "api/firebase";


const AuthContext = createContext()

export function AuthContextProvider({children}){
    const [ isauth, setIsAuth ] = useRecoilState(authStore)


    useEffect(() => {
        USER_STATE_CHANGE((user) => {
            console.log('유저 정보:', user)
            setIsAuth(()=>{
                return {...isauth, userInfo: user}
            })
        })
    }, [])


    return (
        <AuthContext.provider>
            {children}
        </AuthContext.provider>
    )
}