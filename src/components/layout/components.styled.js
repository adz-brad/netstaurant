import styled from 'styled-components';

export const StyledBody = styled.div`
    height:calc(100% - 70px)!important;
    width:100%;
    padding-top:70px;
    padding-bottom:0;
    overflow:scroll;

    @media screen and (min-width:1024px){
        padding:0;
        position:fixed;
        bottom:0;
        right:0;
        height:calc(100% - 100px)!important;
        width:calc(100% - 350px)!important;
    }
`;