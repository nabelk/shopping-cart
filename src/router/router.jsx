import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../components/home';
import { Shop } from '../components/shop';
import { Header } from '../components/header';
import { Cart } from '../components/cart';
import { ErrorPage } from '../components/errorpage';
import { Github } from '../components/github';

const Router = () => {
    const [choosenProduct, setChoosenProduct] = useState([]);

    function manageChoosenProduct(product, isProductInCart) {
        if (isProductInCart)
            return setChoosenProduct([
                ...choosenProduct,
                { ...product, isCart: true, quantity: 1 },
            ]);
        return setChoosenProduct([...choosenProduct].filter((item) => item.id !== product.id));
    }

    function handleChoosenProductFromCart(id, handletype) {
        switch (handletype) {
            case 'delete':
                setChoosenProduct([...choosenProduct].filter((item) => item.id !== id));
                break;
            case 'add_quantity':
                setChoosenProduct(
                    [...choosenProduct].map((product) => {
                        if (product.id === id)
                            return { ...product, quantity: product.quantity + 1 };
                        return { ...product };
                    }),
                );
                break;
            case 'subtract_quantity':
                setChoosenProduct(
                    [...choosenProduct].map((product) => {
                        if (product.id === id)
                            return { ...product, quantity: product.quantity - 1 };
                        return { ...product };
                    }),
                );
                break;
        }
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <>
                    <Header numofProductInCart={choosenProduct.length} />
                    <Home />
                    <Github isHomeOrErr={true} />
                </>
            ),
            errorElement: (
                <>
                    <Header numofProductInCart={choosenProduct.length} />
                    <ErrorPage />
                    <Github isHomeOrErr={true} />
                </>
            ),
        },
        {
            path: 'shop',
            element: (
                <>
                    <Header numofProductInCart={choosenProduct.length} />
                    <Shop
                        manageChoosenProductInCart={manageChoosenProduct}
                        choosenProductInCart={choosenProduct}
                    />
                    <Github isHomeOrErr={false} />
                </>
            ),
        },
        {
            path: 'cart',
            element: (
                <>
                    <Header numofProductInCart={choosenProduct.length} />
                    <Cart
                        productsInCart={choosenProduct}
                        handleChoosenProduct={handleChoosenProductFromCart}
                    />
                    <Github isHomeOrErr={false} />
                </>
            ),
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
