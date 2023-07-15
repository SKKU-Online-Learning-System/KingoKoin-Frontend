export const information = {};

const numberOfStudents = 10;

for (let i = 1; i <= numberOfStudents; i++) {
    const st_grade = Math.floor(Math.random() * (2023 - 2015 + 1)) + 2015; // 2015부터 2023 사이의 랜덤한 값 생성
    const st_degree = Math.random() < 0.5 ? 31 : 71; // 31 또는 71 중 랜덤하게 선택
    const st_id = `${st_grade}${st_degree}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`; // 0부터 9999 사이의 랜덤한 값 생성

  const student = {
    st_id: parseInt(st_id),
    st_name: `학생${i}`,
    st_grade: parseInt(st_grade),
    st_degree: parseInt(st_degree),
    dept: "SW",
    point: Math.floor(Math.random() * 300) + 1, // 1부터 10 사이의 랜덤한 숫자 생성
  };

  const studentKey = `student${i}`;
  information[studentKey] = student;
}
