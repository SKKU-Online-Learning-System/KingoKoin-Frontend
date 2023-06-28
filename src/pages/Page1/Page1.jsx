import React, { useState, useEffect  } from 'react';
import { information } from '../../dummy';

const StudentCoinPage = () => {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [coinValue, setCoinValue] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [studentCoin, setStudentCoin] = useState(0);
  const [coinHistory, setCoinHistory] = useState([]);

  //코인 수가 유지되도록 useEffect를 사용해보았는데 어차피 서버 연결하기 전까지는 소용 없을듯

  useEffect(() => { 
    const coinHistoryData = localStorage.getItem('coinHistory');
    if (coinHistoryData) {
      setCoinHistory(JSON.parse(coinHistoryData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('coinHistory', JSON.stringify(coinHistory));
  }, [coinHistory]);

  const handleStudentIdChange = (event) => {
    setStudentId(event.target.value);
  };

  const handleCoinValueChange = (event) => {
    setCoinValue(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleStudentLookup = () => {
    const student = Object.values(information).find((data) => data.id === parseInt(studentId));

    if (student) {
      setStudentName(student.name);
      setStudentCoin(student.coin);
      setError('');
    } else {
      setStudentName('');
      setStudentCoin(0);
      setError('잘못된 학번입니다.');
    }
  };

  const handleGrantCoins = () => {
    const student = Object.values(information).find((data) => data.id === parseInt(studentId));

    if (student) {
      const newCoin = student.coin + parseInt(coinValue);
      student.coin = newCoin;

      setStudentName(student.name);
      setCoinValue('');
      setStudentCoin(newCoin);

      const newCoinHistory = {
        date: new Date().toLocaleString(),
        content: content,
        studentId: studentId,
        coinValue: parseInt(coinValue),
      };
      setCoinHistory([newCoinHistory, ...coinHistory]);

      console.log(`부여된 코인: ${coinValue}, 학생의 현재 코인: ${newCoin}`);
    }
  };

  return (
    <div className='pb-10'>
      <div className="text-2xl font-bold mb-2 pt-10 p-5">학생 코인 부여</div>

      <div className="max-w-md mx-auto bg-white shadow-lg p-10 rounded-lg">
        <div className="mb-4">
          <div className="flex">
            <input
              type="text"
              id="studentId"
              value={studentId}
              onChange={handleStudentIdChange}
              className="flex-grow border border-gray-300 px-3 py-2 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="학번"
              onMouseEnter={(event) => event.target.placeholder = ''}
              onMouseLeave={(event) => event.target.placeholder = '학번'}
            />
            <button
              onClick={handleStudentLookup}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg min-w-[120px] min-h-[40px]"
            >
              학생 조회
            </button>
          </div>
        </div>
      
        <div className="mb-4">
          <input
            type="text"
            id="studentName"
            value={studentName}
            readOnly
            className="border border-gray-300 px-3 py-2 rounded-lg bg-gray-100 focus:outline-none"
            placeholder="이름"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="coinValue"
            value={coinValue}
            onChange={handleCoinValueChange}
            className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="코인값"
            onMouseEnter={(event) => event.target.placeholder = ''}
            onMouseLeave={(event) => event.target.placeholder = '코인값'}
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="text"
            id="content"
            value={content}
            onChange={handleContentChange}
            className="border border-gray-300 px-3 py-2 rounded-lg flex-grow mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="내용"
            onMouseEnter={(event) => event.target.placeholder = ''}
            onMouseLeave={(event) => event.target.placeholder = '내용'}
          />

          <button
            onClick={handleGrantCoins}
            className="bg-green-500 text-white px-4 py-2 rounded-lg min-w-[120px] min-h-[40px]"
          >
            코인 부여
          </button>
        </div>


      {error && <p className="text-red-500 mt-2">{error}</p>}
      {studentCoin !== undefined && (
        <p className="mt-4">
          {studentName} 학생의 현재 코인: {studentCoin}
        </p>
      )}
    </div>
    <div>
      <div className="text-2xl font-bold mb-2 pt-10 p-5">코인 주고 받은 기록</div>
      <table className="w-full justify-center">
          <thead className='bg-gray-50'>
            <tr className='text-center'>
              <th>학번</th>
              <th>내용</th>
              <th>코인 수</th>
              <th>시간</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {coinHistory.map((history, index) => (
              <tr key={index}>
                <td>{history.studentId}</td>
                <td>{history.content}</td>
                <td>{history.coinValue}</td>
                <td>{history.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    </div>
  );
};

export default StudentCoinPage;
