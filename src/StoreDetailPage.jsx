import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import axios from 'axios';

const StoreDetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { store } = location.state;
    const [selectedTab, setSelectedTab] = useState('info');
    const [reviews, setReviews] = useState([]);
    const [newReviewUser, setNewReviewUser] = useState('');
    const [newReviewContent, setNewReviewContent] = useState('');

    const goToReservationSummary = () => {
        navigate('/reservation-summary', { state: { store } }); // 예약 요약 페이지로 이동
    };

    // 리뷰 가져오기
    useEffect(() => {
        if (selectedTab === 'reviews') {
            axios.get(`/api/reviews/${store.id}`)
                .then((response) => {
                    if (response.data.success) {
                        setReviews(response.data.reviews);
                    }
                })
                .catch((error) => {
                    console.error('리뷰 가져오기 실패:', error);
                });
        }
    }, [selectedTab, store.id]);

    // 리뷰 추가하기
    const handleReviewSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/reviews', {
            storeId: store.id,
            user: newReviewUser,
            content: newReviewContent,
        })
            .then((response) => {
                if (response.data.success) {
                    setReviews([...reviews, { user: newReviewUser, content: newReviewContent }]);
                    setNewReviewUser('');
                    setNewReviewContent('');
                }
            })
            .catch((error) => {
                console.error('리뷰 추가 실패:', error);
            });
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
                <button onClick={() => setSelectedTab('info')} className={selectedTab === 'info' ? 'active' : ''}>
                    가게 정보
                </button>
                <button onClick={() => setSelectedTab('reviews')} className={selectedTab === 'reviews' ? 'active' : ''}>
                    리뷰
                </button>
            </div>

            {selectedTab === 'info' && (
                <div>
                    <p>주소: {store.address}</p>
                    <p>픽업 시간: {store.pickupTime}</p>
                    <button onClick={goToReservationSummary} className="reservation-button">
                            예약하기
                    </button>
                </div>
            )}

            {selectedTab === 'reviews' && (
                <div>
                    <h3>리뷰</h3>
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index}>
                                <p><strong>{review.user}</strong>: {review.content}</p>
                            </div>
                        ))
                    ) : (
                        <p>등록된 리뷰가 없습니다.</p>
                    )}
                    <form onSubmit={handleReviewSubmit}>
                        <input
                            type="text"
                            placeholder="작성자 이름"
                            value={newReviewUser}
                            onChange={(e) => setNewReviewUser(e.target.value)}
                        />
                        <textarea
                            placeholder="리뷰 내용을 입력하세요"
                            value={newReviewContent}
                            onChange={(e) => setNewReviewContent(e.target.value)}
                        />
                        <button type="submit">리뷰 추가</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default StoreDetailPage;
