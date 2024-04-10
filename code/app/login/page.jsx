import Image from 'next/image'

export default function page() {
  return (
    <div className='flex h-screen justify-between flex-col p-4'>
        {/* Logo and title */}
        <div className='flex justify-center items-center flex-col m-auto text-center text-6xl font-semibold drop-shadow-md'>
            CALENDO
            <Image src='/logo.png' width={200} height={200} />
        </div>

        {/* Signin and Signup buttons */}
        <div className='flex p-6 flex-row gap-4 items-center justify-center'>
            <button className='bg-gradient-to-b from-orange-400 to-orange-600 text-white text-2xl font-bold py-2 px-4 rounded-xl min-w-40 min-h-14 shadow-md'>
                Sign In
            </button>
            <button className='bg-gradient-to-b from-sky-400 to-sky-600 text-white text-2xl font-bold py-2 px-4 rounded-xl min-w-40 min-h-14 shadow-md'>
                Sign Up
            </button>
        </div>
    </div>
  )
}

