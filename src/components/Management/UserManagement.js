import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../Header/AdminHeader';

const apiBase = `${process.env.REACT_APP_API_URL}/api/user`;

export default function UserManagement() {
  const [jsonInput, setJsonInput] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [userNameInput, setUserNameInput] = useState('');
  const [fullNameInput, setFullNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [birthdayInput, setBirthdayInput] = useState('');
  const [genderInput, setGenderInput] = useState('');
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${apiBase}/findAllUser`);
      if (res.data.errorCode === '00') {
        setUsers(res.data.listData);
      }
    } catch (error) {
      alert('Lỗi khi tải danh sách người dùng');
    }
  };

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleAdd = async () => {
    try {
      // const user = JSON.parse(jsonInput);
      const user = {
      userName: userNameInput.trim(),
      password: passwordInput.trim(),
      fullName: fullNameInput.trim(),
      email: emailInput.trim(),
      birthday: birthdayInput.trim(),
      gender: genderInput
    };
      const res = await axios.post(`${apiBase}/register`, user);
      if (res.data.errorCode === '00') {
        alert('Thêm thành công');
        fetchUsers();
      }
    } catch (err) {
      alert('Lỗi khi thêm người dùng' + err);
    }
  };

  const handleUpdate = async () => {
    try {
      // const user = JSON.parse(jsonInput);
      const user = {
      userID: selectedId,
      userName: userNameInput.trim(),
      password: passwordInput.trim(),
      fullName: fullNameInput.trim(),
      email: emailInput.trim(),
      birthday: birthdayInput.trim(),
      gender: genderInput
    };
      if (!user.userID) {
        alert('Cần có userID để cập nhật');
        return;
      }
      const res = await axios.put(`${apiBase}/updateUser`, user);
      if (res.data.errorCode === '00') {
        alert('Cập nhật thành công');
        fetchUsers();
      }
    } catch (err) {
      alert('Lỗi khi cập nhật người dùng');
    }
  };

  const handleDelete = async () => {
    try {
      // const user = JSON.parse(jsonInput);
      const user = {
      userID: selectedId
    };
      if (!user.userID) {
        alert('Cần có userID để xóa');
        return;
      }
      const res = await axios.delete(`${apiBase}/deleteUser`, { params: { id: user.userID } });
      if (res.data.errorCode === '00') {
        alert('Xóa thành công');
        fetchUsers();
      }
    } catch (err) {
      alert('Lỗi khi xóa người dùng');
    }
  };

  const handleRowClick = (user) => {
    setJsonInput(JSON.stringify(user, null, 2));
    setSelectedId(user.userID);
    setUserNameInput(user.userName);
    setPasswordInput("");
    setFullNameInput(user.fullName);
    setEmailInput(user.email);
    setBirthdayInput(user.birthday);
    setGenderInput(user.gender);
  };

  return (
    <div style={{ padding: 20 }}>
      <AdminHeader/>
      <h2>Quản lý tài khoản người dùng</h2>
      <table>
        <tbody>
          <tr>
          <td>
          ID
          </td>
          <td>
            <input
          type="visible"
          value={selectedId ?? ''}
          readOnly
          style={{ marginLeft: '10px', padding: '5px', width: '500px', background:'white', color:'black' }}/>
          </td>
        </tr>
        <tr>
          <td>
            User Name:
          </td>
          <td>
            <input
              type="text"
              value={userNameInput}
              onChange={(e) => setUserNameInput(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '500px', background:'white', color:'black' }}
            />
          </td>
        </tr>
        <tr>
            <td>Full Name:</td>
            <td><input
              type="text"
              value={fullNameInput}
              onChange={(e) => setFullNameInput(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '500px', background:'white', color:'black' }}
            /></td>
          </tr>
        <tr>
            <td>Password:</td>
            <td><input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '500px', background:'white', color:'black' }}
            /></td>
          </tr>
        <tr>
            <td>Email:</td>
            <td><input
              type="text"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '500px', background:'white', color:'black' }}
            /></td>
          </tr>
        <tr>
            <td>Birthday:</td>
            <td><input
              type="datetime-local"
              value={birthdayInput}
              onChange={(e) => setBirthdayInput(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '500px', background:'white', color:'black' }}
            /></td>
          </tr>
        <tr>
            <td>Gender:</td>
            <td><input
              type="text"
              value={genderInput}
              onChange={(e) => setGenderInput(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '500px', background:'white', color:'black' }}
            /></td>
          </tr>  
        </tbody>
      </table>
      {/* <textarea
        value={jsonInput}
        onChange={handleInputChange}
        rows={10}
        cols={80}
        placeholder='Nhập chuỗi JSON tài khoản'
      /> */}
      <br />
      <button onClick={handleAdd}>Thêm</button>
      <button onClick={handleUpdate}>Sửa</button>
      <button onClick={handleDelete}>Xóa</button>

      <h3>Danh sách tài khoản</h3>
      <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>FullName</th>
            <th>Password</th>
            <th>Email</th>
            <th>Birthday</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr
              key={user.userID}
              onClick={() => handleRowClick(user)}
              style={{ backgroundColor: selectedId === user.userID ? '#eef' : 'white', cursor: 'pointer' }}
            >
              <td>{user.userID}</td>
              <td>{user.userName}</td>
              <td>{user.fullName}</td>
              <td>{user.password}</td>
              <td>{user.email}</td>
              <td>{user.birthday ? user.birthday.slice(0, 10) : ''}</td>
              <td>{user.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
