import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../Header/AdminHeader';

const apiBase = `${process.env.REACT_APP_API_URL}/api/review`;

export default function ReviewManagement() {
  const [jsonInput, setJsonInput] = useState('');
  const [review, setReview] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [contentInput, setContentInput] = useState('');
  const [ratingInput, setRatingInput] = useState('');
  const [timestampInput, setTimestampInput] = useState('');
  const [movieInput, setMovieInput] = useState('');
  const [serieInput, setSerieInput] = useState('');
  const [userInput, setUserInput] = useState('');
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${apiBase}/findAll`);
      if (res.data.errorCode === '00') {
        setReview(res.data.listData);
      }
    } catch (error) {
      alert('Lỗi khi tải danh sách Review');
    }
  };

  const handleInputChange = (e) => {

    setJsonInput(e.target.value);
  };

  const handleAdd = async () => {
    try {
      // const review = JSON.parse(jsonInput);
      const review = {
        content: contentInput.trim(),
        rating: ratingInput,
        timestamp: timestampInput.trim(),
        movie: movieInput,
        serie: serieInput,
        user: userInput
      }
      const res = await axios.post(`${apiBase}/addReview`, review);
      if (res.data.errorCode === '00') {
        alert('Thêm thành công');
        fetchReviews();
      }
    } catch (err) {
      alert('Lỗi khi thêm Review');
    }
  };

  const handleUpdate = async () => {
    try {
      // const review = JSON.parse(jsonInput);
      const review = {
        reviewID: selectedId,
        content: contentInput.trim(),
        rating: ratingInput,
        timestamp: timestampInput.trim(),
        movie: movieInput,
        serie: serieInput,
        user: userInput
      }
      if (!review.reviewID) {
        alert('Cần có reviewID để cập nhật');
        return;
      }
      const res = await axios.put(`${apiBase}/updateReview`, review);
      if (res.data.errorCode === '00') {
        alert('Cập nhật thành công');
        fetchReviews();
      }
    } catch (err) {
      alert('Lỗi khi cập nhật Review');
    }
  };

  const handleDelete = async () => {
    try {
      // const review = JSON.parse(jsonInput);
      const review = {
        reviewID: selectedId
      }
      if (!review.reviewID) {
        alert('Cần có reviewID để xóa');
        return;
      }
      const res = await axios.delete(`${apiBase}/deleteReview/${selectedId}`);
      if (res.data.errorCode === '00') {
        alert('Xóa thành công');
        fetchReviews();
      }
    } catch (err) {
      alert('Lỗi khi xóa Review');
    }
  };

  const handleRowClick = (e) => {
    const parsed = e;
    if(parsed.user && parsed.user.userID){
      parsed.user = parsed.user.userID;
    }

    if(parsed.movie && parsed.movie.movieID){
      parsed.movie = parsed.movie.movieID;
    }

    if(parsed.serie && parsed.serie.serieID){
      parsed.serie = parsed.serie.serieID;
    }
    setJsonInput(JSON.stringify(parsed, null, 2));
    setSelectedId(e.reviewID);
    setContentInput(e.content);
    setRatingInput(e.rating);
    setTimestampInput(e.timestamp);
    setMovieInput(e.movie);
    setSerieInput(e.serie);
    setUserInput(e.user);
  };

  return (
    <div style={{ padding: 20 }}>
      <AdminHeader/>
      <h2>Quản lý Review</h2>
      <table>
        <tbody>
          <tr>
            <td>ID</td>
            <td><input
          type="visible"
          value={selectedId ?? ''}
          readOnly
          style={{ marginLeft: '10px', padding: '5px', width: '500px', background:'white', color:'black' }}/></td>
          </tr>
          <tr>
            <td>Content</td>
            <td><input
              type="text"
              value={contentInput}
              onChange={(e) => setContentInput(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '500px', background:'white', color:'black' }}
            /></td>
          </tr>
          <tr>
            <td>Rating</td>
            <td><input
              type="text"
              value={ratingInput}
              onChange={(e) => setRatingInput(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '500px', background:'white', color:'black' }}
            /></td>
          </tr>
          <tr>
            <td>Timestamp</td>
            <td><input
              type="text"
              value={timestampInput}
              onChange={(e) => setTimestampInput(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '500px', background:'white', color:'black' }}
            /></td>
          </tr>
          <tr>
            <td>Movie</td>
            <td><input
              type="text"
              value={movieInput}
              onChange={(e) => setMovieInput(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '500px', background:'white', color:'black' }}
            /></td>
          </tr>
          <tr>
            <td>Serie</td>
            <td><input
              type="text"
              value={serieInput}
              onChange={(e) => setSerieInput(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '500px', background:'white', color:'black' }}
            /></td>
          </tr>
          <tr>
            <td>User</td>
            <td><input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
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
        placeholder='Nhập chuỗi JSON Review'
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
      <th>Content</th>
      <th>Rating</th>
      <th>Timestamp</th>
      <th>Movie</th>
      <th>Serie</th>
      <th>User</th>
    </tr>
  </thead>
  <tbody>
    {review.map(reviewEntity => (
      <tr
        key={reviewEntity.reviewID}
        onClick={() => handleRowClick(reviewEntity)}
        style={{ backgroundColor: selectedId === reviewEntity.reviewID ? '#eef' : 'white', cursor: 'pointer' }}
      >
        <td>{reviewEntity.reviewID}</td>
        <td>{reviewEntity.content}</td>
        <td>{reviewEntity.rating}</td>
        <td>{reviewEntity.timestamp}</td>
        <td>{reviewEntity.movie ? reviewEntity.movie.movieID : 'NA'}</td>
        <td>{reviewEntity.serie ? reviewEntity.serie.serieID : 'NA'}</td>
        <td>{reviewEntity.user ? reviewEntity.user.userID : 'NA' }</td>
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
