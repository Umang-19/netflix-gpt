import { useDispatch } from "react-redux";
import { GET_NOW_PLAYING_MOVIES_URL } from "../utils/constants";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {

    const dispatch = useDispatch();

    const getNowPlayingMovies = async () =>{
      const data = await fetch(GET_NOW_PLAYING_MOVIES_URL, API_OPTIONS)
      const json = await data.json();
      console.log(json.results);
      dispatch(addNowPlayingMovies(json.results));
    };
  
    useEffect(()=>{
      getNowPlayingMovies();  
    }, []);
  
}

export default useNowPlayingMovies;