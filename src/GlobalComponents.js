// 컴포넌트들
import Components from 'component'
import LayoutComponents from "layout";
import PageComponents from "pages";

// react-icons
import { GiShoppingCart } from 'react-icons/gi'
import {AiFillShop} from  'react-icons/ai'
import { SiShopify } from  'react-icons/si'
import { MdAppRegistration } from  'react-icons/md'


const GlobalComponents = {
    ...Components,
    ...LayoutComponents,
    ...PageComponents,
    GiShoppingCart,
    AiFillShop,
    SiShopify,
    MdAppRegistration
}


export default GlobalComponents