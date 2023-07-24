import React, { useState, useEffect } from "react";
import { information } from "../../dummy";
import * as xlsx from "xlsx";
import ConfirmDialog from "../../components/ConfirmDialog";
import { TextField, MenuItem } from "@mui/material";
import GiveKoinCard, { ExcelCard } from "./Koins";
import { UserPointHistory } from "../Dashboard/Dashboard";

const StudentCoinPage = () => {
  // 입력할 정보 하나로 일원화 (stId, stName, title, provider, plus, point)
  const [studentId, setStudentId] = useState(""); // 학번
  const [studentName, setStudentName] = useState(""); // 학생 이름
  const [coinValue, setCoinValue] = useState(""); // 코인 부여 값
  const [content, setContent] = useState(""); // 정책명

  const [error, setError] = useState(""); // 에러 메세지
  const [studentCoin, setStudentCoin] = useState(0); // 학생 보유 코인량

  const [coinHistory, setCoinHistory] = useState([]); // 코인 부여 내역
  const [uploadedData, setUploadedData] = useState([]); // 엑셀파일
  const [InputData, setInputData] = useState([]); // 코인 부여 내역 (겹치는 것 같다.)

  const [showModal, setShowModal] = useState(false); // 확인 모달
  const [pendingGrantHistory, setPendingGrantHistory] = useState([]); // ??
  const [customContent, setCustomContent] = useState(""); // 직접 입력

  const contentOptions = [
    { label: "화상 강연", value: "화상 강연", coinValue: "5" },
    { label: "IT 강연", value: "IT 강연", coinValue: "10" },
    { label: "특강", value: "특강", coinValue: "15" },
    { label: "직접입력", value: "직접입력", coinValue: "" },
  ];

  // 수동 코인 부여 내역
  useEffect(() => {
    const coinHistoryData = localStorage.getItem("coinHistory");
    if (coinHistoryData) {
      setCoinHistory(JSON.parse(coinHistoryData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("coinHistory", JSON.stringify(coinHistory));
  }, [coinHistory]);

  // 학번 입력
  const handleStudentIdChange = (event) => {
    setStudentId(event.target.value);
  };

  // 코인값 입력
  const handleCoinValueChange = (event) => {
    const value = event.target.value;
    setCoinValue(value);

    if (content === "직접입력") {
      setCustomContent(value);
    }
  };

  // 정책명 입력
  const handleContentChange = (selectedOption) => {
    if (selectedOption) {
      const { value, coinValue } = selectedOption;
      // 직접입력 여부
      if (value === "직접입력") {
        setContent(value);
        setCoinValue("");
      } else {
        setContent(value);
        setCoinValue(coinValue || "");
      }
    } else {
      // 존재하지 않는 정책명
      setContent("");
      setCoinValue("");
    }
  };

  // 학번 Validation
  const handleStudentLookup = () => {
    // 입력값이 올바르지 확인
    if (!studentId || isNaN(studentId)) {
      setStudentName("");
      setStudentCoin(0);
      setError("학번을 올바르게 입력해주세요.");
      return;
    }

    // DB로부터 학번이 일치하는 학생 정보 찾기
    const student = Object.values(information).find(
      (data) => data.st_id === parseInt(studentId)
    );

    // 해당 학번을 가진 학생이 존재하는지 여부
    if (student) {
      setStudentName(student.st_name);
      setStudentCoin(student.point);
      setError("");
    } else {
      setStudentName("");
      setStudentCoin(0);
      setError("잘못된 학번입니다.");
    }
  };

  // 모달 띄우기
  const handleGrantCoins = () => {
    setShowModal(true);
  };

  // 모달 확인 ->
  const confirmGrantCoins = () => {
    // 학번 Validation
    const student = Object.values(information).find(
      (data) => data.st_id === parseInt(studentId)
    );

    // 코인 부여값 Validation
    if (!coinValue || isNaN(parseInt(coinValue))) {
      setShowModal(false);
      return;
    }

    if (student) {
      // 학생 부여 코인량 DB 반영
      const newCoin = student.point + parseInt(coinValue);
      student.point = newCoin;

      // 입력폼 초기화
      setStudentName(student.st_name);
      setCoinValue("");
      setStudentCoin(newCoin);

      // 코인내역 DB에 저장
      const newCoinHistory = {
        date: new Date().toLocaleString(),
        content: content === "직접입력" ? customContent : content,
        studentId: studentId,
        coinValue: parseInt(coinValue),
      };
      setCoinHistory([newCoinHistory, ...coinHistory]);
      setInputData([newCoinHistory, ...InputData]);

      console.log(`부여된 코인: ${coinValue}, 학생의 현재 코인: ${newCoin}`);
    }

    setShowModal(false);
  };

  // 모달 취소
  const cancelGrantCoins = () => {
    setShowModal(false);
    setPendingGrantHistory([]);
  };

  // 엑셀 파일 업로드
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      // 엑셀 -> JSON 파싱
      const data = new Uint8Array(e.target.result);
      const workbook = xlsx.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(worksheet);

      const uploadedData = [];

      jsonData.forEach((row) => {
        const studentId = row["학번"];
        const content = row["내용"];
        const coinValue = row["코인 수"];
        const time = row["시간"];

        // 학번 Validation
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
          console.log(
            `부여된 코인: ${coinValue}, 학생의 현재 코인: ${newCoin}`
          );
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
        <div className="">
          <div className="text-2xl font-bold mb-2 pb-5">학생 코인 부여</div>
          <div className="bg-white rounded-lg shadow-lg p-10">
            <div className="mb-4">
              <input
                type="text"
                id="studentId"
                value={studentId}
                onChange={handleStudentIdChange}
                className="flex-grow border border-gray-300 px-2 py-2 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="학번"
                onMouseEnter={(event) => (event.target.placeholder = "")}
                onMouseLeave={(event) => (event.target.placeholder = "학번")}
              />

              <button
                onClick={handleStudentLookup}
                className="bg-primary text-gray-50 px-4 py-2 rounded-lg min-w-[120px] min-h-[40px]"
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
                className="border border-gray-300 px-2 py-2 rounded-lg bg-gray-100 focus:outline-none"
                placeholder="이름"
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center">
                <div className="flex-grow mr-2">
                  <TextField
                    select
                    defaultValue={contentOptions[0].value}
                    label="정책"
                    onChange={handleContentChange}
                  >
                    {contentOptions.map((it) => (
                      <MenuItem key={it.value} value={it.value}>
                        {it.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                {content === "직접입력" && (
                  <div className="flex-grow">
                    <input
                      type="text"
                      id="customContent"
                      className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="내용 입력"
                      onMouseEnter={(event) => (event.target.placeholder = "")}
                      onMouseLeave={(event) =>
                        (event.target.placeholder = "내용 입력")
                      }
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <input
                type="text"
                id="coinValue"
                value={coinValue}
                onChange={handleCoinValueChange}
                className="border border-gray-300 px-2 mr-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="코인값"
                onMouseEnter={(event) => (event.target.placeholder = "")}
                onMouseLeave={(event) => (event.target.placeholder = "코인값")}
              />
              <button
                onClick={handleGrantCoins}
                className="bg-primary text-gray-50 px-4 py-2 rounded-lg min-w-[120px] min-h-[40px]"
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
        </div>

        <div className="pl-12">
          <div className="text-2xl font-bold pb-10">엑셀 파일 업로드</div>
          <div className="mt-4">
            <input
              type="file"
              id="fileUpload"
              onChange={handleFileUpload}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none"
            />
            {uploadedData.length > 0 && (
              <table className="pl-20 table-auto">
                <thead className="bg-primary text-gray-200">
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
      </div>

      <div>
        <div className="text-2xl font-bold pb-5 pl-10 pt-10">
          코인 주고 받은 기록
        </div>
        <div className="pl-12">
          <table className="pl-20">
            <thead className="bg-primary text-gray-200">
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
              {InputData.map((data, index) => (
                <tr key={index}>
                  <td>{data.studentId}</td>
                  <td>{data.content}</td>
                  <td>{data.coinValue}</td>
                  <td>{data.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmDialog
        open={showModal}
        handleConfirm={confirmGrantCoins}
        handleCancel={cancelGrantCoins}
      >
        코인을 부여하시겠습니까?
      </ConfirmDialog>
    </div>
  );
};

export default StudentCoinPage;
