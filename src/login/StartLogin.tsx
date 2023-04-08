//StartLogin.tsx
import { useState } from "react";
import styled from "styled-components";

const KakaoLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
`;

const KakaoLoginButton = styled.button`
  background-color: #ffeb3b;
  color: #000000;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #fee500;
  }
`;

const LoggedInMessage = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #000000;
  margin-top: 2rem;
`;

const KakaoLogin = async () => {
  window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_API_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
};

const StartLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <KakaoLoginWrapper>
      {!isLoggedIn ? (
        <>
          <p>익명의 메시지로 따뜻한 봄나무를 만나보세요 🌸</p>
          <KakaoLoginButton onClick={KakaoLogin}>카카오로 로그인</KakaoLoginButton>
        </>
      ) : (
        <LoggedInMessage>
          로그인이 완료되었습니다. 코드: {new URL(window.location.href).searchParams.get("code")}
        </LoggedInMessage>
      )}
    </KakaoLoginWrapper>
  );
};

export default StartLogin;
