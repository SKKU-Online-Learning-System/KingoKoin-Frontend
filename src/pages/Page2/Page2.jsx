import React, { useState } from 'react';
import axios from 'axios';

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('/upload', formData)
      .then((response) => {
        console.log(response.data); // 파일 업로드 성공 시 서버에서 반환한 데이터 처리
      })
      .catch((error) => {
        console.error(error); // 파일 업로드 실패 시 에러 처리
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleUpload}>업로드</button>
    </div>
  );
};

export default FileUploadComponent;
