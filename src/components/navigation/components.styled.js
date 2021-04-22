import styled from 'styled-components';
   
export const StyledToggle = styled.button`

flex-direction: column;
justify-content: space-around;
width: 2rem;
height: 2rem;
background: transparent;
border: none;
cursor: pointer;
padding: 0;
z-index: 10;

&:focus {
    outline: none;
  }

div {
    width: 2rem;
    height: 0.275rem;
    border-radius: 2px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

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
height:calc( 100vh - 6rem);
width:100%;
max-width:350px;
bottom: 0;
z-index:99;
overflow:auto;
transition: 0.3s ease;
@media(max-width:1024px){
max-width:400px;
left:${({ open }) => open ? '0' : '-400px'};
}
`;

export const StyledCartOverlay = styled.div`
height:calc( 100vh - 6rem);
width:100%;
max-width:500px;
bottom: 0;
right:${({ open }) => open ? '0' : '-500px'};
transition: 0.3s ease;
z-index:99;
overflow:auto;
`;

