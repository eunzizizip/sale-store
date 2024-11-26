// StoreDetailPage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';

const StoreDetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { store } = location.state; // StartPage에서 전달된 매장 정보

    // 탭 전환을 위한 상태 생성 ('info'를 기본값으로 설정)
    const [selectedTab, setSelectedTab] = useState('info');

    const goToReservationSummary = () => {
        navigate('/reservation-summary', { state: { store } }); // 예약 요약 페이지로 이동
    };

    return (
        <div className="store-detail-page">
            {/* 상단 이미지 섹션 */}
            <div className="store-image-container">
                <img
                    src={store.imageUrl || '/default-store.jpg'} // 가게 이미지 또는 기본 이미지
                    alt={store.name}
                    className="store-image"
                />
            </div>
            <h2>{store.name}</h2>
            <div className="tab-menu">
                {/* 탭 버튼 */}
                <button
                    onClick={() => setSelectedTab('info')}
                    className={selectedTab === 'info' ? 'active' : ''}
                >
                    가게 정보
                </button>
                <button
                    onClick={() => setSelectedTab('reviews')}
                    className={selectedTab === 'reviews' ? 'active' : ''}
                >
                    리뷰
                </button>   
        </div>

        {/* 탭 내용 */}
        <div className="tab-content">
                {selectedTab === 'info' && (
                    <div className="store-info">
                        <p>주소: {store.address}</p>
                        <p>픽업 시간: {store.pickupTime}</p>
                        <button onClick={goToReservationSummary} className="reservation-button">
                            예약하기
                        </button>
                    </div>
                )}
                {selectedTab === 'reviews' && (
                    <div className="store-reviews">
                        <h3>리뷰</h3>
                        {/* 리뷰가 없을 경우 메시지 표시 */}
                        {store.reviews && store.reviews.length > 0 ? (
                            store.reviews.map((review, index) => (
                                <div key={index} className="review">
                                    <p><strong>{review.user}</strong></p>
                                    <p>{review.content}</p>
                                </div>
                            ))
                        ) : (
                            <p>등록된 리뷰가 없습니다.</p>
                        )}
                    </div>
                )}
            </div>
        </div>


    );
};

export default StoreDetailPage;
