import React, { useState, useEffect } from 'react'; // useState, useEffect를 import
import { useNavigate } from 'react-router-dom'; // 페이지 이동에 사용하는 훅
import AddStoreForm from './AddStoreForm'; // 추가 폼 임포트
import initialStores from './Stores'; // 매장 데이터 가져오기 (이름 변경)

const StartPage = () => {
    const navigate = useNavigate(); // 페이지 이동에 사용하는 훅
    const [stores, setStores] = useState(initialStores); // 초기 상태를 Stores.jsx로 설정

    useEffect(() => {
        // 서버로부터 매장 리스트 가져오기
        fetch('http://localhost:5002/api/stores')
            .then(response => response.json())
            .then(data => {
                console.log('가져온 매장 데이터:', data); // 데이터 확인
                if (data.success) {
                    setStores(data.stores); // 서버로부터 받은 데이터로 stores 상태 업데이트
                }
            })
            .catch(error => {
                console.error('매장 리스트 가져오기 오류:', error);
            });
    }, []); // 빈 배열을 의존성으로 전달하여 컴포넌트 마운트 시 한 번만 실행

    const goToLogin = () => {
        navigate('/login'); // '/login' 경로로 이동
    };

    const goToKakao = () => {
        navigate('/kakao-map', { state: { stores } }); // '/kakao-map' 경로로 이동, 상태 전달
    };

    const handleAddStore = (newStore) => {
        // 서버에 새로운 매장을 추가하는 로직
        fetch('/api/stores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStore),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Store added:', data);
                if (data.success) {
                    // 새로운 매장을 추가한 후 리스트를 업데이트
                    setStores(prevStores => [...prevStores, { ...newStore, id: data.storeId }]);
                }
            })
            .catch((error) => {
                console.error('Error adding store:', error);
            });
    };

    // 매장명을 클릭하면 상세 페이지로 이동하는 함수
    const goToStoreDetail = (store) => {
        navigate(`/store/${store.id}`, { state: { store } }); // state를 통해 매장 정보 전달
    };

    return (
        <div className="start-page">
            <div className="header">
                {/* 로고는 왼쪽 상단에 위치 */}
                <h1 className='logo'>Green Meal</h1>
                {/* 버튼은 오른쪽 상단에 위치 */}
                <div className="buttons">
                    <button onClick={goToKakao} className="start-button">
                        지도
                    </button>
                    <button onClick={goToLogin} className="start-button">
                        My Page
                    </button>
                </div>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="main-content">
                <h2>매장 리스트</h2>
                <AddStoreForm onAddStore={handleAddStore} /> {/* 매장 추가 폼 사용 */}
                <ul className="store-list">
                    {stores.map(store => (
                        <li key={store.id} className="store-item">
                            <img src={store.imageUrl} alt={`${store.name} 이미지`} className="store-image" />
                            {/* 매장 이름을 클릭하면 goToStoreDetail 함수 호출 */}
                            <button onClick={() => goToStoreDetail(store)} className="store-name-button">
                                {store.name}
                            </button>
                            <span className="store-price">
                                {store.discounted_price ? `${store.discounted_price}원` : '가격 정보 없음'}
                            </span>
                            
                            
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StartPage;