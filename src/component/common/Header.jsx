import GlobalComponents from "GlobalComponents";
import {NavLink, Link} from 'react-router-dom'
import { LOGIN, LOGOUT } from 'api/firebase'
import { useRecoilState } from "recoil";
import { authStore } from "store/authStore";


export default function Header(){
    const { AiFillShop, GiShoppingCart, SiShopify, MdAppRegistration, User, Button } = GlobalComponents
    const [ isauth, setIsAuth ] = useRecoilState(authStore)


    const listItem = [
        {
            content: <SiShopify className="text-2xl"/>,
            to: '/products',
            show: true,
        },
        {
            content: <GiShoppingCart className="text-3xl"/>,
            to: '/carts',
            show: Object.keys(isauth.userInfo).length > 0,
        },
        {
            content: <MdAppRegistration className="text-3xl"/>,
            to: '/products/new',
            show: isauth.userInfo.isAdmin,
        },
    ]

    const handleLogin = async ()=> {
        const user  = await LOGIN()
        console.log(user)
        await setIsAuth(()=>{
            return {...isauth, userInfo: user}
        })
    }

    const handleLogout = async ()=> {
        const user  = await LOGOUT()
        console.log(user)
        await setIsAuth(()=>{
            return {...isauth, userInfo: user}
        })
    }

    console.log()



    return(
        <header className="flex justify-center items-center px-20 w-full border-b border-gray-300">
            <article className="flex justify-between items-center py-5 w-full max-w-screen-2xl">
                <Link to="/" className="flex justify-start items-center gap-2 text-3xl text-primary">
                    <AiFillShop className="text-4xl"/>
                    <h1>SHOPPY</h1>
                </Link>
                <ul className="flex justify-center items-center gap-5">
                    {listItem.map((item, index) => {
                        return (
                            <li key={index}>
                                {
                                    item.show &&
                                    <NavLink to={item.to} className={({isActive})=> isActive ? 'text-primary' : 'hover:text-primary transition'} >
                                        {item.content}
                                    </NavLink>
                                }
                            </li>
                        )
                    })}
                    {
                        Object.keys(isauth.userInfo).length > 0 ?
                            <div className="flex justify-center items-center gap-3">
                                <User user={isauth.userInfo}/>
                                <Button type="button" onClick={handleLogout}>LogOut</Button>
                            </div>
                             :
                            <Button type="button" onClick={handleLogin}>LogIn</Button>
                    }
                </ul>
            </article>
        </header>
    )
}