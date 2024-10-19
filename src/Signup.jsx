import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; // Axios 라이브러리 사용
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import styles from './Signup.module.css'; // CSS 모듈 임포트

const Signup = () => {
    const [username, setUsername] = useState(''); // username 상태 추가
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [pwMatch, setPwMatch] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

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
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-Z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        setPwValid(regex.test(e.target.value));
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setPwMatch(e.target.value === password);
    };

    const onClickSignupButton = async () => {
        if (pwMatch) {
            try {
                const response = await axios.post('http://localhost:5002/Signup', {
                    username: username, // username 추가
                    email: email,
                    password: password
                });

                console.log('회원가입 응답:', response.data);

                if (response.data.success) {
                    alert('회원가입 성공');
                    navigate('/login'); // 회원가입 성공 후 로그인 화면으로 이동
                } else {
                    alert('회원가입 실패: ' + response.data.message);
                }
            } catch (error) {
                console.error('회원가입 에러:', error);
                alert('회원가입에 실패했습니다.');
            }
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    };

    useEffect(() => {
        setNotAllow(!(emailValid && pwValid && pwMatch && username.length > 0)); // username 유효성 추가
    }, [emailValid, pwValid, pwMatch, username]);

    return (
        <div className={styles.page}>
            <div className={styles.titleWrap}>
                회원가입 정보를 <br /> 입력해주세요
            </div>
            <div className={styles.contentWrap}>
                <div className={styles.inputTitle}>사용자 이름</div> {/* 사용자 이름 추가 */}
                <div className={styles.inputWrap}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="사용자 이름을 입력하세요"
                        value={username} // username 상태 연결
                        onChange={(e) => setUsername(e.target.value)} // 사용자 이름 입력 처리
                    />
                </div>
                <div style={{ marginTop: '26px' }} className={styles.inputTitle}>이메일 주소</div>
                <div className={styles.inputWrap}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="test@gmail.com"
                        value={email}
                        onChange={handleEmail}
                    />
                </div>
                <div className={styles.errorMessageWrap}>
                    {!emailValid && email.length > 0 && <div>올바른 이메일을 입력해주세요</div>}
                </div>
                <div style={{ marginTop: '26px' }} className={styles.inputTitle}>비밀번호</div>
                <div className={styles.inputWrap}>
                    <input
                        type="password"
                        className={styles.input}
                        placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                        value={password}
                        onChange={handlePassword}
                    />
                </div>
                <div className={styles.errorMessageWrap}>
                    {!pwValid && password.length > 0 && <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>}
                </div>

                <div style={{ marginTop: '26px' }} className={styles.inputTitle}>비밀번호 확인</div>
                <div className={styles.inputWrap}>
                    <input
                        type="password"
                        className={styles.input}
                        placeholder="비밀번호 확인"
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                    />
                </div>
                <div className={styles.errorMessageWrap}>
                    {!pwMatch && confirmPassword.length > 0 && <div>비밀번호가 일치하지 않습니다</div>}
                </div>

                <div style={{ marginTop: '20px' }}>                
                    <button
                        onClick={onClickSignupButton}
                        className={styles.bottomButton}
                        disabled={notAllow} // 가입 버튼 비활성화
                    >
                        회원가입
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
