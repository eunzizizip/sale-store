const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();
const port = 5002;
const path = require('path');


// CORS 설정
app.use(cors());
app.use(express.json());

// MySQL 데이터베이스 설정
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'rootpw',
    database: 'userdb',
};

// 매장 리스트 가져오기
app.get('/api/stores', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM stores');
        await connection.end();
        res.json({ success: true, stores: rows });
    } catch (error) {
        console.error('매장 조회 실패:', error);
        res.status(500).json({ success: false, message: '매장 조회 실패' });
    }
});

// 리뷰 가져오기
app.get('/api/reviews/:storeId', async (req, res) => {
    const { storeId } = req.params;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM reviews WHERE store_id = ?', [storeId]);
        await connection.end();
        res.json({ success: true, reviews: rows });
    } catch (error) {
        console.error('리뷰 조회 실패:', error);
        res.status(500).json({ success: false, message: '리뷰 조회 실패' });
    }
});

// 리뷰 추가하기
app.post('/api/reviews', async (req, res) => {
    const { storeId, user, content } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'INSERT INTO reviews (store_id, user, content) VALUES (?, ?, ?)',
            [storeId, user, content]
        );
        await connection.end();
        if (result.affectedRows > 0) {
            res.json({ success: true, message: '리뷰 추가 성공!' });
        } else {
            res.json({ success: false, message: '리뷰 추가 실패' });
        }
    } catch (error) {
        console.error('리뷰 추가 실패:', error);
        res.status(500).json({ success: false, message: '리뷰 추가 실패' });
    }
});


// React 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'client/build')));

// React 라우트 처리
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// 서버 실행
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
