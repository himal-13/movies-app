import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TrendingPage from './pages/TrendingPage.tsx';
import Favorite from './pages/Favorite.tsx';
import SavePage from './pages/SavePage.tsx';
import MoviesPage from './pages/MoviesPage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import HistoryPage from './pages/HistoryPage.tsx';
import Movie from './pages/Movie.tsx';
import FavoriteProvider from './services/context.tsx';
import TVShows from './pages/TVshows.tsx';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement:<ErrorPage/>
  },
  {
    path:'/trending',
    element:<TrendingPage/>,
    errorElement:<ErrorPage/>
    
  },
  {
    path:'/favoritesmovies',
    element:<Favorite />,
    errorElement:<ErrorPage/>

  },
  {
    path:"/movies",
    element:<MoviesPage/>,
    errorElement:<ErrorPage/>


  },
  {
    path:'/savedmovies',
    element:<SavePage/>,
    errorElement:<ErrorPage/>


  },

  {
    path:'/history',
    element:<HistoryPage/>,
    errorElement:<ErrorPage/>
  },
  {
    path:'/tvshows',
    element:<TVShows/>,
    errorElement:<ErrorPage/>

  },
  {
    path:'/movie/:movieId',
    element:<Movie/>
  }



])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FavoriteProvider>
    <RouterProvider router={router}/>
    </FavoriteProvider>
  </React.StrictMode>,
)
