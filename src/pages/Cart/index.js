import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container, ViewProduct, ProductInfoView, ProductImage, DescriptionView, Title, Price, ButtonDelete, ActionsView, AmountText,
  ProductActionAndPriceView, TitleTotal, TotalPrice, UnitPrice, EndOrderButton,
  DetailProduct, TextBuyButton
} from './styles';
import Header from '../../components/header';
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as CartActions from '../../store/modules/cart/actions';

function Cart({ cart, total, updateAmountSuccess, deleteSuccess }) {

  function incrementProduct(product) {
    updateAmountSuccess(product.id, product.amount + 1);
  }
  function decrementProduct(product) {
    updateAmountSuccess(product.id, product.amount - 1);
  }

  return (
    <Container>
      <ViewProduct>
        {cart.map(product => (
          <DetailProduct key={product.id}>
            <ProductInfoView>
              <ProductImage source={{ uri: product.image }}></ProductImage>
              <DescriptionView>
                <Title>{product.title}</Title>
                <Price>{product.priceFormated}</Price>
              </DescriptionView>
              <ButtonDelete onPress={() => deleteSuccess(product.id)}>
                <Icon name="delete-forever" size={30} color="#3c64ad"></Icon>

              </ButtonDelete>

            </ProductInfoView>
            <ProductActionAndPriceView >
              <ActionsView>
                <Icon name="add-circle-outline" size={25} color="#3c64ad" onPress={() => incrementProduct(product)}></Icon>
                <AmountText>{product.amount}</AmountText>
                <Icon name="remove-circle-outline" size={25} color="#3c64ad" onPress={() => decrementProduct(product)}></Icon>
              </ActionsView>
              <UnitPrice>{product.subtotal}</UnitPrice>
            </ProductActionAndPriceView>

          </DetailProduct>

        ))}
        <TitleTotal>Total</TitleTotal>
        <TotalPrice>{String(total).toLocaleString('pt-BR',{style:'currency', currency: 'BRL'})}</TotalPrice>
        <EndOrderButton>
          <TextBuyButton>FINALIZAR PEDIDO</TextBuyButton>
        </EndOrderButton>

      </ViewProduct>
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
  }, 0)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
