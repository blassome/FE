import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import StartLogin from "../login/StartLogin";
import ErrorScreen from "../error/ErrorScreen";
import KakaoLogin from "../login/KakaoLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "oauth/callback/kakao",
        element: <KakaoLogin />,
        errorElement: <ErrorScreen />,
      },
      {
        path: "/",
        element: <StartLogin />,
        errorElement: <ErrorScreen />,
      },
    ],
    errorElement: <ErrorScreen />,
  },
]);

export default router;
