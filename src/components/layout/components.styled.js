import styled from 'styled-components';

export const StyledBody = styled.div`
    position:fixed;
    height:calc(100vh - 6rem);
    width:100%;
    bottom:0;
    overflow:auto;
    @media(min-width:1024px){
    right:0;
    width:calc(100% - 350px)!important;
    }
`;