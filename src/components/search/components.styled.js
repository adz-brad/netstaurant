import styled from 'styled-components';

export const StyledFilter = styled.div`
display:block;
width:250px;
max-width:100%;
left:${({ open }) => open ? '0' : '-250px'};
transition: 0.3s ease;
`;

export const StyledToggle = styled.button`
transform:${({ open }) => open ? 'rotate(180deg)' : 'initial'};
transition: 0.2s linear;
padding-top:2px;
`;