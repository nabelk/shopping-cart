import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

function ListCartItem({ productData, onClickManageChoosenProduct }) {
    return (
        <li className='flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0'>
            <div className='shrink-0'>
                <img
                    className='h-24 w-24 max-w-full rounded-lg'
                    src={productData.image}
                    alt={productData.title}
                />
            </div>

            <div className='relative flex flex-1 flex-col justify-between'>
                <div className='sm:col-gap-5 sm:grid sm:grid-cols-2'>
                    <div className='pr-8 sm:pr-5'>
                        <p className='text-base font-semibold'>{productData.title}</p>
                    </div>

                    <div className='mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end'>
                        <p className='shrink-0 w-20 text-base font-semibold sm:order-2 sm:ml-8 sm:text-right'>
                            RM{Math.round(productData.price * 3.5) * productData.quantity}
                        </p>

                        <div className='sm:order-1'>
                            <div className='mx-auto flex h-8 items-stretch text-gray-600'>
                                <button
                                    onClick={() =>
                                        productData.quantity > 1
                                            ? onClickManageChoosenProduct(
                                                  productData.id,
                                                  'subtract_quantity',
                                              )
                                            : onClickManageChoosenProduct(productData.id, 'delete')
                                    }
                                    className='flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white'
                                >
                                    -
                                </button>
                                <div className='flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition'>
                                    {productData.quantity}
                                </div>

                                <button
                                    onClick={() =>
                                        onClickManageChoosenProduct(productData.id, 'add_quantity')
                                    }
                                    className='flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white'
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='absolute top-0 right-0 flex sm:bottom-0 sm:top-auto'>
                    <button
                        onClick={() => onClickManageChoosenProduct(productData.id, 'delete')}
                        type='button'
                        className='flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900'
                    >
                        <svg
                            className='h-5 w-5'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M6 18L18 6M6 6l12 12'
                                className=''
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </li>
    );
}

ListCartItem.propTypes = {
    productData: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
    }).isRequired,
    onClickManageChoosenProduct: PropTypes.func.isRequired,
};

export function Cart({ productsInCart, handleChoosenProduct }) {
    const subtotal = Math.round(
        productsInCart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0) * 3.5,
    );

    return (
        <>
            <div id='cart' className='py-8 px-6 md:py-14 sm:px-8 md:px-12 lg:px-24'>
                <div className='sm:mx-auto sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-center'>
                        <h1 className='text-2xl font-semibold'>Your Cart</h1>
                    </div>

                    <div className='mx-auto mt-8 max-w-2xl md:mt-12'>
                        <div className='bg-white shadow'>
                            <div className='px-4 py-6 sm:px-8 sm:py-10'>
                                {productsInCart.length !== 0 ? (
                                    <>
                                        <div className='flow-root'>
                                            <ul className='-my-8'>
                                                {productsInCart.map((product) => (
                                                    <ListCartItem
                                                        key={product.id}
                                                        productData={product}
                                                        onClickManageChoosenProduct={
                                                            handleChoosenProduct
                                                        }
                                                    />
                                                ))}
                                            </ul>
                                        </div>
                                        <div className='mt-6 border-t border-b py-2'>
                                            <div className='flex items-center justify-between'>
                                                <p className='text-sm text-gray-400'>Subtotal</p>
                                                <p className='text-lg font-semibold'>
                                                    RM{subtotal}
                                                </p>
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <p className='text-sm text-gray-400'>Shipping</p>
                                                <p className='text-lg font-semibold'>RM8</p>
                                            </div>
                                        </div>
                                        <div className='mt-6 flex items-center justify-between'>
                                            <p className='text-sm font-medium text-gray-900'>
                                                Total
                                            </p>
                                            <p className='text-2xl font-semibold'>
                                                <span className='text-xs font-normal text-gray-400'>
                                                    MYR
                                                </span>{' '}
                                                {subtotal !== 0 ? subtotal + 8 : '0'}
                                            </p>
                                        </div>
                                        <div className='mt-6 text-center'>
                                            <button
                                                type='button'
                                                className='group inline-flex w-full items-center justify-center rounded-md px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow checkout'
                                            >
                                                Checkout
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    className='group-hover:ml-8 ml-4 h-6 w-6 transition-all'
                                                    fill='none'
                                                    viewBox='0 0 24 24'
                                                    stroke='currentColor'
                                                    strokeWidth='2'
                                                >
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        d='M13 7l5 5m0 0l-5 5m5-5H6'
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className='flex justify-center items-center flex-col gap-4'>
                                        <p className='text-base font-semibold'>
                                            Your Cart is empty
                                        </p>
                                        <Link to='/shop' className='px-4 py-2'>
                                            Shop
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Cart.propTypes = {
    productsInCart: PropTypes.array.isRequired,
    handleChoosenProduct: PropTypes.func.isRequired,
};
