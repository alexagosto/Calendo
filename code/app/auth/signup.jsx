import { useState } from 'react';
import { redirect } from 'next/navigation'

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const validatePassword = () => {
        if(password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        setError('');
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate password
        if(!validatePassword()) {
            return;
        }

        // Add user to localStorage
        localStorage.setItem(email, password);
        localStorage.setItem(email + 'name', name);

        // Set user Session details
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('password', password);
        sessionStorage.setItem(email + 'name', name);

        //redirect to home page
        window.location.href = '/';  
    };

    return (
        <form 
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 w-full'
        >
                <input 
                type="text" 
                value={name} 
                onChange={handleNameChange} 
                placeholder='Your Name'
                className='w-full p-2 rounded-lg border-2 border-gray-300 shadow-md h-10'
                />

                <input 
                type="email" 
                value={email} 
                onChange={handleEmailChange} 
                placeholder='Email'
                className='w-full p-2 rounded-lg border-2 border-gray-300 shadow-md h-10'
                />

                <input 
                type="password" 
                value={password} 
                onChange={handlePasswordChange}
                placeholder='Password'
                className='w-full p-2 rounded-lg border-2 border-gray-300 shadow-md h-10' 
                />

                <input 
                type="password" 
                value={confirmPassword} 
                onChange={handleConfirmPasswordChange} 
                placeholder='Confirm Password'
                className='w-full p-2 rounded-lg border-2 border-gray-300 shadow-md h-10'
                />
            {error && <p className='text-red-500 text-sm'>{error}</p>}
            <button 
            type="submit"
            className='w-full bg-gradient-to-b from-sky-400 to-sky-600 text-white text-2xl font-bold py-2 px-4 rounded-xl min-h-16 shadow-md'
            >
                Sign Up
            </button>
        </form>
    );
}

export default Signup;