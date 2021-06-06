import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 60px 0 0 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
`;

export const CategoryList = styled.ul`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 160px;
  padding: 15px;
  margin: 0;
  background-color: #fff;
  overflow-x: auto;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 15px 0px 15px;
  min-width: 100px;
  transition: 0.2s;
  padding: 0;

  word-wrap: break-word;
  list-style: none;
  color: #000;
  border-radius: 10px;
  p {
    text-align: center;
    margin: 0;
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.08);
  }
`;

export const MainSection = styled.div`
  width: 70vw;
  height: 100%;
  height: calc(100vh - 60px - 160px - 1px);
  background: #fff;
  margin-top: 1px;
  padding: 40px 30px 30px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .main-texts p {
    display: flex;
    font-size: 2rem;
    font-style: bold;
    margin: 1.3rem;
  }

  .buttons-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 45px 20px 20px 20px;
  
    button {
      width: 250px;
      height: 60px;
      border-radius: 5px;
      font-size: large;
      transition: 0.15s;

      &:hover {
        cursor: pointer;
      }
    }
    
    .post-services {
      background-color: #4169e1;
      border: none;
      color: #fff;
      &:hover {
        transform: scale(1.02);
        background-color: #3159d1;
      }
    }

    .find-services {
      background: transparent;
      border: 3px solid #4169e1 !important;
      color: #4169e1;

      &:hover {
        transform: scale(1.02);
        border: 3px solid #4169e1 !important;
        background-color: #eee;
      }
    }
  }

  .system-information {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    padding: 20px;
    
    p {
      width: 180px;
      margin: 0;
      padding: 0;
      text-align: center;
    }
  }
`;
