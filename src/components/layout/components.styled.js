import styled from 'styled-components';

export const StyledBody = styled.div`
    position:fixed;
    height:calc(100% - 70px)!important;
    width:100%;
    bottom:0;
    overflow:scroll;
    @media screen and (min-width:1024px){
    right:0;
    height:calc(100% - 100px)!important;
    width:calc(100% - 350px)!important;
    }
`;