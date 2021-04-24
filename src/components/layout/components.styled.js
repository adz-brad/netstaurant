import styled from 'styled-components';

export const StyledBody = styled.div`
    height:calc(100% - 70px)!important;
    width:100%;
    padding-top:70px;

    @media screen and (min-width:1024px){
        padding-top:0;
        position:fixed;
        bottom:0;
        overflow-y:scroll;
        right:0;
        height:calc(100% - 100px)!important;
        width:calc(100% - 350px)!important;
    }
`;