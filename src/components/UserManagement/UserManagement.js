import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiBase = 'http://localhost:8888/api/user';

export default function UserManagement() {
  const [jsonInput, setJsonInput] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

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
      const user = JSON.parse(jsonInput);
      const res = await axios.post(`${apiBase}/register`, user);
      if (res.data.errorCode === '00') {
        alert('Thêm thành công');
        fetchUsers();
      }
    } catch (err) {
      alert('Lỗi khi thêm người dùng');
    }
  };

  const handleUpdate = async () => {
    try {
      const user = JSON.parse(jsonInput);
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
      const user = JSON.parse(jsonInput);
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
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý tài khoản người dùng</h2>
      <textarea
        value={jsonInput}
        onChange={handleInputChange}
        rows={10}
        cols={80}
        placeholder='Nhập chuỗi JSON tài khoản'
      />
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
            <th>Email</th>
            <th>Birthday</th>
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
              <td>{atobSafe(user.email)}</td>
              <td>{user.birthday ? user.birthday.slice(0, 10) : ''}</td>
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
