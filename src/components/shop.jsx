import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { fetchAPI } from '../api/api';
import { Loading } from './loading';

function ListItem({ productData, onClickChoosenProduct }) {
    const ratingStarsEle = [];
    const rating = Math.floor(productData.rating.rate);
    for (let i = 0; i < 5; i++) {
        ratingStarsEle.push(
            <svg
                key={i}
                className={i < rating ? 'w-4 h-4 text-yellow-300' : 'w-4 h-4 text-gray-600'}
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 22 20'
            >
                <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
            </svg>,
        );
    }

    return (
        <div className='w-full bg-white border border-gray-200 rounded-lg shadow'>
            <img
                className='p-8 rounded-t-lg mx-auto'
                style={{ height: '180px', width: '200px' }}
                src={productData.image}
                alt={productData.title}
            />
            <div className='px-5 pb-5'>
                <h5 className='font-semibold tracking-tight' style={{ height: '100px' }}>
                    {productData.title}
                </h5>
                <div className='flex items-center mt-2.5 mb-5'>
                    <div className='flex items-center space-x-1 rtl:space-x-reverse'>
                        {ratingStarsEle}
                    </div>
                    <span className='bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3'>
                        {productData.rating.rate}
                    </span>
                </div>
                <div className='flex items-center justify-between'>
                    <span className='text-2xl font-bold'>
                        RM {Math.round(productData.price * 3.5)}
                    </span>
                    <button
                        onClick={() => onClickChoosenProduct(productData, !productData.isCart)}
                        className='text-white bg-blue-700 hover:bg-blue-800  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 '
                    >
                        {!productData.isCart ? 'Add to cart' : 'Remove from cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}

ListItem.propTypes = {
    productData: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        rating: PropTypes.shape({
            rate: PropTypes.number.isRequired,
        }).isRequired,
        isCart: PropTypes.bool.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
    onClickChoosenProduct: PropTypes.func.isRequired,
};

export function Shop({ manageChoosenProductInCart, choosenProductInCart }) {
    const [productsData, setProductsData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    function setProducts(response) {
        setProductsData(
            response.map((data) => {
                const checkIsProductInCart = choosenProductInCart.find(
                    (item) => item.id === data.id,
                );
                if (checkIsProductInCart) {
                    return {
                        ...data,
                        isCart: true,
                    };
                }
                return {
                    ...data,
                    isCart: false,
                };
            }),
        );
    }

    useEffect(() => {
        fetchAPI('https://fakestoreapi.com/products')
            .then((response) => setProducts(response))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function manageProductInCart(item, isProductInCart) {
        setProductsData(
            [...productsData].map((product) => {
                if (product.id === item.id) {
                    return {
                        ...product,
                        isCart: isProductInCart,
                    };
                }
                return product;
            }),
        );
        manageChoosenProductInCart(item, isProductInCart);
    }

    if (loading) return <Loading />;
    if (error)
        return <p className='flex items-center justify-center'>A network error was encountered</p>;

    return (
        <div id='shop' className='py-8 px-6 md:py-14 sm:px-8 md:px-12 lg:px-24'>
            <h1 className='text-left mb-5' style={{ fontSize: '1.8rem' }}>
                Products
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {productsData.map((product) => (
                    <ListItem
                        key={product.id}
                        onClickChoosenProduct={manageProductInCart}
                        productData={product}
                    />
                ))}
            </div>
        </div>
    );
}

Shop.propTypes = {
    choosenProductInCart: PropTypes.array.isRequired,
    manageChoosenProductInCart: PropTypes.func.isRequired,
};
