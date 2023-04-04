import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import qs from "qs";

function KakaoLogin() {
  const location = useLocation();
  const AUTH_CODE = location.search.split("=")[1];

  const getKaKaoToekn = async () => {
    let tokenResponse;
    try {
      // Authorization Server로부터 Access Token 발급받기
      tokenResponse = await axios({
        method: 'POST',
        url: 'https://kauth.kakao.com/oauth/token',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
          'grant_type': 'authorization_code',
          'client_id': process.env.REACT_APP_REST_API_KEY,
          'client_secret': process.env.REACT_APP_KAKAO_CLIENT_SECRET,
          'redirect_uri': process.env.REACT_APP_REDIRECT_URI,
          'code': AUTH_CODE
        })
      });
    } catch (error) {
      return console.log("에러남");
    }
    console.info(tokenResponse.data);
  };

  useEffect(() => {
    if (!location.search) return;
    getKaKaoToekn();
  }, []);

  return (
    <div>
      <h1>로그인 완료 페이지</h1>
    </div>
  );
}

export default KakaoLogin;
