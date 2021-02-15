import styled from 'styled-components';

export const SearchField = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  .text-search-wrapper {
    padding-left: 1em;
    display: flex;
    align-items: center;
    .text-search {
      background: #fff;
      display: flex;
      border: 1px solid #dfe1e5;
      box-shadow: none;
      height: 39px;
      width: 100%;
      border-radius: 24px;
      z-index: 3;
      height: 44px;
      margin: 0 auto;
      padding-left: 15px;
      padding-right: 15px;
      display: flex;
      align-items: center;
      .input-area {
        display: flex;
        align-items: center;
        padding-right: 10px;
      }
      .search-button {
        margin-left: 10px;
      }
      .MuiDivider-vertical {
        height: 34px;
      }
      :hover {
        box-shadow: 0 4px 6px 0 rgba(32,33,36,0.28);
        border: 0;
      }
      input {
        background-color: transparent;
        border: none;
        margin: 0;
        padding: 0;
        color: rgba(0,0,0,.87);
        word-wrap: break-word;
        outline: none;
        display: flex;
        flex: 100%;
        -webkit-tap-highlight-color: transparent;
        height: 34px;
        font-size: 16px;
        ::placeholder {
          color: rgb(151, 151, 151);
        }
      }
    }
  }
`;
