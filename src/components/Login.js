import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BLUE_AVATAR, NETFLIX_BACKGROUND_URL } from '../utils/constants';


const Login = () => {

    const email = useRef(null);
    const password = useRef(null);
    const dispatch = useDispatch();

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    function updateProfileHandler(user) {

        updateProfile(user, {
            displayName: user.current.value, photoURL: BLUE_AVATAR
        }).then(() => {
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
        }).catch((error) => {
            setErrorMessage(error.message);
        });
    }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = () => {
        // Validate form data
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);

        if (message) return;

        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfileHandler(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - " + errorMessage);
                });
        }
        else {
            // Sign In
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode + " - " + errorMessage);
                    setErrorMessage("Invalid Credentials!");
                });
        }

    }

    return (
        <>
            <Header />
            <div className='absolute'>
                <img className='' src={NETFLIX_BACKGROUND_URL} alt='background' />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className='absolute p-12 bg-black w-3/12 my-40 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-lg'>
                <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && <input type='text' placeholder='Full Name' className='p-4 my-2 w-full bg-gray-800 rounded-md' />}

                <input type='text' ref={email} placeholder='Email Address' className='p-4 my-2 w-full bg-gray-800 rounded-md' />
                <input type='password' ref={password} placeholder='Password' className='p-4 my-2 w-full bg-gray-800  rounded-md' />

                <p className='py-2 text-red-500 font-bold text-lg'>{errorMessage}</p>

                <button className='p-4 my-10 bg-red-700 w-full  rounded-md' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
                    {isSignInForm ? "New to Netflix? Sign Up Now" : "User Already Exists! Sign In"}
                </p>
            </form>
        </>
    )
}

export default Login;  