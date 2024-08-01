import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import NavBar from "../comp/NavBar"
import { faHistory } from "@fortawesome/free-solid-svg-icons"
import { useFavorites } from "../services/context"
import FavMovie from "../comp/FavMovie"

const HistoryPage = () => {
  const{history,removeFromHistory} = useFavorites();


  return (
    <div className="container">
        <NavBar/>
        <main>
            <div className="mt-20 w-full sm:w-3/4 mx-auto">
                <h1 className="text-3xl my-4"><span>Watch History</span>  <FontAwesomeIcon icon={faHistory}/></h1>
                <hr /><hr />
                <div className="w-full">
                  {history.length>0 ?(
                    <section className="w-full h-screen">
                      {history.map((movie)=>(
                        <FavMovie deleteFav={()=>removeFromHistory(movie.id)} movie={movie}/>
                      ))}
                    </section>
                  )
                 
                  : <h3 className="my-4 mx-2 text-center">You havent't visited any movie page yet.</h3>}
                </div>
            </div>
        </main>
    </div> 
  )
}

export default HistoryPage