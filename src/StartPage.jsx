import React from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동에 사용하는 훅

const StartPage = () => {
    const navigate = useNavigate(); // 페이지 이동에 사용하는 훅

    const goToLogin = () => {
        navigate('/login'); // '/login' 경로로 이동
    };
    const goToKakao = () => {
        navigate('/kakao-map'); // '/kakao-map' 경로로 이동
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

            {/* 메인 컨텐츠 (필요시 추가) */}
            <div className="main-content">
                {/* 여기에 메인 컨텐츠를 추가할 수 있습니다 */}
            </div>
        </div>
    );
};

export default StartPage;
