import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {


    const email = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    function updateProfileHandler(user) {

        updateProfile(user, {
            displayName: user.current.value, photoURL: "https://avatars.githubusercontent.com/u/50500905?s=400&u=9f954e57ace556d3451f14c2dc18ae34a0693056&v=4"
        }).then(() => {
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
            navigate("/browse");
        }).catch((error) => {
            // An error occurred
            // ...
            setErrorMessage(error.message);
        });
    }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = () => {
        // Validate form data
        const message = checkValidData(email.current.value, password.current.value);
        console.log(password.current.value);
        setErrorMessage(message);

        if (message) return;

        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfileHandler(user);
                    console.log(user);
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
                    console.log(user);
                    navigate("/browse");
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
                <img className='' src='https://assets.nflxext.com/ffe/siteui/vlv3/c0b69670-89a3-48ca-877f-45ba7a60c16f/2642e08e-4202-490e-8e93-aff04881ee8a/IN-en-20240212-popsignuptwoweeks-perspective_alpha_website_large.jpg' alt='background' />
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