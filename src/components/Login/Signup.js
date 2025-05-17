import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    fullName: "",
    birthday: "",
    gender: "",
    profileImage: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const requestBody = {
      ...formData,
      birthday: formData.birthday ? `${formData.birthday}T00:00:00` : null,
      gender: formData.gender ? parseInt(formData.gender) : null
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      const result = await response.json();
      if (result.errorCode === "00") {
        const userid = result.data;
        const addNewPlaylist = await fetch(`${process.env.REACT_APP_API_URL}/api/playlist/addNewPlaylist/` + userid, {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });
        const addNewPlaylistResult = await addNewPlaylist.json();
        if(addNewPlaylistResult.errorCode === "00"){
          alert("Sign up successful!");
          navigate("/"); // Redirect to homepage
        }
        else{
          alert("add playlist for user failed");
        }
      } else {
        alert("Signup failed: " + result.description);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="sign-in-text">Đăng ký</h1>
        <form onSubmit={handleSignUp}>
          <input type="text" name="userName" placeholder="Username *" value={formData.userName} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password *" value={formData.password} onChange={handleChange} required />
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
          <input type="date" name="birthday" placeholder="Birthday" value={formData.birthday} onChange={handleChange} />
          {/* <input type="number" name="gender" placeholder="Gender (1: Male, 2: Female)" value={formData.gender} onChange={handleChange} /> */}
          <div>
            <label>Giới tính: </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="1"
                checked={formData.gender === '1' || formData.gender === 1}
                onChange={handleChange}
              />
              Nam
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="2"
                checked={formData.gender === '2' || formData.gender === 2}
                onChange={handleChange}
              />
              Nữ
            </label>
          </div>

          {/* <input type="text" name="profileImage" placeholder="Profile Image URL" value={formData.profileImage} onChange={handleChange} /> */}
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />

          <button type="submit" className="login-button">Đăng ký</button>
        </form>

        <p className="mt-4 text-center text-white">
        Đã có tài khoản?{' '}
          <button onClick={() => navigate('/login')} className="text-blue-500 hover:underline login-button">Đăng nhập</button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
