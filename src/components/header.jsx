import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export function Header() {
    return (
        <header className='flex items-center justify-between sticky z-50 top-0 px-12 py-4'>
            <h1 className='w-2/4 text-left'>BlissBloom</h1>
            <div className='flex w-2/4 justify-end gap-12 '>
                <Link to='/'>Home</Link>
                <Link to='/shop'>Shop</Link>
                <Link to='/cart'>
                    <FontAwesomeIcon icon={faShoppingCart} />
                </Link>
            </div>
        </header>
    );
}
