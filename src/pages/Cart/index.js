import React from 'react';
import {Alert} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container, ViewProduct, ProductInfoView, ProductImage, DescriptionView, Title, Price, ButtonDelete, ActionsView, AmountText,
  ProductActionAndPriceView, TitleTotal, TotalPrice, UnitPrice, EndOrderButton,
  DetailProduct, TextBuyButton, List, EmptyCarView, EmptyCartImage, EmptyCarText
} from './styles';
import Header from '../../components/header';
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as CartActions from '../../store/modules/cart/actions';
import api from '../../services/api';
import EmptyImage from '../../assets/emptycart.png'

function Cart({ cart, total, updateAmountSuccess, deleteSuccess , totalCart}) {

  async function incrementProduct(product) {
    //here is an example in case you have to use Redux Saga, for the side effects
    //it's taking time to render because of this call in the api, so Saga as itś assyncronoss
    //saga will just update the data after the response if success
    //in this case if I dont put await I will update for a wrong stock maybe, so that is what saga does
    const stock = await api.get(`/stock/${product.id}`);
    
    if(stock.data.amount >=(product.amount+1)){
      updateAmountSuccess(product.id, product.amount + 1);
    }else{
      Alert.alert(
        'Fora de estoque',
        'Quantidade insuficiente no estoque',
        [
          {text:'OK'}
        ]
      )
    }
    
  }
  function decrementProduct(product) {

    updateAmountSuccess(product.id, product.amount - 1);
  }
console.tron.log(totalCart);
  return (
    <Container>
      {(totalCart <=0) ?
       <EmptyCarView>
        
        <EmptyCartImage source={EmptyImage} ></EmptyCartImage>
        <EmptyCarText>Seu carrinho está vazio!</EmptyCarText>
        </EmptyCarView> :

      <ViewProduct>
      <DetailProduct
        data={cart}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) =>{
          return (
          <List>
          <ProductInfoView>
            <ProductImage source={{ uri: item.image }}></ProductImage>
            <DescriptionView>
              <Title>{item.title}</Title>
              <Price>{item.priceFormated}</Price>
            </DescriptionView>
            <ButtonDelete onPress={() => deleteSuccess(item.id)}>
              <Icon name="delete-forever" size={30} color="#3c64ad"></Icon>

            </ButtonDelete>

          </ProductInfoView>
          <ProductActionAndPriceView >
            <ActionsView>
              <Icon name="add-circle-outline" size={25} color="#3c64ad" onPress={() => incrementProduct(item)}></Icon>
              <AmountText>{item.amount}</AmountText>
              <Icon name="remove-circle-outline" size={25} color="#3c64ad" onPress={() => decrementProduct(item)}></Icon>
            </ActionsView>
            <UnitPrice>{item.subtotal}</UnitPrice>
          </ProductActionAndPriceView>
          </List>
          )
          
        }}
        ></DetailProduct>

      <TitleTotal>Total</TitleTotal>
      <TotalPrice>{String(total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TotalPrice>
      <EndOrderButton>
        <TextBuyButton>FINALIZAR PEDIDO</TextBuyButton>
      </EndOrderButton>

    </ViewProduct>
      }
      
    </Container>
  );

}

Cart.navigationOptions = {
  title: 'Cart',
  header: ({ navigation }) => <Header navigation={navigation} />,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);
const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: (product.amount * product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }
  )),
  total: (state.cart.reduce((total, product) => {
    return (total + product.price * product.amount)
  }, 0)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  totalCart: state.cart.length  
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
