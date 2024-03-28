import { Link } from 'react-router-dom';

export function Home() {
    return (
        <div id='home'>
            <section className='w-3/4'>
                <h1>Welcome to BlissBloom!</h1>
                <p className='text-3xl'>
                    Where convenience meets quality. Discover a curated collection of essentials and
                    delights, all in one place. Elevate your shopping experience with us today.
                </p>
                <Link to='shop'>
                    <button className='text-2xl'>SHOP</button>
                </Link>
            </section>
        </div>
    );
}
