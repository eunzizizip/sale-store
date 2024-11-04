import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Axios 라이브러리 사용
import { useNavigate } from 'react-router-dom'; // useNavigate 추가

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    // useNavigate 훅을 사용하여 navigate 선언
    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex = 
        /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        setEmailValid(regex.test(e.target.value));
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        const regex = 
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\$begin:math:text$\\$end:math:text$\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        setPwValid(regex.test(e.target.value));
    };

    const onClickConfirmButton = async () => {
        try {
            const response = await axios.post('http://localhost:5002/api/Login', {
                email: email,
                password: password
            });

            if (response.data.success) { // 성공 여부 확인
                alert('로그인 성공');
                // 여기서 로그인 성공 후 처리, 예를 들어 리다이렉션
                navigate('/'); // 적절한 경로로 이동 -> 시작 페이지로 이동
            } else {
                alert('로그인 실패: ' + response.data.message);
            }
        } catch (error) {
            console.error('로그인 에러:', error);
            alert('로그인에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const goToSignup = () => {
        navigate('/signup'); // '/signup' 경로로 이동
    };

    useEffect(() => {
        setNotAllow(!(emailValid && pwValid));
    }, [emailValid, pwValid]);

    return (
        <div className="page">
            <div className="titleWrap">
                이메일과 비밀번호를 <br /> 입력해주세요
            </div>
            <div className="contentWrap">
                <div className="inputTitle">이메일 주소</div>
                <div className="inputWrap">
                    <input
                        type="text"
                        className="input"
                        placeholder="test@gmail.com"
                        value={email}
                        onChange={handleEmail}
                    />
                </div>
                <div className="errorMessageWrap">
                    {!emailValid && email.length > 0 && <div>올바른 이메일을 입력해주세요</div>}
                </div>
                <div style={{ marginTop: '26px' }} className="inputTitle">비밀번호</div>
                <div className="inputWrap">
                    <input
                        type="password"
                        className="input"
                        placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                        value={password}
                        onChange={handlePassword}
                    />
                </div>
                <div className="errorMessageWrap">
                    {!pwValid && password.length > 0 && <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>}
                </div>

                {/* 회원가입 하이퍼링크 추가 */}
                <div className="signupButtonWrap" style={{ marginTop: '20px', textAlign: 'center'}}>
                    <a href='#' onClick={goToSignup} style={{textDecorationLine: 'underline', color:'green', cursor: 'pointer'}}>
                        처음이신가요?
                    </a>
                </div>

                <div style={{ marginTop: '20px' }}>                
                    <button
                        onClick={onClickConfirmButton}
                        disabled={notAllow}
                        className="bottomButton"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;