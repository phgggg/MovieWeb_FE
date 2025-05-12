import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Nhớ import CSS nếu bạn cần

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      userName: userName,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8888/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok && data.errorCode === "00") {
        // Lưu thông tin người dùng vào localStorage/sessionStorage (hoặc Redux)
        const userData = data.data; // Trích xuất thông tin người dùng từ 'data'
        localStorage.setItem("user", JSON.stringify(userData)); // Lưu thông tin người dùng

        navigate("/homepage"); // Điều hướng đến Homepage
      } else {
        setErrorMessage("Đăng nhập thất bại!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-overlay"></div>
        <div className="login-content">
            <h1 class="sign-in-text">Đăng nhập</h1>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="Email or username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="login-input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
            <button type="submit" className="login-button">
              Đăng nhập
            </button>
          </form>
          <div className="error-message">
            {errorMessage && <p>{errorMessage}</p>}
          </div>

        <p className="mt-4 text-center text-white">
          Chưa có tài khoản?{' '}
          <button onClick={() => navigate('/signup')} className="text-blue-500 hover:underline login-button">Đăng ký</button>
        </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
