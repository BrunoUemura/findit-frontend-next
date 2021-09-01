import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 60px 0 0 0;
  padding: 40px 0 10px 0;
  width: 100%;
  min-height: calc(100vh - 60px);
  overflow-x: hidden;
  background-color: #fff;

  .container {
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    padding: 0 0 0.3rem 0;
    height: 2.3rem;

    span {
      width: 8rem;
      height: 100%;
      display: flex;
      align-items: center;
      margin: 0;
    }

    input,
    select {
      flex: 1;
      height: 100%;
      border-radius: 5px;
      outline: none;
      background: #eee;
      border: none;
      padding-left: 0.5rem;
    }

    select {
      cursor: pointer;
    }

    textarea {
      flex: 1;
      min-height: 5rem !important;
      padding: 0.5rem !important;
      line-break: auto;
      border-radius: 5px;
      outline: none;
      background: #eee;
      border: none;
      resize: vertical;
    }
  }

  .description {
    height: auto;
  }

  .location {
    div {
      flex: 1;
      height: 100%;
      display: flex;

      input,
      select {
        margin-right: 0.5rem;
      }

      select {
        &:hover {
          cursor: pointer;
        }
      }

      input:last-child {
        margin-right: 0;
      }
    }
  }

  .buttons {
    margin: 2rem 0 5rem 0;
    width: 100%;
    display: flex;
    justify-content: center;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 0;
      height: 2.3rem;
      width: 10rem;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      font-weight: bold;
      font-size: 0.9rem;
      border-radius: 5px;
      outline: none;
      border: none;
      margin: 0 0.5rem;

      &:hover {
        cursor: pointer;
      }
    }

    .save {
      border: 1px #23cf5c solid;
      background: #23cf5c;
      color: #fff;
      &:hover {
        background: #1fb852;
      }
    }
    .discart {
      border: 1px #d43844 solid;
      background: transparent;
      color: #d43844;
      &:hover {
        background: #f0f0f0;
        border: 1px #bf323d solid;
        color: #bf323d;
      }
    }
  }

  @media (max-width: 850px) {
    .location {
      height: 6.9rem;

      div {
        flex-direction: column;
        padding: 0 0 0.3rem 0;

        input,
        select {
          margin: 0 0 0.3rem 0;
        }

        &:last-child {
          margin: 0;
        }
      }
    }
  }
`;
