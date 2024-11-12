// PaymentPage.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 총 가격 정보 확인
    const { totalPrice } = location.state || { totalPrice: 0 }; // 기본값 설정

    // 결제 완료 함수
    const handlePayment = () => {
        alert('결제가 완료되었습니다. 고객님의 예약이 완료되었습니다');
        navigate('/'); // 결제 완료 후 홈으로 이동 (또는 원하는 페이지로 이동 가능)
    };

    return (
        <div className="payment-page">
            <h2>결제 페이지</h2>
            <p><strong>총 결제 금액:</strong> {totalPrice.toLocaleString()}원</p>
            <p><strong><button onClick={handlePayment} className="payment-button">{totalPrice.toLocaleString()}원 결제</button></strong></p>
        </div>
    );
};

export default PaymentPage;
