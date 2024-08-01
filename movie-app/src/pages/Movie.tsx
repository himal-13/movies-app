import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import NavBar from "../comp/NavBar";
import PopularMovies from "../comp/PopularMovies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faHeart } from "@fortawesome/free-solid-svg-icons";
import { useFavorites } from "../services/context";

export interface Genre {
  id: number;
  name: string;
}

interface Movietype {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  title: string;
  popularity: number;
  vote_average: number;
  genre:Genre[]
}

const API_KEY = `${import.meta.env.VITE_APP_API_KEY}`;

const Movie = () => {
  const[movie,setMovie] = useState<Movietype | undefined>(undefined)
  const[relatedMovies,setRelatedMovies] = useState<Movietype[]>([])
  const[error,setError] = useState<String | undefined>(undefined)
  const{isFavorite, addFavorite,removeFavorite, addHistory} = useFavorites();

    const params = useParams();

    const fetchRelatedMovies = async (genreId: number) => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US`);
        setRelatedMovies(response.data.results);
      } catch (e) {
        setError('Failed to fetch related movies.');
      }
    };

   

    useEffect(()=>{
      const getMovie = async()=>{
        try{

        
        
        const response = await  axios.get(`https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${API_KEY}&language=en-US`);

        // .then((res)=>setMovie(res.data)).catch(e=>setError(e.message))
        setMovie(response.data);
        addHistory(response.data);
        if (response.data.genres.length > 0) {
          fetchRelatedMovies(response.data.genres[0].id);
        }

        }catch(e:any){
          setError(e.message)
        }



        }
        getMovie()



    },[params.movieId])

    if(error){
      return (<h1 className="text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Something's wrong: {error}</h1>)
    }

  if (!movie) {
    return <h1 className="text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading...</h1>;
  }

  const handleFavClick=()=>{
    if(isFavorite(movie.id)){
      removeFavorite(movie.id);

    }else{
      addFavorite(movie)

    }

  }
  return (
    <div className="container">
      <NavBar/>
      <main className="w-11/12 flex-col justify-start">
      <main className="relative w-full bg-cover bg-center mt-20 mx-auto" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`, height:'70vh'}}>
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center px-5">
          <section className="text-white p-4 max-w-2xl text-start">
            <h1 className="text-5xl sm:text-7xl font-bold mb-4">{movie.title}</h1>
            <h3 className="text-xl sm:text-3xl font-bold text-blue-500"><span>{movie.release_date.substring(0,4)}</span> | <span>{movie.vote_average.toFixed(1)}</span></h3>
            <p className="my-4">{movie.overview}</p>
            <div className="text-4xl flex gap-4 cursor-pointer"><FontAwesomeIcon icon={faHeart} className={isFavorite(movie.id)?'text-red-600':'text-white'} onClick={()=>handleFavClick()}/> </div>

          </section>
        </div>
        
      </main>
      <PopularMovies movies={relatedMovies} text="Related" />
      </main>

    </div>  )
}

export default Movie