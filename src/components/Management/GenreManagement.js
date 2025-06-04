import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../Header/AdminHeader';

const apiBase = `${process.env.REACT_APP_API_URL}/api/genre`;

export default function GenreManagement() {
  const [jsonInput, setJsonInput] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [genreNameInput, setGenreNameInput] = useState('');
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${apiBase}/findAllGenre`);
      if (res.data.errorCode === '00') {
        setGenres(res.data.listData);
      }
    } catch (error) {
      alert('Lỗi khi tải danh sách Genre');
    }
  };

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleAdd = async () => {
    try {
      // const genres = JSON.parse(jsonInput);
      const genres = {
      genreName: genreNameInput.trim(),
    };
      const res = await axios.post(`${apiBase}/addGenre`, genres);
      if (res.data.errorCode === '00') {
        alert('Thêm thành công');
        fetchUsers();
      }
    } catch (err) {
      alert('Lỗi khi thêm Genre');
    }
  };

  const handleUpdate = async () => {
    try {
      // const genres = JSON.parse(jsonInput);
      const genres = {
      genreID: selectedId,
      genreName: genreNameInput.trim(),
    };
      if (!genres.genreID) {
        alert('Cần có genreID để cập nhật');
        return;
      }
      const res = await axios.put(`${apiBase}/updateGenre`, genres);
      if (res.data.errorCode === '00') {
        alert('Cập nhật thành công');
        fetchUsers();
      }
    } catch (err) {
      alert('Lỗi khi cập nhật Genre');
    }
  };

  const handleDelete = async () => {
    try {
      // const genres = JSON.parse(jsonInput);
      const genres = {
      genreID: selectedId,
      genreName: genreNameInput.trim(),
    };
      if (!genres.genreID) {
        alert('Cần có genreID để xóa');
        return;
      }
      const res = await axios.delete(`${apiBase}/deleteGenre/${genres.genreID}`);
      if (res.data.errorCode === '00') {
        alert('Xóa thành công');
        fetchUsers();
      }
    } catch (err) {
      alert('Lỗi khi xóa Genre');
    }
  };

  const handleRowClick = (genre) => {
    setJsonInput(JSON.stringify(genre, null, 2));
    setGenreNameInput(genre.genreName);
    setSelectedId(genre.genreID);
  };

  return (
    <div style={{ padding: 20 }}>
      <AdminHeader/>
      <h2>Quản lý Genre</h2>
      <div style={{ marginBottom: '10px' }}>
        <table>
          <tr>
            <td>ID</td>
            <td><input
          type="text"
          value={selectedId ?? ''}
          readOnly
          style={{ marginLeft: '10px', padding: '5px', width: '500px', background:'white', color:'black' }}
        /></td>
          </tr>
          <tr>
            <td>Genre Name:</td>
            <td><input
            type="text"
            value={genreNameInput}
            onChange={(e) => setGenreNameInput(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', width: '500px', background:'white', color:'black' }}
          /></td>
          </tr>
          
        </table>
      </div>
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

      <h3>Danh sách Genre</h3>
      <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>GenreName</th>

          </tr>
        </thead>
        <tbody>
          {genres.map(genre => (
            <tr
              key={genre.genreID}
              onClick={() => handleRowClick(genre)}
              style={{ backgroundColor: selectedId === genre.genreID ? '#eef' : 'white', cursor: 'pointer' }}
            >
              <td>{genre.genreID}</td>
              <td>{genre.genreName}</td>
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
