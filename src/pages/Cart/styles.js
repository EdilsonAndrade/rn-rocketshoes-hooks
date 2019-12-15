import styled from 'styled-components/native';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler'
import {lighten} from 'polished';
export const Container = styled.View`
  padding: 10px;
  margin: 10px;
  background: #fff;
  border-radius:4px;

`;

export const ViewProduct = styled.View`
`;
export const EmptyCarView = styled.View`
  justify-content:center;
  align-items:center;
  padding:40px;
`;


export const EmptyCartImage = styled.Image`
  width:100px;
  height: 100px;
  background: rgba(42,42,45,0.12);
`
export const EmptyCarText = styled.Text`
  font-weight:bold;
  font-size:20px;
  margin: 15px 0 0 0;
`;

export const DetailProduct = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false
})`
  max-height:75%;
`;

export const List = styled.View``;

export const ProductInfoView = styled.View`
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
`;
export const ProductImage = styled.Image`
    width:80px;
    height:80px;
`;
export const DescriptionView = styled.View`
  max-width:60%;
  margin-left:10px;
`;
export const Title = styled.Text.attrs({
  numberOfLines: 2
})`

`;
export const Price = styled.Text`
  font-weight:bold;
`;
export const ButtonDelete = styled(BorderlessButton)`
`;

export const ProductActionAndPriceView = styled.View`
  flex-direction:row;
  justify-content: space-between;
  align-items:center;
  background:rgba(42,42,45,0.1);
  padding: 10px;
`;

export const ActionsView = styled.View`
  flex-direction:row;
  max-width:60%;
  justify-content:center;
  align-items:center;
  height:40px;
`;

export const ButtonIncrement = styled(BorderlessButton)``;
export const ButtonDecrement = styled(BorderlessButton)``;

export const AmountText = styled.Text`
  color: #000000;
  font-size:14px;
  padding:3px 5px;
  width:55px;
  margin: 0 5px;
  background: #ffffff;
`
export const UnitPrice = styled.Text` 
 font-size:14px;
 color:#000000;
 font-weight:bold;
 border-radius:4px;
`
export const TitleTotal = styled.Text`
color:#000000;
font-size:14px;
text-align:center;
margin-top:30px;

`
export const TotalPrice = styled.Text`
color:#000000;
font-size:24px;
text-align:center;
font-weight: bold;
`

export const EndOrderButton = styled(RectButton)`
    border:1px solid #3c64ad;
    background:${lighten( '.1','#3c64ad')};
    padding:12px;
    border-radius:4px;
    margin-top:10px;

`;

export const TextBuyButton = styled.Text`
text-align:center;
font-weight:bold;
`;