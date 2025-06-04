import React from "react";
import MovieDetail from "./components/Movie/MovieDetails";
import SerieDetail from "./components/Serie/SerieDetails";
import Homepage from "./components/Home/Homepage";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/Signup";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MoviePlayer from "./components/Movie/MoviePlayer";
import SeriePlayer from "./components/Serie/SeriePlayer";
import ListByGenre from "./components/Home/ListByGenre";
import SearchResult from "./components/Search/SearchResult";
import ActorList from "./components/Actor/ActorList";
import ActorDetails from "./components/Actor/ActorDetails";
import PlaylistResult from "./components/Playlist/PlaylistResult";
import UserManagement from "./components/Management/UserManagement";
import MediaManagement from "./components/Management/MediaManagement";
import GenreManagement from "./components/Management/GenreManagement";
import ReviewManagement from "./components/Management/ReviewManagement";
function App() {
  return (


    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow bg-gray-100">
          <Routes>
          <Route path="/" element={<div>
          <Login />
        </div>} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/movies/:movieID" element={<MovieDetail />} />
        <Route path="/series/:serieID" element={<SerieDetail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/playMovie/:id" element={<MoviePlayer />} />
        <Route path="/playSerie/:id/:epid" element={<SeriePlayer />} />
        <Route path="/playSerie/:id" element={<SeriePlayer />} />
        <Route path="/genre/:genre" element={<ListByGenre />} />
        <Route path="/search/:key" element={<SearchResult />} />
        <Route path="/actors" element={<ActorList />} />
        <Route path="/actor/:actorName" element={<ActorDetails />} />
        <Route path="/playlist" element={<PlaylistResult/>}/>
        <Route path="/manage/user" element={<UserManagement/>}/>
        <Route path="/manage/media" element={<MediaManagement/>}/>
        <Route path="/manage/genres" element={<GenreManagement/>}/>
        <Route path="/manage/reviews" element={<ReviewManagement/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
