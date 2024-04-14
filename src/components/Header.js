import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { useEffect } from 'react';
import { BLUE_AVATAR, NETFLIX_LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { modifyPreferredLanguage} from '../utils/appConfigSlice';

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleSignOutButton = () =>{
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate("/error");
    });
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () =>{
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e) =>{
    dispatch(modifyPreferredLanguage(e.target.value));
  }

  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between'>
        <img className="w-44" src={NETFLIX_LOGO} alt="logo" />
    
    { user && <div className='flex p-2'>

      <select className='p-2 bg-gray-900 text-white m-2' onChange={handleLanguageChange}>
        {
          SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)
        }
      </select>

      <button className='py-2 px-4 mx-4 my-2 rounded-md bg-purple-800 text-white hover:bg-purple-950' onClick={handleGptSearchClick}>GPT Search</button>
      <img className='w-12 h-12' alt="usericon" src={BLUE_AVATAR} />
      {/* <img className='w-12 h-12' alt="usericon" src={user?.photoURL} /> */}

      <button className='font-bold text-white' onClick={handleSignOutButton}>(Sign Out)</button>
    </div> 
    }
    </div>
  )
}

export default Header;