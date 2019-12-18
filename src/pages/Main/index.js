import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-native';

import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import Header from '../../components/header';
import { Container, ProductsList, ProductView, ProductDescription, Price, Button, TextButton, ProductImage, IconView, ProductsAdded } from './styles';

export default function Main({ navigation }) {

  const [products, setProducts] = useState([]);

  const amount = useSelector(state => state.cart.reduce((sumAmount, product) => {
    sumAmount[product.id] = product.amount;
    return sumAmount;
  }, {}));

  useEffect(() => {
    async function getProducts() {
      const response = await api.get('/products');
      const result = response.data.map(product => ({
        ...product,
        priceFormated: Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      }));

      setProducts(result);
    }
    getProducts();


  }, [])

  const dispatch = useDispatch();
  handleAddToCart = async (product, amountProduct) => {

    //here is an example in case you have to use Redux Saga, for the side effects
    //it's taking time to render because of this call in the api, so Saga as itś assyncronoss
    //saga will just update the data after the response if success
    //in this case if I dont put await I will update for a wrong stock maybe, so that is what saga does

    const stock = await api.get(`/stock/${product.id}`);
    if (amountProduct === undefined || stock.data.amount >= (amountProduct + 1)) {
      dispatch(CartActions.addToCartSuccess(product));

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
              <Button onPress={() => this.handleAddToCart(item, amount[item.id])}>
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
Main.navigationOptions = {
  title: 'Home',
  header: ({ navigation }) => <Header navigation={navigation} />,
};
