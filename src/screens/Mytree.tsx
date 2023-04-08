import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { nickAtom } from '../recoil/Atom';
import styled from 'styled-components';
import tree from '../img/tree.png'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

 function MyTree() {
  const nickname = useRecoilValue(nickAtom);

  return (
    <Wrapper>
      <h1>{nickname}의 나무</h1>
      <img src={tree}></img>
      <button>공유하기</button>
    
      
    </Wrapper>
  )
 
};

export default MyTree;
