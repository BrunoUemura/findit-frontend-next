import styled from "styled-components"

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"></link>

export const ImageContainer = styled.div`
  * {
    font-family: 'Roboto', sans-serif;
  }
  
  margin-top: 60px;
  padding: 0;
  width: 70%;
  background: #fff;
  @media( max-width: 1000px ) {
    width: 80%;    
  }
  @media( max-width: 800px ) {
    width: 90%;    
  }
  @media( max-width: 650px ) {
    margin-top: 100px;
    width: 100%;    
    padding: 40px 30px 30px 30px;
  }
`

export const Div = styled.div`
  padding: 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  .container-image {
    width: 100%;
    margin-bottom: 50px;
    img {
      width: 100%;
    }
  }
  .container {
    display: flex;
    flex-direction: row;
    padding: 0 40px 40px 40px;
    form {
      width: 65%;
      padding: 0 25px 0 0;
      border-right: 1px solid #c4c4c4;
      h1 {
        width: 100%;
        margin-bottom: 35px;
      }
      div {
        position: relative;
        display: flex;
        width: 100%;
        align-items: center;
        margin-top: 5px;
        .icone {
          position: absolute;
          left: 10px;
          z-index: 1;
        }
        input {
          width: 100%;
          height: 40px;
          border-radius: 15px;
          outline: none;
          border: none;
          background: #eee;
          padding: 0 20px 0 45px;
          position: relative;
          border-bottom: 3px solid transparent;
          &:hover {
            border-bottom: 3px solid #4169E1;
          }
        }
        .icone-message {
          position: absolute;
          left: 10px;
          top: 10px;
          z-index: 1;
        }
        .message {
          height: 100px;
          width: 100%;
          border-radius: 15px;
          outline: none;
          border: none;
          background: #eee;
          padding: 10px 20px 0 45px;
          position: relative;
          border-bottom: 3px solid transparent;
          &:hover {
            border-bottom: 3px solid #4169E1;
          }
        }
      }
      button {
        width: 100%;
        height: 40px;
        border-radius: 15px;
        outline: none;
        border: none;
        background: #4169E1;
        color: #fff;
        font-weight: bold;
        padding: 0;
        margin-top: 40px;
        transition: .2s;
        &:hover {
          background: #f7226a;
          letter-spacing: 1px;
        }
      }
    }
    .media-and-location-container {
      width: 30%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding-left: 25px;
      .media-container {
        a {
          img{        
            width: 50px;
            height: 50px;
            margin: 5px 10px;
          }
        }
      }
    }
  }
`