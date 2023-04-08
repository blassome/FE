//KaKaLogin.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { nickAtom } from "../recoil/Atom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function KakaoLogin() {
  const location = useLocation();
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [nickName, setNickName] = useRecoilState(nickAtom);
  const navigate = useNavigate();

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
    } catch (error) {
      console.log("토큰에러 " + error);
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
          //닉네임 상태 업데이트
          setNickName(kakaoUser.data.properties.nickname);
          navigate("/setnickname")  
          // await axios.post('/api/', { //backend통신
          //   userName : userName,
          //   userEmail : kakaoUser.data.properties.email
          // })
          // .then((response) => {
          //     console.log("전송 성공" + response.data)
          // })
          // .catch((error) => {
          //     console.log(error);
          // });
        } catch (error) {
          console.log("사용자 정보 에러: " + error);
        }
      }
    };
    getKakaoUser();
  });

  return (
    <Wrapper>
      <h1>로딩</h1>
    </Wrapper>
  );
}

export default KakaoLogin;
