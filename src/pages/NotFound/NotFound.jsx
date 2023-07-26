import React from "react";

const NotFound = () => {
  const handleButtonClick = () => {
    window.location.href = "/";
  };

  return (
    <div>
      <h1>404</h1>
      <p>존재하지 않는 페이지입니다</p>
      <button onClick={handleButtonClick}>처음 화면으로 돌아가기</button>
    </div>
  );
};

export default NotFound;
