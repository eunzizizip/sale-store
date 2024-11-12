// ReservationDetailPage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReservationDetailPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    console.log("location.state:", location.state); // 전체 state 확인
    const { store } = location.state; // 전달받은 매장 정보 (price 포함)

    // store.Discounted_price 값 확인
    console.log("store.discounted_price:", store.discounted_price);

    // 초기 상태 설정
    const [quantity, setQuantity] = useState(1);
    const pricePerItem =parseFloat(store.discounted_price); // DECIMAL 값을 실수로 변환,  NaN일 경우 기본값 0

    // 수량 조절 함수
    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    // 총 가격 계산
    const totalPrice = quantity * pricePerItem;

    // 뒤로 가기 함수
    const goBack = () => navigate(-1);

    // "다음" 버튼 클릭 시 결제 페이지로 이동하는 함수
    const goToPaymentPage = () => {
        navigate('/payment', { state: { totalPrice } }); // `totalPrice` 전달
    };

    return (
        <div className="reservation-detail-page">
            <h2>구매 상세 정보</h2>
            <div className="reservation-details">
                <p><strong>{store.name}</strong></p>
                <p><strong>픽업 시간:</strong> {store.pickupTime}</p>
                <p><strong>가격:</strong> {pricePerItem.toLocaleString()}원 (개당)</p>
            </div>

            <div className="quantity-control">
                <button onClick={decreaseQuantity} className="decrease-button">-</button>
                <span className="quantity">{quantity}</span>
                <button onClick={increaseQuantity} className="increase-button">+</button>
            </div>

            <div className="total-price">
                <p><strong>총 가격:</strong> {totalPrice.toLocaleString()}원</p>
            </div>

            <div className="button-group">
                <button onClick={goBack} className="back-button">이전</button>
                <button onClick={goToPaymentPage} className="next-button">다음</button>
            </div>
        </div>
    );
};

export default ReservationDetailPage;
