import {useEffect} from "react";
import {USER_STATE_CHANGE} from "api/firebase";
import {useRecoilState} from "recoil";
import {authStore} from "store/authStore";
import {Navigate} from "react-router-dom";

export default function ProtectedRoute({requireAdmin, children}){
    const [ isauth, setIsAuth ] = useRecoilState(authStore)


    // useEffect(() => {
    //     USER_STATE_CHANGE((user) => {
    //         console.log('유저 정보:', user)
    //         setIsAuth(()=>{
    //             return {...isauth, userInfo: user}
    //         })
    //     })
    // }, [])


    

    if(!isauth.userInfo){
        alert('로그인을 한 뒤 해당페이지에 접근해 주세요!')
        return <Navigate to="/" replace/>
    }

    if(requireAdmin && !isauth.userInfo.isAdmin){
        alert('관리자 권한을 가진 계정만 해당페이지에 접근해 주세요!')
        return <Navigate to="/" replace/>
    }


    return(
        <>
            {children}
        </>
    )
}