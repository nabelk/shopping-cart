import { Link } from 'react-router-dom';

export function ErrorPage() {
    return (
        <>
            <div id='err-page' className='flex flex-col justify-center items-center'>
                <div className='max-w-lg w-full px-4'>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center'>
                        Page not found
                    </h1>
                    <p className='text-lg sm:text-xl md:text-2xl mb-8 text-center'>
                        We are sorry, we could not find the page you requested.
                    </p>
                    <Link
                        to='/'
                        className='px-6 py-3 text-white rounded-lg shadow-lg transition duration-300 ease-in-out'
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </>
    );
}
