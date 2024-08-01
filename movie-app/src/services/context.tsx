import { createContext, ReactNode, useContext, useState } from "react";
import { Movie } from "../App";

interface FavrioteContextType{
    favorites:Movie[],
    history:Movie[],
    addFavorite:(movie:Movie)=>void,
    removeFavorite:(movieId:number)=>void,
    isFavorite:(movieId:number)=>boolean,
    addHistory:(movie:Movie)=>void,
    removeFromHistory:(movieId:number)=>void,
}



export const favoriteContext = createContext<FavrioteContextType | undefined>(undefined)

interface FavoritesProviderProps {
    children: ReactNode;
  }

const FavoriteProvider:React.FC<FavoritesProviderProps>  = ({children}) => {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [history, setHistory] = useState<Movie[]>([]);



    const addFavorite = (movie: Movie) => {
      setFavorites(prevFavorites => [...prevFavorites, movie]);
    };
  
    const removeFavorite = (movieId: number) => {
      setFavorites(prevFavorites => prevFavorites.filter(movie => movie.id !== movieId));
    };
  
    const isFavorite = (movieId: number):boolean => {
      return favorites.some(movie => movie.id === movieId);
    };

    const addHistory = (movie: Movie): void => {
      setHistory(prevHistory => {
        const existing = prevHistory.find(m => m.id === movie.id);
        if (existing) {
          return prevHistory;
        }
        return [...prevHistory, movie];
      });
    };
  
    const removeFromHistory = (movieId: number): void => {
      setHistory(prevHistory => prevHistory.filter(movie => movie.id !== movieId));
    };

    return (
      <favoriteContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite,addHistory,removeFromHistory,history }}>
        {children}
      </favoriteContext.Provider>
    );
  };



export default FavoriteProvider

export const useFavorites = (): FavrioteContextType => {
    const context = useContext(favoriteContext);
    if (!context) {
      throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
  };