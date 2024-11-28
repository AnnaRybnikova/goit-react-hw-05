import './App.css';
import { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage"));
const MovieCast = lazy(() => import("./components/NestedRoutes/MovieCast"));
const MovieReviews = lazy(() => import("./components/NestedRoutes/MovieReviews"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {

  return (
    <div>
      <Header />
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
