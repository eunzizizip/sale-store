import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Kakao from './Kakao';
import Login from './Login';
import StartPage from './StartPage';
import Signup from './Signup'; // 회원가입 페이지
import StoreDetailPage from './StoreDetailPage'; // 새로 만들 상세 페이지 컴포넌트
import ReservationSummaryPage from './ReservationSummaryPage'; // 예약 요약 페이지
import ReservationDetailPage from './ReservationDetailPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/kakao-map" element={<Kakao />} />
                <Route path="/store/:id" element={<StoreDetailPage />} /> {/* 매장 상세 페이지 라우트 */}
                <Route path="/reservation-summary" element={<ReservationSummaryPage />} /> {/* 예약 요약 페이지 */}
                <Route path="/details" element={<ReservationDetailPage />} />
            </Routes>
        </Router>
    );
};

export default App;
