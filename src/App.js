import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Kakao from './Kakao';
import Login from './Login';
import StartPage from './StartPage';
import Signup from './Signup'; // 회원가입 페이지
//import Home from './Home'; // 홈 페이지

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/kakao-map" element={<Kakao />} />
                
            </Routes>
        </Router>
    );
};

export default App;
