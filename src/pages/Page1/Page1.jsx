import React, { useState, useEffect } from 'react';
import { information } from '../../dummy';
import * as xlsx from 'xlsx';
import Modal from 'react-modal';

const StudentCoinPage = () => {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [coinValue, setCoinValue] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [studentCoin, setStudentCoin] = useState(0);
  const [coinHistory, setCoinHistory] = useState([]);
  const [uploadedData, setUploadedData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pendingGrantHistory, setPendingGrantHistory] = useState([]);

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
    if (!studentId || isNaN(studentId)) {
      setStudentName('');
      setStudentCoin(0);
      setError('학번을 올바르게 입력해주세요.');
      return;
    }

    const student = Object.values(information).find((data) => data.st_id === parseInt(studentId));

    if (student) {
      setStudentName(student.st_name);
      setStudentCoin(student.point);
      setError('');
    } 
    
    else {
      setStudentName('');
      setStudentCoin(0);
      setError('잘못된 학번입니다.');
    }
  };

  const handleGrantCoins = () => {
    setShowModal(true);
  };

  const confirmGrantCoins = () => {
    const student = Object.values(information).find((data) => data.st_id === parseInt(studentId));
  
    if (!coinValue || isNaN(parseInt(coinValue))) {
      setShowModal(false);
      return;
    }
  
    if (student) {
      const newCoin = student.point + parseInt(coinValue);
      student.point = newCoin;
  
      setStudentName(student.st_name);
      setCoinValue('');
      setStudentCoin(newCoin);
  
      const newCoinHistory = {
        date: new Date().toLocaleString(),
        content: content,
        studentId: studentId,
        coinValue: parseInt(coinValue),
      };
  
      setPendingGrantHistory([newCoinHistory, ...pendingGrantHistory]);
      setCoinHistory([newCoinHistory, ...coinHistory]);
      setUploadedData([newCoinHistory, ...uploadedData]);
  
      console.log(`부여된 코인: ${coinValue}, 학생의 현재 코인: ${newCoin}`);
    }
  
    setShowModal(false);
  };
  
 
  const cancelGrantCoins = () => {
    setShowModal(false);
    setPendingGrantHistory([]);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = xlsx.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
  
      const jsonData = xlsx.utils.sheet_to_json(worksheet);
  
      const uploadedData = [];
  
      jsonData.forEach((row) => {
        const studentId = row['학번'];
        const content = row['내용'];
        const coinValue = row['코인 수'];
        const time = row['시간'];
  
        const student = Object.values(information).find(
          (data) => data.st_id === parseInt(studentId)
        );
  
        if (student) {
          const newCoin = student.point + parseInt(coinValue);
          student.point = newCoin;
  
          const newCoinHistory = {
            date: new Date().toLocaleString(),
            content: content,
            studentId: studentId,
            coinValue: parseInt(coinValue),
            time: parseInt(time),
          };
  
          uploadedData.push(newCoinHistory);
          console.log(`부여된 코인: ${coinValue}, 학생의 현재 코인: ${newCoin}`);
          setCoinHistory([newCoinHistory, ...coinHistory]);
        }
      });
      setCoinHistory([...uploadedData.reverse()], ...coinHistory);
      setUploadedData(uploadedData);
    };
  
    reader.readAsArrayBuffer(file);
  };
  

  return (
    <div className="pt-10">
      <div className="flex px-10">
        <div className="basis-1/4">
          <div className="text-2xl font-bold mb-2 pb-5">학생 코인 부여</div>
          <div className="bg-white rounded-lg shadow-lg p-10">
            <div className="mb-4">
              <input
                type="text"
                id="studentId"
                value={studentId}
                onChange={handleStudentIdChange}
                className="flex-grow border border-gray-300 px-3 py-2 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-SKKU_GREEN"
                placeholder="학번"
                onMouseEnter={(event) => (event.target.placeholder = '')}
                onMouseLeave={(event) => (event.target.placeholder = '학번')}
              />
              <button
                onClick={handleStudentLookup}
                className="bg-SKKU_GREEN text-gray-50 px-4 py-2 rounded-lg min-w-[120px] min-h-[40px]"
              >
                학생 조회
              </button>
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
                className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-SKKU_GREEN"
                placeholder="코인값"
                onMouseEnter={(event) => (event.target.placeholder = '')}
                onMouseLeave={(event) => (event.target.placeholder = '코인값')}
              />
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="text"
                id="content"
                value={content}
                onChange={handleContentChange}
                className="border border-gray-300 px-3 py-2 rounded-lg flex-grow mr-2 focus:outline-none focus:ring-2 focus:ring-SKKU_GREEN"
                placeholder="내용"
                onMouseEnter={(event) => (event.target.placeholder = '')}
                onMouseLeave={(event) => (event.target.placeholder = '내용')}
              />

              <button
                onClick={handleGrantCoins}
                className="bg-SKKU_GREEN text-gray-50 px-4 py-2 rounded-lg min-w-[120px] min-h-[40px]"
              >
                코인 부여
              </button>
            </div>

            <div className="mt-4">
              <input
                type="file"
                id="fileUpload"
                onChange={handleFileUpload}
                className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none"
              />
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            {studentCoin !== undefined && (
              <p className="mt-4">
                {studentName} 학생의 현재 코인: {studentCoin}
              </p>
            )}
          </div>
        </div>

        <div className="pl-12">
          <div className="text-2xl font-bold pb-8">업로드한 엑셀 파일</div>
          {uploadedData.length > 0 && (
            <table className="pl-20 table-auto">
              <thead className="bg-SKKU_GREEN text-gray-200">
                <tr className="text-center">
                  <th className="px-12">학번</th>
                  <th className="px-16">내용</th>
                  <th className="px-8">코인 수</th>
                  <th className="px-24">시간</th>
                </tr>
              </thead>
              <tbody className="text-center bg-gray-50">
                {uploadedData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.studentId}</td>
                    <td>{data.content}</td>
                    <td>{data.coinValue}</td>
                    <td>{data.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div>
        <div className="text-2xl font-bold pb-5 pl-10 pt-10">
          코인 주고 받은 기록
        </div>
        <div className="pl-12">
          <table className="pl-20">
            <thead className="bg-SKKU_GREEN text-gray-200">
              <tr className="text-center">
                <th className="px-16">학번</th>
                <th className="px-32">내용</th>
                <th className="px-12">코인 수</th>
                <th className="px-28">시간</th>
              </tr>
            </thead>
            <tbody className="text-center bg-gray-50">
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

      <Modal
        isOpen={showModal}
        className="fixed inset-0 flex items-center justify-center" // Position the modal in the center
        overlayClassName="fixed inset-0 bg-black bg-opacity-50" // Style the overlay
        onRequestClose={() => setShowModal(false)}
        contentLabel="부여 확인"
      >
        <div className="bg-white border border-gray-300 rounded-lg p-8 w-full max-w-md">
          <h2>코인을 부여하시겠습니까?</h2>
          <div className="flex justify-end mt-4">
            <button
              onClick={confirmGrantCoins}
              className="bg-SKKU_GREEN text-gray-50 px-4 py-2 rounded-lg mr-4"
            >
              예
            </button>
            <button
              onClick={cancelGrantCoins}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              아니오
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentCoinPage;
