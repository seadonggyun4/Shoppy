import {useEffect} from "react";
import {Outlet} from "react-router-dom";
import GlobalComponents from "GlobalComponents";
import {useRecoilState} from "recoil";
import {authStore} from "store/authStore";
import {USER_STATE_CHANGE} from "api/firebase";





export default function Root(){
    const { Header } = GlobalComponents
    const [ isauth, setIsAuth ] = useRecoilState(authStore)

    
    // 로그인 되어있는지 체킹
    useEffect( () => {
        USER_STATE_CHANGE((user) => {
            if(user !== null){
                setIsAuth(()=>{
                    return {...isauth, userInfo: user}
                })
                console.log('실행')
            }
        })
    }, [])

    return(
        <>
            <Header />
            <main className="flex justify-center items-center mx-auto w-full max-w-screen-2xl">
                <Outlet/>
            </main>
        </>
    )
}