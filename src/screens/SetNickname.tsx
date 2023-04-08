import { useRecoilValue, useRecoilState } from "recoil";
import { nickAtom } from "../recoil/Atom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function SetNickname() {
  const nickname = useRecoilValue(nickAtom);
  const [nickNameAtom, setNickNameAtom] = useRecoilState(nickAtom);
  const navigate = useNavigate();

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNickNameAtom(e.currentTarget.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNickNameAtom(nickname);
    navigate("/mytree");
  };

  return (
    <div>
      <Wrapper>
        <h1>닉네임을 작성해주세요🌷</h1>
        <h1>TIP! 닉네임은 변경할 수 없어요.</h1>
        <h1>신중하게 결정해주세요!</h1>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} type="text" value={nickname} />
          <button>확인</button>
        </form>
      </Wrapper>
    </div>
  );
}

export default SetNickname;
