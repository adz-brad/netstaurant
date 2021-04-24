import styled from 'styled-components';

export const StyledBody = styled.div`
    height:calc(100% - 70px)!important;
    width:100%;

    @media screen and (min-width:1024px){
        position:fixed;
        bottom:0;
        overflow:scroll;
        right:0;
        height:calc(100% - 100px)!important;
        width:calc(100% - 350px)!important;
    }
`;