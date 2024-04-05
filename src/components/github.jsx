import { PropTypes } from 'prop-types';

export function Github({ isHomeOrErr }) {
    return (
        <div
            className={
                !isHomeOrErr
                    ? 'fixed bottom-1 right-1 p-0 md:p-2 lg:p-3'
                    : 'fixed bottom-1 right-1 p-3'
            }
        >
            <a href='https://github.com/nabelk' title='Check my github profile'>
                <img
                    src='/svg/github-logo.svg'
                    className={
                        !isHomeOrErr
                            ? 'w-[18px] h-[18px] sm:w-[24px] sm:h-[24px] md:w-[30px] md:h-[30px]'
                            : ''
                    }
                    alt='github logo'
                />
            </a>
        </div>
    );
}

Github.propTypes = {
    isHomeOrErr: PropTypes.bool.isRequired,
};
