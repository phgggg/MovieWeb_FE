import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../Header/AdminHeader';

const apiBase = `${process.env.REACT_APP_API_URL}/api`;

export default function MediaManagement() {
  const inputStyle = {
  marginLeft: '10px',
  padding: '5px',
  width: '500px',
  background: 'white',
  color: 'black'
};
  const [movieDrop, setMovieDrop] = useState(false);
  const [serieDrop, setSerieDrop] = useState(false);
  const [seasonDrop, setSeasonDrop] = useState(false);
  const [episodeDrop, setEpisodeDrop] = useState(false);

  const [jsonInputMovie, setJsonInputMovie] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [movieName, setMovieName] = useState('');
  const [movieOriginalName, setMovieOriginalName] = useState('');
  const [movieStatus, setMovieStatus] = useState('');
  const [movieReleaseDate, setMovieReleaseDate] = useState('');
  const [movieVoteAverage, setMovieVoteAverage] = useState('');
  const [movieVoteCount, setMovieVoteCount] = useState('');
  const [moviePopularity, setMoviePopularity] = useState('');
  const [movieRuntime, setMovieRuntime] = useState('');
  const [movieBackdropPath, setMovieBackdropPath] = useState('');
  const [movieBudget, setMovieBudget] = useState('');
  const [movieHomepage, setMovieHomepage] = useState('');
  const [movieOriginalLanguage, setOriginalLanguage] = useState('');
  const [movieOverview, setMovieOverview] = useState('');
  const [moviePosterPath, setMoviePosterPath] = useState('');
  const [movieRevenue, setMovieRevenue] = useState('');
  const [movieTagline, setMovieTagline] = useState('');
  const [movieTags, setMovieTags] = useState('');

  const [jsonInputSerie, setJsonInputSerie] = useState('');
  const [series, setSeries] = useState([]);
  const [selectedSerieId, setSelectedSerieId] = useState(null);
  const [serieName, setSerieName] = useState('');
  const [serieOriginalName, setSerieOriginalName] = useState('');
  const [serieStatus, setSerieStatus] = useState('');
  const [serieFirstAirDate, setSerieFirstAirDate] = useState('');
  const [serieLastAirDate, setSerieLastAirDate] = useState('');
  const [serieVoteAverage, setSerieVoteAverage] = useState('');
  const [serieVoteCount, setSerieVoteCount] = useState('');
  const [seriePopularity, setSeriePopularity] = useState('');
  const [serieNumberOfSeasons, setSerieNumberOfSeasons] = useState('');
  const [serieNumberOfEpisodes, setSerieNumberOfEpisodes] = useState('');
  const [serieBackdropPath, setSerieBackdropPath] = useState('');
  const [serieBudget, setSerieBudget] = useState('');
  const [serieHomepage, setSerieHomepage] = useState('');
  const [serieOriginalLanguage, setSerieOriginalLanguage] = useState('');
  const [serieOverview, setSerieOverview] = useState('');
  const [seriePosterPath, setSeriePosterPath] = useState('');
  const [serieRevenue, setSerieRevenue] = useState('');
  const [serieTagline, setSerieTagline] = useState('');
  const [serieTags, setSerieTags] = useState('');
  const [serieType, setSerieType] = useState('');


  const [jsonInputEpisode, setJsonInputEpisode] = useState('');
  const [episode, setEpisode] = useState([]);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(null);
  const [episodeName, setEpisodeName] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [episodeOverview, setEpisodeOverview] = useState('');
  const [episodePosterPath, setEpisodePosterPath] = useState('');
  const [episodeTrailer, setEpisodeTrailer] = useState('');
  const [episodeVoteAverage, setEpisodeVoteAverage] = useState('');
  const [episodeVoteCount, setEpisodeVoteCount] = useState('');
  const [episodeRuntime, setEpisodeRuntime] = useState('');
  const [episodeSeasonID, setEpisodeSeasonID] = useState('');
  const [episodeSerieID, setEpisodeSerieID] = useState('');


  const [jsonInputSeason, setJsonInputSeason] = useState('');
  const [season, setSeason] = useState([]);
  const [selectedSeasonId, setSelectedSeasonId] = useState(null);
  const [seasonName, setSeasonName] = useState('');
  const [seasonNumber, setSeasonNumber] = useState('');
  const [seasonOverview, setSeasonOverview] = useState('');
  const [seasonPosterPath, setSeasonPosterPath] = useState('');
  const [seasonTrailer, setSeasonTrailer] = useState('');
  const [seasonVoteAverage, setSeasonVoteAverage] = useState('');
  const [seasonVoteCount, setSeasonVoteCount] = useState('');
  const [seasonSerieID, setSeasonSerieID] = useState('');


  useEffect(() => {
    fetchMovies();
    fetchSeries();
    fetchEpisodes();
    fetchSeasons();

  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${apiBase}/movie/findAll`);
      if (res.data.errorCode === '00') {
        setMovies(res.data.listData);
      }
    } catch (error) {
      alert('Lỗi khi tải danh sách movie');
    }
  };

  const fetchSeries = async () => {
    try {
      const res = await axios.get(`${apiBase}/serie/findAll`);
      if (res.data.errorCode === '00') {
        setSeries(res.data.listData);
      }
    } catch (error) {
      alert('Lỗi khi tải danh sách serie');
    }
  };

  const fetchEpisodes = async () => {
    try {
      const res = await axios.get(`${apiBase}/serie/findAllEpisode`);
      if (res.data.errorCode === '00') {
        setEpisode(res.data.listData);
      }
    } catch (error) {
      alert('Lỗi khi tải danh sách ep');
    }
  };

  const fetchSeasons = async () => {
    try {
      const res = await axios.get(`${apiBase}/serie/findAllSeason`);
      if (res.data.errorCode === '00') {
        setSeason(res.data.listData);
      }
    } catch (error) {
      alert('Lỗi khi tải danh sách season');
    }
  };

  const handleMovieInputChange = (e) => {
    setJsonInputMovie(e.target.value);
  };

  const handleSerieInputChange = (e) => {
    setJsonInputSerie(e.target.value);
  };

  const handleEpisodeInputChange = (e) => {
    setJsonInputEpisode(e.target.value);
  };

  const handleSeasonInputChange = (e) => {
    setJsonInputSeason(e.target.value);
  };

  const handleAddMovie = async () => {
    try {
      const movie = {
        movieName: movieName.trim(),
        originalMovieName: movieOriginalName.trim(),
        status: movieStatus.trim(),
        tagline: movieTagline.trim(),
        overview: movieOverview.trim(),
        homepage: movieHomepage.trim(),
        posterPath: moviePosterPath.trim(),
        backdropPath: movieBackdropPath.trim(),
        originalLanguage: movieOriginalLanguage.trim(),
        budget: movieBudget,
        revenue: movieRevenue,
        releaseDate: movieReleaseDate.trim(),
        voteAverage: movieVoteAverage,
        voteCount: movieVoteCount,
        popularity: moviePopularity,
        runtime: movieRuntime,
        tags: movieTags
      };

      const res = await axios.post(`${apiBase}/movie/addMovie`, movie);
      if (res.data.errorCode === '00') {
        alert('Thêm thành công');
        fetchMovies();
      }
    } catch (err) {
      alert('Lỗi khi thêm movie, '+ err);
    }
  };

  const handleAddSerie = async () => {
    try {
      const serie = {
        serieName: serieName.trim(),
        originalSerieName: serieOriginalName.trim(),
        status: serieStatus.trim(),
        tagline: serieTagline.trim(),
        overview: serieOverview.trim(),
        homepage: serieHomepage.trim(),
        firstAirDate: serieFirstAirDate.trim(),
        lastAirDate: serieLastAirDate.trim(),
        voteAverage: serieVoteAverage,
        voteCount: serieVoteCount,
        popularity: seriePopularity,
        numberOfSeasons: serieNumberOfSeasons,
        numberOfEpisodes: serieNumberOfEpisodes,
        posterPath: seriePosterPath.trim(),
        backdropPath: serieBackdropPath.trim(),
        originalLanguage: serieOriginalLanguage.trim(),
        tags: serieTags.trim(),
        type: serieType.trim()
      };

      const res = await axios.post(`${apiBase}/serie/addSerie`, serie);
      if (res.data.errorCode === '00') {
        alert('Thêm thành công');
        fetchSeries();
      }
    } catch (err) {
      alert('Lỗi khi thêm serie');
    }
  };

  const handleAddEpisode = async () => {
    try {
      const episode = {
        episodeName: episodeName.trim(),
        episodeNumber: episodeNumber,
        overview: episodeOverview.trim(),
        posterPath: episodePosterPath.trim(),
        trailer: episodeTrailer.trim(),
        voteAverage: episodeVoteAverage,
        voteCount: episodeVoteCount,
        runtime: episodeRuntime,
        seasonID: episodeSeasonID,
        serieID: episodeSerieID
      };
      const res = await axios.post(`${apiBase}/serie/addEpisode`, episode);
      if (res.data.errorCode === '00') {
        alert('Thêm thành công');
        fetchSeries();
      }
    } catch (err) {
      alert('Lỗi khi thêm episode');
    }
  };

  const handleAddSeason = async () => {
    try {
      const season = {
        seasonName: seasonName.trim(),
        seasonNumber: seasonNumber,
        overview: seasonOverview.trim(),
        posterPath: seasonPosterPath.trim(),
        trailer: seasonTrailer.trim(),
        voteAverage: seasonVoteAverage,
        voteCount: seasonVoteCount,
        serieID: seasonSerieID
      };
      const res = await axios.post(`${apiBase}/serie/addSeason`, season);
      if (res.data.errorCode === '00') {
        alert('Thêm thành công');
        fetchSeries();
      }
    } catch (err) {
      alert('Lỗi khi thêm season');
    }
  };

  const handleUpdateMovie = async () => {
    try {
      const movie = {
        movieID: selectedMovieId,
        movieName: movieName.trim(),
        originalMovieName: movieOriginalName.trim(),
        status: movieStatus.trim(),
        tagline: movieTagline.trim(),
        overview: movieOverview.trim(),
        homepage: movieHomepage.trim(),
        posterPath: moviePosterPath.trim(),
        backdropPath: movieBackdropPath.trim(),
        originalLanguage: movieOriginalLanguage.trim(),
        budget: movieBudget,
        revenue: movieRevenue,
        releaseDate: movieReleaseDate.trim(),
        voteAverage: movieVoteAverage,
        voteCount: movieVoteCount,
        popularity: moviePopularity,
        runtime: movieRuntime,
        tags: movieTags
      };
      if (!movie.movieID) {
        alert('Cần có movieID để cập nhật');
        return;
      }
      const res = await axios.put(`${apiBase}/movie/updateMovie`, movie);
      if (res.data.errorCode === '00') {
        alert('Cập nhật thành công');
        fetchMovies();
      }
    } catch (err) {
      alert('Lỗi khi cập nhật movie' + err);
    }
  };

  const handleUpdateSerie = async () => {
    try {
      const serie = {
        serieID: selectedSerieId,
        serieName: serieName.trim(),
        originalSerieName: serieOriginalName.trim(),
        status: serieStatus.trim(),
        tagline: serieTagline.trim(),
        overview: serieOverview.trim(),
        homepage: serieHomepage.trim(),
        firstAirDate: serieFirstAirDate.trim(),
        lastAirDate: serieLastAirDate.trim(),
        voteAverage: serieVoteAverage,
        voteCount: serieVoteCount,
        popularity: seriePopularity,
        numberOfSeasons: serieNumberOfSeasons,
        numberOfEpisodes: serieNumberOfEpisodes,
        posterPath: seriePosterPath.trim(),
        backdropPath: serieBackdropPath.trim(),
        originalLanguage: serieOriginalLanguage.trim(),
        tags: serieTags.trim(),
        type: serieType.trim()
      };
      if (!serie.serieID) {
        alert('Cần có serieID để cập nhật');
        return;
      }
      const res = await axios.put(`${apiBase}/serie/updateSerie`, serie);
      if (res.data.errorCode === '00') {
        alert('Cập nhật thành công');
        fetchSeries();
      }
    } catch (err) {
      alert('Lỗi khi cập nhật serie');
    }
  };

  const handleUpdateEpisode = async () => {
    try {
      const episode = {
        episodeID: selectedEpisodeId,
        episodeName: episodeName.trim(),
        episodeNumber: episodeNumber,
        overview: episodeOverview.trim(),
        posterPath: episodePosterPath.trim(),
        trailer: episodeTrailer.trim(),
        voteAverage: episodeVoteAverage,
        voteCount: episodeVoteCount,
        runtime: episodeRuntime,
        seasonID: episodeSeasonID,
        serieID: episodeSerieID
      };
      if (!episode.episodeID) {
        alert('Cần có episodeID để cập nhật');
        return;
      }
      const res = await axios.put(`${apiBase}/serie/updateEpisode`, episode);
      if (res.data.errorCode === '00') {
        alert('Cập nhật thành công');
        fetchEpisodes();
      }
    } catch (err) {
      alert('Lỗi khi cập nhật episode');
    }
  };

  const handleUpdateSeason = async () => {
    try {
      const season = {
        seasonID: selectedSeasonId,
        seasonName: seasonName.trim(),
        seasonNumber: seasonNumber,
        overview: seasonOverview.trim(),
        posterPath: seasonPosterPath.trim(),
        trailer: seasonTrailer.trim(),
        voteAverage: seasonVoteAverage,
        voteCount: seasonVoteCount,
        serieID: seasonSerieID
      };
      if (!season.seasonID) {
        alert('Cần có seasonID để cập nhật');
        return;
      }
      const res = await axios.put(`${apiBase}/serie/updateSeason`, season);
      if (res.data.errorCode === '00') {
        alert('Cập nhật thành công');
        fetchSeasons();
      }
    } catch (err) {
      alert('Lỗi khi cập nhật season');
    }
  };

  const handleDeleteMovie = async () => {
    try {
      if (!selectedMovieId) {
        alert('Cần có movieID để xóa');
        return;
      }
      const res = await axios.delete(`${apiBase}/movie/deleteMovie/${selectedMovieId}`);
      if (res.data.errorCode === '00') {
        alert('Xóa thành công');
        fetchMovies();
      }
    } catch (err) {
      alert('Lỗi khi xóa movie');
    }
  };

  const handleDeleteSerie = async () => {
    try {
      if (!selectedSerieId) {
        alert('Cần có serieID để xóa');
        return;
      }
      const res = await axios.delete(`${apiBase}/serie/deleteSerie/${selectedSerieId}`);
      if (res.data.errorCode === '00') {
        alert('Xóa thành công');
        fetchSeries();
      }
    } catch (err) {
      alert('Lỗi khi xóa serie');
    }
  };

  const handleDeleteEpisode = async () => {
    try {
      if (!selectedEpisodeId) {
        alert('Cần có episodeID để xóa');
        return;
      }
      const res = await axios.delete(`${apiBase}/serie/deleteEpisode/${selectedEpisodeId}`);
      if (res.data.errorCode === '00') {
        alert('Xóa thành công');
        fetchEpisodes();
      }
    } catch (err) {
      alert('Lỗi khi xóa ep');
    }
  };

  const handleDeleteSeason = async () => {
    try {

      if (!selectedSeasonId) {
        alert('Cần có seasonID để xóa');
        return;
      }
      const res = await axios.delete(`${apiBase}/serie/deleteSeason/${selectedSeasonId}`);
      if (res.data.errorCode === '00') {
        alert('Xóa thành công');
        fetchSeasons();
      }
    } catch (err) {
      alert('Lỗi khi xóa season');
    }
  };

  const handleMovieRowClick = (movie) => {
    setJsonInputMovie(JSON.stringify(movie, null, 2));
    setSelectedMovieId(movie.movieID);
    setMovieName(movie.movieName);
    setMovieOriginalName(movie.originalMovieName);
    setMovieStatus(movie.status);
    setMovieReleaseDate(movie.releaseDate);
    setMovieVoteAverage(movie.voteAverage);
    setMovieVoteCount(movie.voteCount);
    setMoviePopularity(movie.popularity);
    setMovieRuntime(movie.runtime);
    setMovieBackdropPath(movie.backdropPath);
    setMovieBudget(movie.budget);
    setMovieHomepage(movie.homepage);
    setOriginalLanguage(movie.originalLanguage);
    setMovieOverview(movie.overview);
    setMoviePosterPath(movie.posterPath);
    setMovieRevenue(movie.revenue);
    setMovieTagline(movie.tagline);
    setMovieTags(movie.tags);
  };

  const handleSerieRowClick = (serie) => {
    setJsonInputSerie(JSON.stringify(serie, null, 2));
    setSelectedSerieId(serie.serieID);
    setSerieName(serie.serieName);
    setSerieOriginalName(serie.originalSerieName);
    setSerieStatus(serie.status);
    setSerieFirstAirDate(serie.firstAirDate);
    setSerieLastAirDate(serie.lastAirDate);
    setSerieVoteAverage(serie.voteAverage);
    setSerieVoteCount(serie.voteCount);
    setSeriePopularity(serie.popularity);
    setSerieNumberOfSeasons(serie.numberOfSeasons);
    setSerieNumberOfEpisodes(serie.numberOfEpisodes);
    setSerieBackdropPath(serie.backdropPath);
    setSerieHomepage(serie.homepage);
    setSerieOriginalLanguage(serie.originalLanguage);
    setSerieOverview(serie.overview);
    setSeriePosterPath(serie.posterPath);
    setSerieTagline(serie.tagline);
    setSerieTags(serie.tags);
    setSerieType(serie.type);

  };

  const handleEpisodeRowClick = (episode) => {
    setJsonInputEpisode(JSON.stringify(episode, null, 2));
    setSelectedEpisodeId(episode.serieID);
    setEpisodeName(episode.episodeName);
    setEpisodeNumber(episode.episodeNumber);
    setEpisodeOverview(episode.overview);
    setEpisodePosterPath(episode.posterPath);
    setEpisodeTrailer(episode.trailer);
    setEpisodeVoteAverage(episode.voteAverage);
    setEpisodeVoteCount(episode.voteCount);
    setEpisodeRuntime(episode.runtime);
    setEpisodeSeasonID(episode.seasonID);
    setEpisodeSerieID(episode.serieID);


  };

  const handleSeasonRowClick = (season) => {
    setJsonInputSeason(JSON.stringify(season, null, 2));
    setSelectedSeasonId(season.serieID);
    setSeasonName(season.seasonName);
    setSeasonNumber(season.seasonNumber);
    setSeasonOverview(season.overview);
    setSeasonPosterPath(season.posterPath);
    setSeasonTrailer(season.trailer);
    setSeasonVoteAverage(season.voteAverage);
    setSeasonVoteCount(season.voteCount);
    setSeasonSerieID(season.serieID);

  };

  const handleMovieDisplay = () =>{
    setMovieDrop(!movieDrop);
  };

  const handleSerieDisplay = () =>{
    setSerieDrop(!serieDrop);
  };

  const handleSeasonDisplay = () =>{
    setSeasonDrop(!seasonDrop);
  };

  const handleEpisodeDisplay = () =>{
    setEpisodeDrop(!episodeDrop);
  };

  return (
    <div style={{ padding: 20 }}>
      <AdminHeader/>
        <h2>Quản lý Phim các loại</h2>
        <button onClick={handleMovieDisplay} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
>Quản lý Movie</button>
        <button onClick={handleSerieDisplay} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
>Quản lý Serie</button>
        <button onClick={handleSeasonDisplay} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
>Quản lý Season</button>
        <button onClick={handleEpisodeDisplay} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
>Quản lý Episode</button>
      {movieDrop && <div style={{overflowX: 'auto' }}>
    <h3>Movie</h3>
    <table>
  <tbody>
    <tr>
      <td>MovieID</td>
      <td>
        <input
          type="visible"
          value={selectedMovieId ?? ''}
          readOnly
          style={{ marginLeft: '10px', padding: '5px', width: '500px', background: 'white', color: 'black' }}
        />
      </td>
    </tr>

    <tr>
      <td>Movie Name</td>
      <td>
        <input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px', width: '500px', background: 'white', color: 'black' }}
        />
      </td>
    </tr>

    <tr>
      <td>Original Movie Name</td>
      <td>
        <input
          type="text"
          value={movieOriginalName}
          onChange={(e) => setMovieOriginalName(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px', width: '500px', background: 'white', color: 'black' }}
        />
      </td>
    </tr>

    <tr>
      <td>Status</td>
      <td>
        <input
          type="text"
          value={movieStatus}
          onChange={(e) => setMovieStatus(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px', width: '500px', background: 'white', color: 'black' }}
        />
      </td>
    </tr>

    <tr>
      <td>Release Date</td>
      <td>
        <input
          type="date"
          value={movieReleaseDate}
          onChange={(e) => setMovieReleaseDate(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px', width: '500px', background: 'white', color: 'black' }}
        />
      </td>
    </tr>

    <tr>
      <td>Vote Average</td>
      <td>
        <input
          type="number"
          step="0.1"
          value={movieVoteAverage}
          onChange={(e) => setMovieVoteAverage(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px', width: '500px', background: 'white', color: 'black' }}
        />
      </td>
    </tr>

    <tr>
      <td>Vote Count</td>
      <td>
        <input
          type="number"
          value={movieVoteCount}
          onChange={(e) => setMovieVoteCount(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px', width: '500px', background: 'white', color: 'black' }}
        />
      </td>
    </tr>

    <tr>
      <td>Popularity</td>
      <td>
        <input
          type="number"
          step="0.1"
          value={moviePopularity}
          onChange={(e) => setMoviePopularity(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px', width: '500px', background: 'white', color: 'black' }}
        />
      </td>
    </tr>

    <tr>
      <td>Runtime (min)</td>
      <td>
        <input
          type="number"
          value={movieRuntime}
          onChange={(e) => setMovieRuntime(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px', width: '500px', background: 'white', color: 'black' }}
        />
      </td>
    </tr>
    
    <tr>
  <td>Backdrop Path</td>
  <td>
    <input
      type="text"
      value={movieBackdropPath}
      onChange={(e) => setMovieBackdropPath(e.target.value)}
      style={{ marginLeft: '10px', padding: '5px', width: '500px', background: 'white', color: 'black' }}
    />
  </td>
</tr>
<tr>
  <td>Budget</td>
  <td>
    <input
      type="number"
      value={movieBudget}
      onChange={(e) => setMovieBudget(e.target.value)}
      style={{ marginLeft: '10px', padding: '5px', width: '500px', background: 'white', color: 'black' }}
    />
  </td>
</tr>
<tr>
  <td>Homepage</td>
  <td>
    <input
      type="text"
      value={movieHomepage}
      onChange={(e) => setMovieHomepage(e.target.value)}
      style={{ marginLeft: '10px', padding: '5px', width: '500px', background: 'white', color: 'black' }}
    />
  </td>
</tr>
<tr>
  <td>Original Language</td>
  <td>
    <input
      type="text"
      value={movieOriginalLanguage}
      onChange={(e) => setOriginalLanguage(e.target.value)}
      style={{ marginLeft: '10px', padding: '5px', width: '500px', background: 'white', color: 'black' }}
    />
  </td>
</tr>
<tr>
  <td>Overview</td>
  <td>
    <input
      type="text"
      value={movieOverview}
      onChange={(e) => setMovieOverview(e.target.value)}
      style={{ marginLeft: '10px', padding: '5px', width: '500px', background: 'white', color: 'black' }}
    />
  </td>
</tr>
<tr>
  <td>Poster Path</td>
  <td>
    <input
      type="text"
      value={moviePosterPath}
      onChange={(e) => setMoviePosterPath(e.target.value)}
      style={{ marginLeft: '10px', padding: '5px', width: '500px', background: 'white', color: 'black' }}
    />
  </td>
</tr>
<tr>
  <td>Revenue</td>
  <td>
    <input
      type="number"
      value={movieRevenue}
      onChange={(e) => setMovieRevenue(e.target.value)}
      style={{ marginLeft: '10px', padding: '5px', width: '500px', background: 'white', color: 'black' }}
    />
  </td>
</tr>
<tr>
  <td>Tagline</td>
  <td>
    <input
      type="text"
      value={movieTagline}
      onChange={(e) => setMovieTagline(e.target.value)}
      style={{ marginLeft: '10px', padding: '5px', width: '500px', background: 'white', color: 'black' }}
    />
  </td>
</tr>
<tr>
  <td>Tags</td>
  <td>
    <input
      type="text"
      value={movieTags}
      onChange={(e) => setMovieTags(e.target.value)}
      style={{ marginLeft: '10px', padding: '5px', width: '500px', background: 'white', color: 'black' }}
    />
  </td>
</tr>

  </tbody>
</table>
      {/* <textarea
        value={jsonInputMovie}
        onChange={handleMovieInputChange}
        rows={10}
        cols={80}
        placeholder='Nhập chuỗi JSON movie'
      /> */}
      <br />
      <button onClick={handleAddMovie} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
>Thêm</button>
      <button onClick={handleUpdateMovie} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
>Sửa</button>
      <button onClick={handleDeleteMovie} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
>Xóa</button>

      <h3>Danh sách Movie</h3>
      <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '10px' }}>
  <thead>
    <tr>
      <th>ID</th>
      <th>Movie Name</th>
      <th>Original Name</th>
      <th>Status</th>
      <th>Release Date</th>
      <th>Vote Avg</th>
      <th>Vote Count</th>
      <th>Popularity</th>
      <th>Runtime</th>
    </tr>
  </thead>
  <tbody>
    {movies.map(movie => (
      <tr
        key={movie.movieID}
        onClick={() => handleMovieRowClick(movie)}
        style={{ backgroundColor: selectedMovieId === movie.movieID ? '#eef' : 'white', cursor: 'pointer' }}
      >
        <td>{movie.movieID}</td>
        <td>{movie.movieName}</td>
        <td>{movie.originalMovieName}</td>
        <td>{movie.status}</td>
        <td>{movie.releaseDate ? movie.releaseDate.slice(0, 10) : ''}</td>
        <td>{movie.voteAverage}</td>
        <td>{movie.voteCount}</td>
        <td>{movie.popularity}</td>
        <td>{movie.runtime} min</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>}

      {serieDrop && <div style={{overflowX: 'auto' }}>
        <h3>Serie</h3>
        <table>
  <tbody>
    <tr>
      <td>SerieID</td>
      <td>
        <input
          type="visible"
          value={selectedSerieId ?? ''}
          readOnly
          style={{ marginLeft: '10px', padding: '5px', width: '500px', background:'white', color:'black' }}
        />
      </td>
    </tr>
    <tr>
      <td>Serie Name</td>
      <td>
        <input type="text" value={serieName} onChange={(e) => setSerieName(e.target.value)} style={inputStyle} />
      </td>
    </tr>
    <tr>
      <td>Original Serie Name</td>
      <td>
        <input type="text" value={serieOriginalName} onChange={(e) => setSerieOriginalName(e.target.value)} style={inputStyle} />
      </td>
    </tr>
    <tr>
      <td>Status</td>
      <td>
        <input type="text" value={serieStatus} onChange={(e) => setSerieStatus(e.target.value)} style={inputStyle} />
      </td>
    </tr>
    <tr>
      <td>First Air Date</td>
      <td>
        <input type="date" value={serieFirstAirDate} onChange={(e) => setSerieFirstAirDate(e.target.value)} style={inputStyle} />
      </td>
    </tr>
    <tr>
      <td>Last Air Date</td>
      <td>
        <input type="date" value={serieLastAirDate} onChange={(e) => setSerieLastAirDate(e.target.value)} style={inputStyle} />
      </td>
    </tr>
    <tr>
      <td>Vote Average</td>
      <td>
        <input type="number" step="0.1" value={serieVoteAverage} onChange={(e) => setSerieVoteAverage(e.target.value)} style={inputStyle} />
      </td>
    </tr>
    <tr>
      <td>Vote Count</td>
      <td>
        <input type="number" value={serieVoteCount} onChange={(e) => setSerieVoteCount(e.target.value)} style={inputStyle} />
      </td>
    </tr>
    <tr>
      <td>Popularity</td>
      <td>
        <input type="number" step="0.1" value={seriePopularity} onChange={(e) => setSeriePopularity(e.target.value)} style={inputStyle} />
      </td>
    </tr>
    <tr>
      <td>Number of Seasons</td>
      <td>
        <input type="number" value={serieNumberOfSeasons} onChange={(e) => setSerieNumberOfSeasons(e.target.value)} style={inputStyle} />
      </td>
    </tr>
    <tr>
      <td>Number of Episodes</td>
      <td>
        <input type="number" value={serieNumberOfEpisodes} onChange={(e) => setSerieNumberOfEpisodes(e.target.value)} style={inputStyle} />
      </td>
    </tr>
    <tr>
      <td>Backdrop Path</td>
      <td>
        <input type="text" value={serieBackdropPath} onChange={(e) => setSerieBackdropPath(e.target.value)} style={inputStyle} />
      </td>
    </tr>
    <tr>
      <td>Homepage</td>
      <td>
        <input type="text" value={serieHomepage} onChange={(e) => setSerieHomepage(e.target.value)} style={inputStyle} />
      </td>
    </tr>
    <tr>
      <td>Original Language</td>
      <td>
        <input type="text" value={serieOriginalLanguage} onChange={(e) => setSerieOriginalLanguage(e.target.value)} style={inputStyle} />
      </td>
    </tr>
    <tr>
      <td>Overview</td>
      <td>
        <input type="text" value={serieOverview} onChange={(e) => setSerieOverview(e.target.value)} style={inputStyle} />
      </td>
    </tr>
    <tr>
      <td>Poster Path</td>
      <td>
        <input type="text" value={seriePosterPath} onChange={(e) => setSeriePosterPath(e.target.value)} style={inputStyle} />
      </td>
    </tr>
    <tr>
      <td>Tagline</td>
      <td>
        <input type="text" value={serieTagline} onChange={(e) => setSerieTagline(e.target.value)} style={inputStyle} />
      </td>
    </tr>
    <tr>
      <td>Tags</td>
      <td>
        <input type="text" value={serieTags} onChange={(e) => setSerieTags(e.target.value)} style={inputStyle} />
      </td>
    </tr>
    <tr>
      <td>Type</td>
      <td>
        <input type="text" value={serieType} onChange={(e) => setSerieType(e.target.value)} style={inputStyle} />
      </td>
    </tr>

  </tbody>
</table>

            {/* <textarea
        value={jsonInputSerie}
        onChange={handleSerieInputChange}
        rows={10}
        cols={80}
        placeholder='Nhập chuỗi JSON tài khoản'
      /> */}
      <br />
      <button onClick={handleAddSerie} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
>Thêm</button>
      <button onClick={handleUpdateSerie} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
>Sửa</button>
      <button onClick={handleDeleteSerie} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
>Xóa</button>

      <h3>Danh sách Serie</h3>
      <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '10px', overflowX: 'auto', minWidth: '800px'  }}>
  <thead>
    <tr>
      <th>ID</th>
      <th>Serie Name</th>
      <th>Original Name</th>
      <th>Status</th>
      <th>First Air Date</th>
      <th>Last Air Date</th>
      <th>Vote Avg</th>
      <th>Vote Count</th>
      <th>Popularity</th>
      <th>Seasons</th>
      <th>Episodes</th>
      <th>Backdrop Path</th>
      <th>Budget</th>
      <th>Homepage</th>
      <th>Original Language</th>
      <th>Overview</th>
      <th>Poster Path</th>
      <th>Revenue</th>
      <th>Tagline</th>
      <th>Tags</th>
      <th>Type</th>
      <th>Number Of Episodes</th>
    </tr>
  </thead>
  <tbody>
    {series.map(serie => (
      <tr
        key={serie.serieID}
        onClick={() => handleSerieRowClick(serie)}
        style={{ backgroundColor: selectedSerieId === serie.serieID ? '#eef' : 'white', cursor: 'pointer' }}
      >
        <td>{serie.serieID}</td>
        <td>{serie.serieName}</td>
        <td>{serie.originalSerieName}</td>
        <td>{serie.status}</td>
        <td>{serie.firstAirDate ? serie.firstAirDate.slice(0, 10) : ''}</td>
        <td>{serie.lastAirDate ? serie.lastAirDate.slice(0, 10) : ''}</td>
        <td>{serie.voteAverage}</td>
        <td>{serie.voteCount}</td>
        <td>{serie.popularity}</td>
        <td>{serie.numberOfSeasons}</td>
        <td>{serie.numberOfEpisodes}</td>
        <td>{serie.backdropPath}</td>
        <td>{serie.budget}</td>
        <td>{serie.homepage}</td>
        <td>{serie.originalLanguage}</td>
        <td>{serie.overview}</td>
        <td>{serie.posterPath}</td>
        <td>{serie.revenue}</td>
        <td>{serie.tagline}</td>
        <td>{serie.tags}</td>
        <td>{serie.type}</td>
        <td>{serie.numberOfEpisodes}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>}

      {seasonDrop && <div style={{overflowX: 'auto' }}>
        <h3>Season</h3>
        <table>
  <tbody>
    <tr>
      <td>SeasonID</td>
      <td><input type="visible" value={selectedSeasonId ?? ''} readOnly style={inputStyle} /></td>
    </tr>
    <tr>
      <td>Season Name</td>
      <td><input type="text" value={seasonName} onChange={(e) => setSeasonName(e.target.value)} style={inputStyle} /></td>
    </tr>
    <tr>
      <td>Season Number</td>
      <td><input type="number" value={seasonNumber} onChange={(e) => setSeasonNumber(e.target.value)} style={inputStyle} /></td>
    </tr>
    <tr>
      <td>Overview</td>
      <td><input type="text" value={seasonOverview} onChange={(e) => setSeasonOverview(e.target.value)} style={inputStyle} /></td>
    </tr>
    <tr>
      <td>Poster Path</td>
      <td><input type="text" value={seasonPosterPath} onChange={(e) => setSeasonPosterPath(e.target.value)} style={inputStyle} /></td>
    </tr>
    <tr>
      <td>Trailer</td>
      <td><input type="text" value={seasonTrailer} onChange={(e) => setSeasonTrailer(e.target.value)} style={inputStyle} /></td>
    </tr>
    <tr>
      <td>Vote Average</td>
      <td><input type="number" step="0.1" value={seasonVoteAverage} onChange={(e) => setSeasonVoteAverage(e.target.value)} style={inputStyle} /></td>
    </tr>
    <tr>
      <td>Vote Count</td>
      <td><input type="number" value={seasonVoteCount} onChange={(e) => setSeasonVoteCount(e.target.value)} style={inputStyle} /></td>
    </tr>
    <tr>
      <td>SerieID</td>
      <td><input type="text" value={seasonSerieID} onChange={(e) => setSeasonSerieID(e.target.value)} style={inputStyle} /></td>
    </tr>
  </tbody>
</table>

            {/* <textarea
        value={jsonInputSeason}
        onChange={handleSeasonInputChange}
        rows={10}
        cols={80}
        placeholder='Nhập chuỗi JSON season'
      /> */}
      <br />
      <button onClick={handleAddSeason} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
>Thêm</button>
      <button onClick={handleUpdateSeason} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
>Sửa</button>
      <button onClick={handleDeleteSeason} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
>Xóa</button>

      <h3>Danh sách Season</h3>
<table border="1" cellPadding="8" style={{ width: '100%', marginTop: '10px' }}>
  <thead>
    <tr>
      <th>ID</th>
      <th>Season Name</th>
      <th>Season Number</th>
      <th>Overview</th>
      <th>Poster Path</th>
      <th>Trailer</th>
      <th>Vote Avg</th>
      <th>Vote Count</th>
      <th>Serie</th>
    </tr>
  </thead>
  <tbody>
    {season.map(seasonEntity => (
      <tr
        key={seasonEntity.seasonID}
        onClick={() => handleSeasonRowClick(seasonEntity)}
        style={{
          backgroundColor: selectedSeasonId === seasonEntity.seasonID ? '#eef' : 'white',
          cursor: 'pointer'
        }}
      >
        <td>{seasonEntity.seasonID}</td>
        <td>{seasonEntity.seasonName}</td>
        <td>{seasonEntity.seasonNumber}</td>
        <td>{seasonEntity.overview}</td>
        <td>{seasonEntity.posterPath}</td>
        <td>{seasonEntity.trailer}</td>
        <td>{seasonEntity.voteAverage}</td>
        <td>{seasonEntity.voteCount}</td>
        <td>{seasonEntity.serieID}</td>
      </tr>
    ))}
  </tbody>
</table>


      </div>}

      {episodeDrop && <div style={{overflowX: 'auto' }}>
        <h3>Episode</h3>
        <table>
  <tbody>
    <tr>
      <td>EpisodeID</td>
      <td>
        <input type="visible" value={selectedEpisodeId ?? ''} readOnly style={inputStyle} />
      </td>
    </tr>
    <tr>
      <td>Episode Name</td>
      <td><input type="text" value={episodeName} onChange={(e) => setEpisodeName(e.target.value)} style={inputStyle} /></td>
    </tr>
    <tr>
      <td>Episode Number</td>
      <td><input type="number" value={episodeNumber} onChange={(e) => setEpisodeNumber(e.target.value)} style={inputStyle} /></td>
    </tr>
    <tr>
      <td>Overview</td>
      <td><input type="text" value={episodeOverview} onChange={(e) => setEpisodeOverview(e.target.value)} style={inputStyle} /></td>
    </tr>
    <tr>
      <td>Poster Path</td>
      <td><input type="text" value={episodePosterPath} onChange={(e) => setEpisodePosterPath(e.target.value)} style={inputStyle} /></td>
    </tr>
    <tr>
      <td>Trailer</td>
      <td><input type="text" value={episodeTrailer} onChange={(e) => setEpisodeTrailer(e.target.value)} style={inputStyle} /></td>
    </tr>
    <tr>
      <td>Vote Average</td>
      <td><input type="number" step="0.1" value={episodeVoteAverage} onChange={(e) => setEpisodeVoteAverage(e.target.value)} style={inputStyle} /></td>
    </tr>
    <tr>
      <td>Vote Count</td>
      <td><input type="number" value={episodeVoteCount} onChange={(e) => setEpisodeVoteCount(e.target.value)} style={inputStyle} /></td>
    </tr>
    <tr>
      <td>Runtime</td>
      <td><input type="number" value={episodeRuntime} onChange={(e) => setEpisodeRuntime(e.target.value)} style={inputStyle} /></td>
    </tr>
    <tr>
      <td>SeasonID</td>
      <td><input type="text" value={episodeSeasonID} onChange={(e) => setEpisodeSeasonID(e.target.value)} style={inputStyle} /></td>
    </tr>
    <tr>
      <td>SerieID</td>
      <td><input type="text" value={episodeSerieID} onChange={(e) => setEpisodeSerieID(e.target.value)} style={inputStyle} /></td>
    </tr>
  </tbody>
</table>

            {/* <textarea
        value={jsonInputEpisode}
        onChange={handleEpisodeInputChange}
        rows={10}
        cols={80}
        placeholder='Nhập chuỗi JSON ep'
      /> */}
      <br />
      <button onClick={handleAddEpisode} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
>Thêm</button>
      <button onClick={handleUpdateEpisode} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
>Sửa</button>
      <button onClick={handleDeleteEpisode} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
>Xóa</button>

      <h3>Danh sách Episode</h3>
<table border="1" cellPadding="8" style={{ width: '100%', marginTop: '10px' }}>
  <thead>
    <tr>
      <th>ID</th>
      <th>Episode Name</th>
      <th>Episode Number</th>
      <th>Overview</th>
      <th>Poster Path</th>
      <th>Trailer</th>
      <th>Vote Avg</th>
      <th>Vote Count</th>
      <th>Runtime</th>
      <th>Season</th>
      <th>Serie</th>
    </tr>
  </thead>
  <tbody>
    {episode.map(episodeEntity => (
      <tr
        key={episodeEntity.episodeID}
        onClick={() => handleEpisodeRowClick(episodeEntity)}
        style={{
          backgroundColor: selectedEpisodeId === episodeEntity.episodeID ? '#eef' : 'white',
          cursor: 'pointer'
        }}
      >
        <td>{episodeEntity.episodeID}</td>
        <td>{episodeEntity.episodeName}</td>
        <td>{episodeEntity.episodeNumber}</td>
        <td>{episodeEntity.overview}</td>
        <td>{episodeEntity.posterPath}</td>
        <td>{episodeEntity.trailer}</td>
        <td>{episodeEntity.voteAverage}</td>
        <td>{episodeEntity.voteCount}</td>
        <td>{episodeEntity.runtime}</td>
        <td>{episodeEntity.seasonID}</td>
        <td>{episodeEntity.serieID}</td>
      </tr>
    ))}
  </tbody>
</table>


      </div>}

    </div>
  );
}

// Decode email base64 an toàn
const atobSafe = (encoded) => {
  try {
    return atob(encoded || '');
  } catch {
    return '';
  }
};
