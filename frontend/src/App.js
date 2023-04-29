import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "main/pages/HomePage";
import AvilaBeachPage from "main/pages/Towns/AvilaBeachPage";
import LosAlamosPage from "main/pages/Towns/LosAlamosPage";
import ArroyoGrandePage from "main/pages/Towns/ArroyoGrandePage";

import "bootstrap/dist/css/bootstrap.css";
import RestaurantCreatePage from "main/pages/Restaurants/RestaurantCreatePage";
import RestaurantEditPage from "main/pages/Restaurants/RestaurantEditPage";
import RestaurantIndexPage from "main/pages/Restaurants/RestaurantIndexPage";
import RestaurantDetailsPage from "main/pages/Restaurants/RestaurantDetailsPage";

import BookCreatePage from "main/pages/Books/BookCreatePage";
import BookEditPage from "main/pages/Books/BookEditPage";
import BookIndexPage from "main/pages/Books/BookIndexPage";
import BookDetailsPage from "main/pages/Books/BookDetailsPage";

import MovieCreatePage from "main/pages/Movies/MovieCreatePage";
import MovieEditPage from "main/pages/Movies/MovieEditPage";
import MovieIndexPage from "main/pages/Movies/MovieIndexPage";
import MovieDetailsPage from "main/pages/Movies/MovieDetailsPage";

import ParkCreatePage from "main/pages/Parks/ParkCreatePage";
import ParkEditPage from "main/pages/Parks/ParkEditPage";
import ParkIndexPage from "main/pages/Parks/ParkIndexPage";
import ParkDetailsPage from "main/pages/Parks/ParkDetailsPage";


function App() {

  const reload = () => window.location.reload();

  return (
    <BrowserRouter basename="/team01-s23-5pm-3">
      <Routes>
        <Route path="/storybook-static" onEnter={reload}/>
        <Route exact path="/" element={<HomePage />} />

        <Route exact path="/towns/AvilaBeach" element={<AvilaBeachPage />} />
        <Route exact path="/towns/LosAlamos" element={<LosAlamosPage />} />
        <Route exact path="/towns/ArroyoGrande" element={<ArroyoGrandePage />} />
        
        <Route exact path="/restaurants/create" element={<RestaurantCreatePage />} />
        <Route exact path="/restaurants/edit/:id" element={<RestaurantEditPage />} />
        <Route exact path="/restaurants/details/:id" element={<RestaurantDetailsPage />} />
        <Route exact path="/restaurants/" element={<RestaurantIndexPage />} />

        <Route exact path="/books/create" element={<BookCreatePage />} />
        <Route exact path="/books/edit/:id" element={<BookEditPage />} />
        <Route exact path="/books/details/:id" element={<BookDetailsPage />} />
        <Route exact path="/books/" element={<BookIndexPage />} />

        <Route exact path="/movies/create" element={<MovieCreatePage />} />
        <Route exact path="/movies/edit/:id" element={<MovieEditPage />} />
        <Route exact path="/movies/details/:id" element={<MovieDetailsPage />} />
        <Route exact path="/movies/" element={<MovieIndexPage />} />

        <Route exact path="/parks/create" element={<ParkCreatePage />} />
        <Route exact path="/parks/edit/:id" element={<ParkEditPage />} />
        <Route exact path="/movies/details/:id" element={<ParkDetailsPage />} />
        <Route exact path="/parks/" element={<ParkIndexPage />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
