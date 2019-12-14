import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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

  handleAddToCart = (product) => {
    const { navigation, addToCartSuccess } = this.props;
      
    addToCartSuccess(product);
    
    navigation.navigate('Cart', { product })
  }
  render() {
    const { products } = this.state;
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
                <Button onPress={() => this.handleAddToCart(item)}>
                  <IconView>
                    <Icon name="add-shopping-cart" size={20} color='#fff' />
                    <ProductsAdded>3</ProductsAdded>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(Cart, dispatch);
export default connect(null,mapDispatchToProps)(Main);