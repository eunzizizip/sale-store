// StoreDetailPage.jsx
import React from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';

const StoreDetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { store } = location.state; // StartPage에서 전달된 매장 정보

    const goToReservationSummary = () => {
        navigate('/reservation-summary'); // 예약 요약 페이지로 이동
    };

    return (
        <div className="store-detail-page">
            <h2>{store.name}</h2>
            <p>주소: {store.address}</p>
            <p>픽업 시간: {store.pickupTime}</p>
            <button onClick={goToReservationSummary} className="reservation-button">예약하기</button>
        </div>
    );
};

export default StoreDetailPage;
