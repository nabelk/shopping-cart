import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { PropTypes } from 'prop-types';

export function Header({ numofProductInCart }) {
    return (
        <header className='flex items-center justify-between sticky z-50 top-0 py-4 px-4 gap-[5px] sm:px-12'>
            <h1 className='w-2/4 text-left text-3xl'>BlissBloom</h1>
            <div className='flex w-2/4 justify-end gap-3 sm:gap-12 '>
                <Link to='/'>Home</Link>
                <Link to='/shop'>Shop</Link>
                <Link to='/cart'>
                    <div className='relative'>
                        <FontAwesomeIcon icon={faShoppingCart} values='9' />
                        {numofProductInCart === 0 ? (
                            ''
                        ) : (
                            <span className='absolute text-xs rounded-[50%] px-[5px] top-[-5px] right-[-10px] bg-white'>
                                {numofProductInCart}
                            </span>
                        )}
                    </div>
                </Link>
            </div>
        </header>
    );
}

Header.propTypes = {
    numofProductInCart: PropTypes.number.isRequired,
};
