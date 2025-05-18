import React, { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import "./MoviePlayer.css";
import Header from "../Header/Header";

const MoviePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const watchTimeRef = useRef(0);
  const totalDurationRef = useRef(0);
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };
  
  const handleRatingHover = (hoveredValue) => {
    setHoveredRating(hoveredValue);
  };
  
  const handleMouseLeave = () => {
    setHoveredRating(0);
  };
  
  // API base URL
  const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api`;

  useEffect(() => {
    // Fetch comments when component mounts
    fetchComments();
  }, [id]);

  // Lưu watch time vào localStorage mỗi 5 giây
  useEffect(() => {
    const saveWatchTimeInterval = setInterval(() => {
      if (watchTimeRef.current > 0) {
        localStorage.setItem(`watchTime_movie_${id}`, watchTimeRef.current.toString());
      }
    }, 5000);

    return () => clearInterval(saveWatchTimeInterval);
  }, [id]);

  useEffect(() => {
    // Fetch movie data
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/movie/findByMovieID/${id}`);
        const data = await response.json();

        if (data.errorCode === "00") {
          setMovie(data.data);
          setLoading(false);
        } else {
          console.error("Error fetching movie details:", data.description);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (!movie || !videoRef.current) return;

    const initializePlayer = () => {
      const video = videoRef.current;
      // Use movie.videoUrl from API or fallback to default
      const source = movie.videoUrl || 'https://3712b2ea.playingmovie.pages.dev/ForrestGump.m3u8';
      
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(source);
        
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          const availableQualities = hls.levels.map((l) => l.height);
          
          const player = new Plyr(video, {
            controls: [
              'play-large',
              'restart',
              'rewind',
              'play',
              'fast-forward',
              'progress',
              'current-time',
              'duration',
              'mute',
              'volume',
              'captions',
              'settings',
              'pip',
              'airplay',
              'download',
              'fullscreen',
            ],
            quality: {
              default: availableQualities[0],
              options: availableQualities,
              forced: true,
              onChange: (e) => updateQuality(e, hls)
            }
          });
          
          playerRef.current = player;
          
          // Lấy tổng thời lượng phim
          player.on('loadedmetadata', () => {
            if (player.duration && player.duration !== Infinity) {
              totalDurationRef.current = player.duration;
            } else if (movie.runtime) {
              // Nếu không lấy được duration từ player, dùng runtime từ API (đổi từ phút sang giây)
              totalDurationRef.current = movie.runtime * 60;
            }
            console.log("Total duration:", totalDurationRef.current);
            
            // Khôi phục thời gian xem từ localStorage (nếu có)
            const savedTime = localStorage.getItem(`watchTime_movie_${id}`);
            if (savedTime) {
              const timeToSeek = parseInt(savedTime, 10);
              if (timeToSeek > 0 && timeToSeek < player.duration - 10) { // Trừ 10 giây để tránh nhảy đến cuối
                player.currentTime = timeToSeek;
              }
            }
          });
          
          // Theo dõi thời gian xem hiện tại
          player.on('timeupdate', () => {
            watchTimeRef.current = Math.floor(player.currentTime);
          });
        });
        
        hls.attachMedia(video);
        window.hls = hls;
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // For Safari
        video.src = source;
      }
    };

    const updateQuality = (newQuality, hls) => {
      hls.levels.forEach((level, levelIndex) => {
        if (level.height === newQuality) {
          hls.currentLevel = levelIndex;
        }
      });
    };

    initializePlayer();
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      if (window.hls) {
        window.hls.destroy();
      }
    };
  }, [movie, id]);

  // Hàm gửi dữ liệu lịch sử xem
  const saveWatchHistory = async () => {
    try {
      // Lấy thông tin user từ localStorage
      const userDataString = localStorage.getItem("user");
      if (!userDataString || !movie || watchTimeRef.current <= 0) {
        console.log("Missing required data for saving history");
        return;
      }
      
      const userData = JSON.parse(userDataString);
      const userId = userData?.userID || userData?.id;
      
      if (!userId) {
        console.log("User ID not found");
        return;
      }
      
      // Tính toán thời lượng đã xem và kiểm tra xem đã hoàn thành chưa
      const watchDuration = watchTimeRef.current;
      const totalDuration = totalDurationRef.current || (movie.runtime ? movie.runtime * 60 : 0);
      const isCompleted = totalDuration > 0 && (watchDuration >= totalDuration * 0.9) ? 1 : 0;
      
      console.log("Saving history:", {
        watchDuration, totalDuration, isCompleted, 
        percentageWatched: totalDuration ? (watchDuration / totalDuration * 100).toFixed(2) + '%' : 'unknown'
      });
      
      // Tạo payload cho API
      const payload = {
        userId: userId,
        movieId: parseInt(id),
        serieId: null,
        episodeId: null,
        watchedAt: new Date().toISOString(),
        watchDuration: watchDuration,
        isCompleted: isCompleted
      };
      
      // Gọi API để lưu lịch sử
      const response = await axios.post(`${API_BASE_URL}/history/add`, payload);
      console.log("Watch history saved successfully", response.data);
      
      // Xóa dữ liệu xem từ localStorage sau khi lưu thành công
      localStorage.removeItem(`watchTime_movie_${id}`);
    } catch (error) {
      console.error("Error saving watch history:", error);
    }
  };

  // Xử lý khi người dùng rời khỏi trang
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Tạo dữ liệu để gửi
      try {
        const userDataString = localStorage.getItem("user");
        if (!userDataString || !movie || watchTimeRef.current <= 0) return;
        
        const userData = JSON.parse(userDataString);
        const userId = userData?.userId || userData?.id;
        if (!userId) return;
        
        const watchDuration = watchTimeRef.current;
        const totalDuration = totalDurationRef.current || (movie.runtime ? movie.runtime * 60 : 0);
        const isCompleted = totalDuration > 0 && (watchDuration >= totalDuration * 0.9) ? 1 : 0;
        
        const payload = {
          userId: userId,
          movieId: parseInt(id),
          serieId: null,
          episodeId: null,
          watchedAt: new Date().toISOString(),
          watchDuration: watchDuration,
          isCompleted: isCompleted
        };
        
        // Sử dụng sendBeacon thay vì axios vì nó đáng tin cậy hơn khi trang đang đóng
        if (navigator.sendBeacon) {
          const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
          navigator.sendBeacon(`${API_BASE_URL}/history/add`, blob);
          console.log("History sent via beacon");
        } else {
          // Fallback to sync XHR for older browsers
          const xhr = new XMLHttpRequest();
          xhr.open('POST', `${API_BASE_URL}/history/add`, false); // false makes it synchronous
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify(payload));
          console.log("History sent via sync XHR");
        }
        
        // Xóa dữ liệu xem từ localStorage
        localStorage.removeItem(`watchTime_movie_${id}`);
      } catch (e) {
        console.error("Error in beforeunload handler:", e);
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Lắng nghe các sự kiện chuyển trang trong React Router
    const unlisten = () => {
      saveWatchHistory();
    };
    
    // Cleanup function
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      saveWatchHistory(); // Gọi khi component unmount
      unlisten();
    };
  }, [id, movie]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/review/findByMovieId/${id}`);
      const data = await response.json();
      
      if (data.errorCode === "00") {
        setComments(data.listData);
      } else {
        console.error("Error fetching comments:", data.description);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    const userData = localStorage.getItem('user');
    
    if (!userData) {
      console.error("User data not found in localStorage");
      // You might want to handle this case (redirect to login, show error, etc.)
      return;
    }
    
    // Parse the JSON string to get the user object
    const userObj = JSON.parse(userData);
    const userID = userObj.userID; // Extract the ID from the user object
    
    if (!userID) {
      console.error("User ID not found in user data");
      return;
    }
    // Prepare the review data
    const reviewData = {
      content: newReview,
      rating: rating,
      timestamp: new Date().toISOString(),
      movie: parseInt(id),
      serie: null,
      user: parseInt(userID)
    };

    try {
      // Send the review to your API
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/review/addReview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      console.log("Review submitted successfully");
      
      // Clear the input after submission
      setNewReview('');
      setRating(0);
      
      // Refresh comments list
      fetchComments();
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "No date";
    return new Date(timestamp).toLocaleString();
  };


  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const { 
    movieName, 
    overview, 
    posterPath, 
    voteAverage, 
    genres, 
    releaseDate, 
    budget, 
    revenue, 
    runtime,
    homepage
  } = movie|| {};

  return (
    <div className="content bg-black">
      <Header className="p-6 bg-gradient-to-b from-black to-transparent absolute w-full">
        <h1 className="text-3xl font-bold">🔥 Netflix Clone</h1>
      </Header>
      <div className="video-container">
        <video ref={videoRef} id="player" controls></video>
      </div>
      
      <div className="dt-content">
        <div className="dt-btn" style={{borderRadius: '10px 0 0 10px'}}>
            <a href={`/movies/${id}`} onClick={(e) => {
              e.preventDefault();
              saveWatchHistory().then(() => {
                window.location.href = `/movies/${id}`;
              });
            }}>
            <i className="fas fa-angle-left"></i>
            <br /> Detail
            </a>
        </div>
        {/* <div className="dt-btn">
            <i className="fas fa-star"></i>
            <br />Rate it
        </div>
        <div className="dt-btn">
            <i className="fas fa-share"></i>
            <br />Share this
        </div>
        <div className="dt-btn">
            <i className="fas fa-heart"></i>
            <br />Favorite
        </div>
        <div className="dt-btn" style={{borderRadius: '0 10px 10px 0'}}>
            <i className="fas fa-lightbulb"></i>
            <br />Off light
        </div> */}
      </div>

      {movie && (
        <div 
          className="inf-mv" 
          style={{
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/w500${movie.posterPath})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white'
          }}
        >
          <img 
            className="poster-image" 
            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} 
            alt={movie.movieName} 
          />
          <div>
            <h1 style={{fontSize: '40px'}} className="slider-text big-title title text-uppercase">
              {movie.movieName}
            </h1>
            <div className="d-flex flex-wrap align-items-center fadeInLeft animated">
              <div className="slider-ratting d-flex align-items-center mr-4 mt-2 mt-md-3">
                <ul className="ratting-start p-0 m-0 list-inline text-primary d-flex align-items-center justify-content-left">
                  {[...Array(4)].map((_, i) => (
                    <li key={i}><i className="fa fa-star"></i></li>
                  ))}
                  <li><i className="fa fa-star-half"></i></li>
                </ul>
                <span className="text-white ml-2">{movie.voteAverage}</span>
              </div>
              <div className="d-flex align-items-center mt-2 mt-md-3">
                <span className="badge badge-secondary p-2">16+</span>
                <span className="ml-3">{movie.runtime} (minutes)</span>
              </div>
            </div>
            <p>{movie.overview}</p>
            <div className="trending-list">
              <div className="text-primary title starring">
                Original name: 
                <span className="text-body">{movie.originalMovieName}</span>
              </div>
              <div className="text-primary title genres">
                Genres: 
                <span className="ml-2">
              {genres.map((genre, index) => (
                <span key={genre.genreID} className="text-red-400">
                  {genre.genreName}
                  {index < genres.length - 1 && ", "}
                </span>
              ))}
            </span>
              </div>
            </div>
          </div>
        </div>
      )}

<div className="all-comments" style={{ marginTop: '100px', position: 'relative', zIndex: 1 }}>
  <p className="tt-cmt text-white text-3xl"><b>Comments</b></p>
  <div className="all-comments-info">
      <div className="agile-info-wthree-box" id="comments-form">
        
        <form onSubmit={handleReviewSubmit}>
          <div className="mb-4">
            <div 
              className="flex items-center space-x-1" 
              onMouseLeave={handleMouseLeave}
            >
              {[...Array(10)].map((_, index) => {
                const ratingValue = index + 1;
                
                return (
                  <button
                    key={ratingValue}
                    type="button"
                    onClick={() => handleRatingClick(ratingValue)}
                    onMouseEnter={() => handleRatingHover(ratingValue)}
                    className="focus:outline-none px-1"
                    aria-label={`Rate ${ratingValue} out of 10`}
                  >
                    <span
                      className={`text-xl transition-colors ${
                        ratingValue <= (hoveredRating || rating)
                          ? 'text-yellow-500'
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  </button>
                );
              })}
              
              <span className="ml-2 text-gray-700 font-medium">
                {hoveredRating || rating || ''} {(hoveredRating || rating) ? '/10' : ''}
              </span>
            </div>
            
            <input 
              type="hidden" 
              name="rating" 
              value={rating} 
            />
          </div>
          <div className="input-box flex items-center justify-center gap-2 mx-auto my-5" style={{ maxWidth: '850px' }}>
            <input
              type="text"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="flex-grow"
              style={{
                height: '40px',
                padding: '0 10px',
              }}
              placeholder="message"
              required
            />
            <button
              type="submit"
              className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md flex items-center"
            >
              <span>Thêm</span>
              <i className="fas fa-paper-plane ml-1"></i>
            </button>
          </div>
        </form>
        <div className="clearfix"></div>
      </div>
      
      {/* Comments Display Section */}
      <div className="comments-section mt-8 mx-auto" style={{ maxWidth: '850px' }}>
        <h3 className="text-xl font-bold mb-4">Comments</h3>
        
        {loading ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.reviewID} className="comment-item bg-gray-100 p-4 mb-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="user-info">
                    <span className="font-medium">{comment.user ? comment.user.username : 'Anonymous'}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      {formatDate(comment.timestamp)}
                    </span>
                  </div>
                  <div className="rating flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span>{comment.rating}/10</span>
                  </div>
                </div>
                <p className="comment-content text-gray-700">{comment.content}</p>
                {comment.movie && (
                  <div className="movie-info text-sm text-gray-500 mt-2">
                    Movie: {comment.movie.movieName}
                  </div>
                )}
                {comment.serie && (
                  <div className="serie-info text-sm text-gray-500 mt-2">
                    Serie: {comment.serie.serieName}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
</div>

    </div>
  );
};

export default MoviePlayer;