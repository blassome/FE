import { useState } from "react";
import styled from "styled-components";
import KakaoLogin from "./KakaoLogin";

const KakaoLoginButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginButton = styled.button`
  background-color: #fee500;
  color: #000000;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffeb3b;
  }
`;

const LoggedInMessage = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #000000;
`;

const StartLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const KakaoLogin = async () => {
    //(1) 카카오 로그인 링크 이동
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_API_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
    // KakaoLogin();
    // setIsLoggedIn(true);
  };
  return (
    <KakaoLoginButtonWrapper>
      {/* {isLoggedIn ? (
        <LoggedInMessage>{new URL(window.location.href).searchParams.get("code")}</LoggedInMessage>
      ) : ( */}
      <LoginButton onClick={KakaoLogin}>카카오로 로그인</LoginButton>
      {/* )} */}
    </KakaoLoginButtonWrapper>
  );
};

export default StartLogin;
