import styled from 'styled-components';

export const Panel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  .content-section {
    flex: 1;
    .target-values {
      display: flex;
      justify-content: space-between;
      padding: 0 2em;
    }
  }
  .input-fields {
    text-align: center;
    margin-top: 2em;
  }
  .navigation-section {

  }
`;
