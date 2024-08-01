import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import NavBar from "../comp/NavBar"
import { faFilm } from "@fortawesome/free-solid-svg-icons"
import PopularMovies from "../comp/PopularMovies"
import axios from "axios";
import { useEffect, useState } from "react";
import { Movie } from "../App";



const TVShows = () => {
  const[movies,setMovies] = useState<Movie[]>([])



  useEffect(()=>{
    const fetchMovi =async()=>{
      const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated',{
        params: {
          api_key:`${import.meta.env.VITE_APP_API_KEY}`, 
        }
      })
        setMovies(response.data.results)
        
        
      
        }
        fetchMovi()
      },[])
  return (
    <div className="container">
    <NavBar/>
    <main>
      <div className="mt-20"></div>
      <h1 className="text-4xl md:text-6xl py-2 md:py-6 "><span>Movies</span>  <FontAwesomeIcon icon={faFilm}/></h1>
      <hr /><hr />
      <div className="">
        <PopularMovies text="For You" movies={movies}/>
        {/* <PopularMovies text="crime" movies={crimeMovies}/> */}
      </div>
    </main>
    </div>
  )
}

export default TVShows;