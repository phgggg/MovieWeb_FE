import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("user");
  const [userId, setUserId] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.userName) {
        setUserName(user.userName);
      }
      if (user.userID) {
        setUserId(user.userID);
        if(user.userID === 4){
          setShowMessage(true);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };

  const handleMedia = () => {
    navigate("/manage/media");
  };

    const handleGenre = () => {

    navigate("/manage/genres");
  };
  
  const handleReview = () => {

    navigate("/manage/reviews");
  };

    const handleUser = () => {

    navigate("/manage/user");
  };

  return (
    <nav className="bg-white text-black flex items-center justify-between px-6 py-4">
      <div className="flex space-x-6 text-lg">
        <button onClick={() => navigate("/homepage")} className="px-3 py-1 rounded hover:bg-gray-700 transition-colors duration-200">Trang chủ</button>
        <button 
          onClick={handleMedia} 
          className="px-3 py-1 rounded hover:bg-gray-700 transition-colors duration-200"
        >
          Quản lý phim các loại
        </button>
        <button 
          onClick={handleGenre} 
          className="px-3 py-1 rounded hover:bg-gray-700 transition-colors duration-200"
        >
          Quản lý thể loại phim
        </button>
        <button 
          onClick={handleReview} 
          className="px-3 py-1 rounded hover:bg-gray-700 transition-colors duration-200"
        >
          Quản lý đánh giá
        </button>
        <button 
          onClick={handleUser} 
          className="px-3 py-1 rounded hover:bg-gray-700 transition-colors duration-200"
        >
          Quản lý người dùng
        </button>
      </div>
      
      <div className="relative group">
        <div className="cursor-pointer">
          Welcome, {userName} ▼
        </div>
        
        <div
          className="absolute right-0 mt-2 bg-white text-black rounded shadow-md min-w-[150px] z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
        >
          {showMessage && <button
            onClick={() => navigate("/manage/user")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            Quản lý thông tin người dùng
          </button>}
          <button onClick={() => navigate("/playlist")} className="block w-full text-left px-4 py-2 hover:bg-gray-700">Danh sách yêu thích</button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;