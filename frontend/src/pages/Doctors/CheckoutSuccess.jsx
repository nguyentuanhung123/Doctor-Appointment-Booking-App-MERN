import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
    return (
        <div className='bg-gray-100 h-screen'>
            <div className='bg-white md:mx-auto'>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className='text-green-600 w-16 h-16 mx-auto my-6'
                    viewBox="0 0 1024 1024" 
                    version="1.1">
                    <path d="M681.890909 356.072727c11.636364-13.963636 34.909091-16.290909 48.872727-4.654545 13.963636 11.636364 16.290909 34.909091 4.654546 48.872727l-232.727273 276.945455c-11.636364 13.963636-34.909091 16.290909-48.872727 4.654545L302.545455 556.218182c-13.963636-11.636364-16.290909-34.909091-4.654546-48.872727 11.636364-13.963636 34.909091-16.290909 48.872727-4.654546l125.672728 104.727273 209.454545-251.345455zM512 1024C228.072727 1024 0 795.927273 0 512S228.072727 0 512 0s512 228.072727 512 512-228.072727 512-512 512z m0-46.545455c256 0 465.454545-209.454545 465.454545-465.454545S768 46.545455 512 46.545455 46.545455 256 46.545455 512s209.454545 465.454545 465.454545 465.454545z" fill="currentColor"/>
                </svg>
                <div className='text-center'>
                    <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-cneter'>
                        Payment Done!
                    </h3>
                    <p>Have a great day!</p>
                    <div className='py-10 text-center'>
                        <Link
                            to='home'
                            className='px-12 bg-buttonBgColor text-white font-semibold py-3'
                        >
                            Go Back To Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSuccess;