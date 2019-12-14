import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import { darken} from 'polished';


export const Container = styled.View`
  
`;

export const ProductsList = styled.FlatList.attrs({
  showsHorizontalScrollIndicator: false
  })`
  
`

export const ProductView = styled.View`
  padding:13px;
  background: #fff;
  border: 1px solid #3264ad;
  margin:20px 9px 0 15px;
  border-radius:7px;
  max-width:220px;
  
`


export const ProductImage = styled.Image`
    width: 200px;
    height: 200px;
`;
export const ProductDescription  = styled.Text.attrs({
  numberOfLines: 4
})`
  color:#333333;
  font-size:16px;
`;
export const Price = styled.Text`
  color:#000000;
  font-size:18px;
  font-weight:bold;
`;
export const Button = styled(RectButton)`
  background:#3c64ad;
  flex-direction:row;
  width:100%;
  align-items:center;
  margin-top:auto;
  border-radius:4px;

`;
export const TextButton = styled.Text`
    color:#ffff;
    font-weight: bold;
    font-size:16px;
    margin-left:15px;
    
`;


export const IconView = styled.View`
  flex-direction:row;
  padding:10px;
  background: ${darken(.06,"#3c64ad")}
  
`;

export const ProductsAdded= styled.Text`
color:#fff

`

