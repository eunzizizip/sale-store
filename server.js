const express = require('express');
const mysql = require('mysql2/promise'); // mysql2 패키지 사용
const cors = require('cors'); // CORS 패키지 추가
const bcrypt = require('bcrypt'); // bcrypt 패키지 추가
const app = express();
const port = 5002;

// CORS 설정
app.use(cors()); // 모든 도메인에서의 요청을 허용

// JSON 요청 본문 파싱을 위한 미들웨어
app.use(express.json());

// MySQL 데이터베이스 연결 설정
const dbConfig = {
    host: 'localhost',
    user: 'root', // 자신의 MySQL 사용자명으로 변경
    password: '0826', // 자신의 MySQL 비밀번호로 변경
    database: 'userdb', // 새로 만든 데이터베이스 이름으로 변경
};

// 회원가입 라우트
app.post('/Signup', async (req, res) => {
    const {username, email, password } = req.body;

    try {
        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);

        // 데이터베이스 연결
        const connection = await mysql.createConnection(dbConfig);

        // 사용자 정보를 데이터베이스에 삽입
        const [result] = await connection.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

        // 연결 종료
        await connection.end();

        // 삽입 결과 확인
        if (result.affectedRows > 0) {
            res.json({ success: true, message: '회원가입 성공!' });
        } else {
            res.json({ success: false, message: '회원가입에 실패했습니다.' });
        }
    } catch (error) {
        console.error('회원가입 중 오류 발생:', error);
        res.status(500).json({ success: false, message: '회원가입에 실패했습니다.' });
    }
});

// 로그인 라우트
app.post('/Login', async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('db까지감');
        // 데이터베이스 연결
        const connection = await mysql.createConnection(dbConfig);

        // 이메일로 사용자 검색
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

        // 사용자 존재 여부 확인
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
        }

        const user = rows[0];

        // 비밀번호 확인
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            res.json({ success: true, message: '로그인 성공!' });
        } else {
            res.status(401).json({ success: false, message: '비밀번호가 일치하지 않습니다.' });
        }

        // 연결 종료
        await connection.end();
    } catch (error) {
        console('db 못감');
        console.error('로그인 중 오류 발생:', error);
        res.status(500).json({ success: false, message: '로그인에 실패했습니다.' });
    }
});

// 서버 시작
app.listen(port, () => {
    console.log(`New server running on port ${port}`);
});