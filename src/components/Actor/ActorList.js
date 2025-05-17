import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Film, User, Heart } from 'lucide-react';
import Header from '../Header/Header';

const ActorAvatar = ({ profilePath, actorName }) => {
  if (profilePath && profilePath !== "NULL") {
    return (
      <img 
        src={`https://image.tmdb.org/t/p/w500${profilePath}`} 
        alt={actorName} 
        className="w-full h-60 object-cover rounded-t-lg"
      />
    );
  }
  
  return (
    <div className="w-full h-60 bg-gray-200 flex items-center justify-center rounded-t-lg">
      <User size={64} className="text-gray-400" />
    </div>
  );
};

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

const ActorCard = ({ actor }) => {
  return (
    <Link to={`/actor/${encodeURIComponent(actor.actorName)}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300">
        <ActorAvatar profilePath={actor.profilePath} actorName={actor.actorName} />
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-800 truncate">{actor.actorName}</h3>
            <GenderLabel gender={actor.gender} />
          </div>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <Heart className="w-4 h-4 mr-1" />
            <span>Độ phổ biến: {actor.popularity}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Film className="w-4 h-4 mr-1" />
            <span>{actor.knownForDepartment || "Không có thông tin"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ActorList = () => {
  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/actor/findAllActors`);
        const data = await response.json();
        
        if (data.errorCode === "00") {
          setActors(data.listData);
        } else {
          setError(`Lỗi: ${data.description}`);
        }
      } catch (err) {
        setError("Không thể kết nối đến API. Vui lòng kiểm tra lại server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchActors();
  }, []);

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
      </div>
    );
  }

  return (
    <div className="bg-black">
      <Header/>
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Danh sách diễn viên</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {actors.map(actor => (
          <ActorCard key={actor.actorID} actor={actor} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default ActorList;