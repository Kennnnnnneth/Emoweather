import styled from 'styled-components/native';

export const RowView = styled.View`
flex-direction: row;
align-items: center;
`;

export const RowSpread = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

export const ABView = styled.View`
position:absolute;
`;

export const CView = styled.View`
align-items: center;
`;


export const look = (data) => {
    console.log(JSON.stringify(data, null, 2))
}
