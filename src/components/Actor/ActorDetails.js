import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Film, Tv, User, Calendar, MapPin, Book, Heart } from 'lucide-react';
import Header from '../Header/Header';

const ActorDetails = () => {
  const { actorName } = useParams();
  const [actor, setActor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8888/api/actor/actorByName/${encodeURIComponent(actorName)}`);
        const data = await response.json();
        
        if (data.errorCode === "00") {
          setActor(data.data);
        } else {
          setError(`Lỗi: ${data.description}`);
        }
      } catch (err) {
        setError("Không thể kết nối đến API. Vui lòng kiểm tra lại server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchActorDetails();
  }, [actorName]);

  // Component hiển thị giới tính
  const GenderLabel = ({ gender }) => {
    let genderText = "Không xác định";
    let bgColor = "bg-gray-400";
    
    if (gender === "1") {
      genderText = "Nữ";
      bgColor = "bg-pink-500";
    } else if (gender === "2") {
      genderText = "Nam";
      bgColor = "bg-blue-500";
    }
    
    return (
      <span className={`${bgColor} text-white text-xs font-medium px-2 py-1 rounded-full`}>
        {genderText}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Lỗi! </strong>
        <span className="block sm:inline">{error}</span>
        <Link to="/actors" className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-block">
          Quay lại
        </Link>
      </div>
    );
  }

  if (!actor) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Thông báo! </strong>
        <span className="block sm:inline">Không tìm thấy thông tin diễn viên.</span>
        <Link to="/actors" className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded inline-block">
          Quay lại
        </Link>
      </div>
    );
  }

  // Format birthday if available
  const formattedBirthday = actor.birthday 
    ? new Date(actor.birthday).toLocaleDateString('vi-VN')
    : "Không có thông tin";

  return (
    <div className="bg-black">
        <Header/>
        <div className="container mx-auto px-4 py-8">
      <Link to="/actors" className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center inline-block">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Quay lại danh sách
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            {actor.profilePath && actor.profilePath !== "NULL" ? (
              <img 
                src={`https://image.tmdb.org/t/p/w500${actor.profilePath}`} 
                alt={actor.actorName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full min-h-64 bg-gray-200 flex items-center justify-center">
                <User size={96} className="text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-800">{actor.actorName}</h1>
              <GenderLabel gender={actor.gender} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-700">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                <span>Độ phổ biến: {actor.popularity}</span>
              </div>
              
              <div className="flex items-center text-gray-700">
                <Film className="w-5 h-5 mr-2 text-blue-500" />
                <span>Bộ phận: {actor.knownForDepartment || "Không có thông tin"}</span>
              </div>
              
              <div className="flex items-center text-gray-700">
                <Calendar className="w-5 h-5 mr-2 text-green-500" />
                <span>Ngày sinh: {formattedBirthday}</span>
              </div>
              
              <div className="flex items-center text-gray-700">
                <MapPin className="w-5 h-5 mr-2 text-purple-500" />
                <span>Nơi sinh: {actor.placeOfBirth !== "NULL" ? actor.placeOfBirth : "Không có thông tin"}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <Book className="w-5 h-5 mr-2 text-yellow-500" />
                Tiểu sử
              </h2>
              <p className="text-gray-700">
                {actor.biography !== "NULL" ? actor.biography : "Không có thông tin tiểu sử."}
              </p>
            </div>
            
            {/* Thông tin bổ sung */}
            {actor.imdbID !== "NULL" && (
              <div className="mb-4">
                <span className="text-sm text-gray-600">IMDB ID: {actor.imdbID}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ActorDetails;