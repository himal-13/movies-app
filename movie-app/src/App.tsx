
import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './comp/NavBar'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import SliderMovies from './comp/SliderMovies';

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
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

function App() {
  const[isLoading,setIsLoading] = useState(true);
  const[error,setError]= useState(null)
  const[movies,setMovies] = useState<Movie[]>([])
  const[upComingMovies,setUpcomingMovies] = useState<Movie[]>([])
  const[sliderMovies,setSliderMovies] = useState<Movie[]>([])
  const[currentSliderIndex,setSliderIndex] = useState(0)



  useEffect(() => {
    const fetchMovies= async()=>{
      setIsLoading(true)
      try{
        
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key:`${import.meta.env.VITE_APP_API_KEY}`, 
          }
        });
        const sliderMRensopnse = await axios.get('https://api.themoviedb.org/3/movie/top_rated',{
          params: {
            api_key:`${import.meta.env.VITE_APP_API_KEY}`, 
          }
        })
        const upcomingResponse = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
          params: {
            api_key:`${import.meta.env.VITE_APP_API_KEY}`, 
          }
        });
        setMovies(response.data.results);
        setSliderMovies(sliderMRensopnse.data.results.slice(0,5));
        setUpcomingMovies(upcomingResponse.data.results);
        setIsLoading(false)

      }catch(e:any){
        setError(e.message);
      
      }finally{
      }

    }
    fetchMovies();
    console.log(movies)

  }, []);

  if(isLoading){
    return (
      <div className="text-4xl absolute top-1/2 left-1/2 -transale-x-1/2 -translate-y-1/2">Loading...</div>
    )

  }
  if(error){
    return(
      <div className='text-4xl absolute top-1/2 left-1/2 -transale-x-1/2 -translate-y-1/2'>
        {`Error:${error}`}
      </div>
    )
  }


  return (
    <>
    <div className="container">
    <NavBar/>
    <main>

    <div className={` my-4 flex justify-between items-center  relative top-14  bg-image`} style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500${sliderMovies[currentSliderIndex].backdrop_path})`}} >
    <div className="h-full w-full  absolute z-20 flex justify-between items-center">

    {currentSliderIndex>0?(<span className='text-6xl  cursor-pointer p-2 ' onClick={()=>{setSliderIndex(currentSliderIndex-1); }}><FontAwesomeIcon icon={faAngleLeft}/></span>):(<div></div>)}

    <div className="w-2/3 self-end m-4 movie-details">

      <h2 className='text-5xl sm:text-6xl'>{sliderMovies[currentSliderIndex].title}</h2>
      <h5 className='description'>{`${sliderMovies[currentSliderIndex].overview.substring(0,200)}...`}</h5>
      <h4 className='font-semibold text-3xl text-blue-800 '><span>{sliderMovies[currentSliderIndex].release_date.substring(0,4)}</span> | <span>{sliderMovies[currentSliderIndex].vote_average.toFixed(1)}</span></h4>
    
      </div>
      {currentSliderIndex < 4? <span className='text-6xl cursor-pointer p-2 ' onClick={()=>{setSliderIndex(currentSliderIndex+1); }}><FontAwesomeIcon icon={faAngleRight}/></span>:<div></div>}
    
    </div>
    </div>
    <div className="mt-16"></div>
      <SliderMovies movies={movies} text='Upcoming'/>
      <SliderMovies movies={upComingMovies} text='Popular'/>

    </main>

    </div>



      </>
  )
}

export default App
