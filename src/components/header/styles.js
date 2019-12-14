import styled from 'styled-components';
import { Badge} from 'react-native-elements';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
background: #3264ad;
height: 10%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 12px;
border-width:1px;
border-bottom-color: #5E7CE2;

`;

export const ButtonLogo = styled(RectButton)`
`
export const LogoImage  = styled.Image`
  width: 177px;
  height: 23px;
`;

export const Cart = styled.View`
    flex-direction:row;
    
`
export const BadgeCart = styled(Badge)`
    background:#5E7CE2;
    color: #EEE;
    border: none;
    
`

