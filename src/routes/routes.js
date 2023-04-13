import {createBrowserRouter} from "react-router-dom";
import GlobalComponents from "GlobalComponents";
const {
    Root,
    Home,
    AllProducts,
    MyCart,
    NewProduct,
    NotFound,
    ProductDetail,
    ProtectedRoute
} = GlobalComponents




 const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement:<NotFound />,
        children: [
            {index: true, element: <Home /> },
            {path: '/products', element: <AllProducts />},
            {
                path: '/products/new',
                element: (
                    <ProtectedRoute requireAdmin={true}>
                        <NewProduct />
                    </ProtectedRoute>
                )
            },
            {path: '/products/:id', element: <ProductDetail />},
            {
                path: '/carts',
                element: (
                        <ProtectedRoute>
                            <MyCart />
                        </ProtectedRoute>
                    )
            },
        ]
    }
])


export default router