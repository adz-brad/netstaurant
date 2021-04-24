import styled from 'styled-components';
   
export const StyledToggle = styled.button`

flex-direction: column;
justify-content: space-around;
width: 1.8rem;
height: 1.8rem;
background: transparent;
border: none;
cursor: pointer;
padding: 0;
z-index: 10;

&:focus {
    outline: none;
  }

div {
    width: 1.8rem;
    height: 0.25rem;
    border-radius: 2px;
    transition: all 0.2s linear;
    position: relative;
    transform-origin: 0.5px;

    :first-child {
        transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
        background: white;
      }
  
      :nth-child(2) {
        opacity: ${({ open }) => open ? '0' : '1'};
        transform: ${({ open }) => open ? 'scale(0.1)' : 'scale(1)'};
        background: white;
      }
  
      :nth-child(3) {
        transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
        background: white;
    }
  }

`;

export const StyledMenu = styled.div`
position:fixed;
left:0;
bottom:0;
height:calc( 100% - 70px );
width:100%;
max-width:350px;
z-index:98;
overflow:scroll;
transition: 0.3s ease;
@media screen and (max-width:1024px){
max-width:400px;
left:${({ open }) => open ? '0' : '-400px'};
}
@media screen and (min-width:1024px){
  height:calc( 100% - 100px );
}
`;

export const StyledCartOverlay = styled.div`
height:calc( 100% - 70px)!important;
width:100%;
max-width:500px;
bottom: 0;
right:${({ open }) => open ? '0' : '-500px'};
transition: 0.3s ease;
z-index:99;
overflow:scroll;
@media screen and (min-width:1024px){
  height:calc( 100% - 100px)!important;
  }
`;

export const StyledNav = styled.nav`
  position:fixed;
  top:0;
  left:0;
  height:70px;
  z-index:50;
  transition: 0.3s ease;

  @media screen and (min-width:1024px){
  height:100px!important;
  }
`;

