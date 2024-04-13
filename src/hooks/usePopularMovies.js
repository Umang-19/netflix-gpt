import { useDispatch } from "react-redux";
import { GET_POPULAR_MOVIES_URL } from "../utils/constants";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addPopularMovies} from "../utils/movieSlice";

const usePopularMovies = () => {

    const dispatch = useDispatch();

    const getPopularMovies = async () =>{
      const data = await fetch(GET_POPULAR_MOVIES_URL, API_OPTIONS)
      const json = await data.json();
      dispatch(addPopularMovies(json.results));
    };
  
    useEffect(()=>{
      getPopularMovies();  
    }, []);
  
}

export default usePopularMovies;