// ReservationSummaryPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReservationSummaryPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { store } = location.state; // StoreDetailPage에서 전달된 매장 정보

    const goBack = () => {
        navigate(-1); // 이전 페이지로 돌아가기
    };

    const goToNext = () => {
        navigate("/details", { state: { store } }); // 상세 페이지로 이동
    };

    return (
        <div className="reservation-summary-page">
            <h2>랜덤메뉴가 담기는 그린백이에요</h2>
            <p>그린백에는 당일 팔리지 않은 상품이 랜덤으로 담기게 된답니다!</p>

            <div className="button-group">
                <button onClick={goBack} className="back-button">이전</button>
                <button onClick={goToNext} className="next-button">다음</button>
            </div>
        </div>
    );
};

export default ReservationSummaryPage;
