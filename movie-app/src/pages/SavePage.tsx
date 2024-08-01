import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import NavBar from "../comp/NavBar"
import { faBookmark } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import axios from "axios";
import { Movie } from "../App";



const API_KEY = `${import.meta.env.VITE_APP_API_KEY}`;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
});

const SavePage= () => {
    const[trendMovies,setTrendMovies] = useState<Movie[]>([])



      const getMoviesByGenre = async (genreId:number) => {
        const response = await tmdbApi.get(`/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
        setTrendMovies(response.data.results);
      };

      useEffect( () =>{
        getMoviesByGenre(28)


      },[]);
  return (
    <div className="container">
    <NavBar/>
    <main>

        <div className="md:overflow-hidden relative top-20 favorite-main" >
            <h1 className=" text-4xl sm:text-5xl my-3"><span>Save List</span>  <FontAwesomeIcon icon={faBookmark}/></h1>
            <hr /><hr />
            <div className="m-2 w-full ">
            <section className="hidden w-1/2 md:block md:w-2/5 rounded-3xl bg-slate-500 favorite-preview ">
            
            </section>
            <section className=" mx-auto w-11/12 md:overflow-y-auto md:absolute md:top-20 md:left-1/2 h-5/6 favorite-movies-section md:w-1/2 scroll">
                {trendMovies.map((movie)=>(
                   <div className="">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="h-96  cursor-pointer" alt=""/>
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                   </div>
                ))}

            </section>

            </div>
        </div>

    </main>
    </div>

  )
}

export default SavePage