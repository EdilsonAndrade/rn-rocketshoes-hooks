import React, { Component } from 'react';
import {Alert} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import api from '../../services/api';
import * as Cart from '../../store/modules/cart/actions';

import { Container, ProductsList, ProductView, ProductDescription, Price, Button, TextButton, ProductImage, IconView, ProductsAdded } from './styles';
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import Header from '../../components/header/index'
class Main extends Component {
  state = {
    products: []
  }
  async componentDidMount() {

    const response = await api.get('/products');
    const result = response.data.map(product => ({
      ...product,
      priceFormated: Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }));
    this.setState({ products: result })

  }

  handleAddToCart = async (product, amountProduct) => {
    const { navigation, addToCartSuccess } = this.props;
    //here is an example in case you have to use Redux Saga, for the side effects
    //it's taking time to render because of this call in the api, so Saga as itś assyncronoss
    //saga will just update the data after the response if success
    //in this case if I dont put await I will update for a wrong stock maybe, so that is what saga does
    const stock = await api.get(`/stock/${product.id}`);
    console.tron.log(stock.data.amount,amountProduct)
    if (amountProduct === undefined || stock.data.amount >= (amountProduct + 1)) {
      addToCartSuccess(product);

      navigation.navigate('Cart', { product })
    } else {
      Alert.alert(
        'Fora de estoque',
        'Quantidade insuficiente no estoque',
        [
          { text: 'OK' }
        ]
      )
    }
  }
  render() {
    const { products } = this.state;

    const { amount } = this.props;

    return (
      <Container>
        <ProductsList
          horizontal={true}
          data={products}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => {

            return (
              <ProductView>
                <ProductImage
                  source={{ uri: item.image }}
                ></ProductImage>
                <ProductDescription>{item.title}</ProductDescription>
                <Price> {item.priceFormated}</Price>
                <Button onPress={() => this.handleAddToCart(item, amount[item.id] )}>
                  <IconView>
                    <Icon name="add-shopping-cart" size={20} color='#fff' />
                    <ProductsAdded>{
                      amount[item.id] ?? 0
                    }</ProductsAdded>
                  </IconView>

                  <TextButton>ADICIONAR</TextButton>
                </Button>
              </ProductView>

            )

          }}
        ></ProductsList>

      </Container>
    );
  }

};
Main.navigationOptions = {
  title: 'Rocket Shoes',
  header: ({ navigation }) => {
    return (
      <Header navigation={navigation}
      />
    );
  }
};
const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {})
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(Cart, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Main);