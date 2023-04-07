import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const UserName = styled.span`
  font-weight: bold;
  font-size: 24px;
  color: #000080;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

function KakaoLogin() {
  const location = useLocation();
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");

  const getToken = async () => {
    const CLIENT_ID = process.env.REACT_APP_JS_KEY;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
    const code = location.search.split("=")[1];
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: CLIENT_SECRET,
      "Content-Type": "application/x-www-form-urlencoded ",
    });

    try {
      //토큰 가져오기
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );
      setToken(res.data.access_token);
      console.log(res.data.access_token);
    } catch (error) {
      console.log("에러남");
    }
  };

  useEffect(() => {
    getToken();
  });

  useEffect(() => {
    const getKakaoUser = async () => {
      if (token) {
        try {
          //토큰을 이용하여 사용자 정보 가져오기
          const kakaoUser = await axios.get(
            `https://kapi.kakao.com/v2/user/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserName(kakaoUser.data.properties.nickname);
        } catch (error) {
          console.log("에러남");
        }
      }
    };
    getKakaoUser();
  }, [token]);

  return (
    // 사용자 정보 출력
    <Wrapper>
      {userName && <UserName>안녕하세요 {userName}님!</UserName>}
    </Wrapper>
  );
}

export default KakaoLogin;
