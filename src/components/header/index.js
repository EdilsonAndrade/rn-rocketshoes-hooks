import React from 'react';
import {connect} from 'react-redux';
import { Container, LogoImage, Cart, BadgeCart, ButtonLogo} from './styles';
import Logo from '../../assets/logo.png';
import Icon from 'react-native-vector-icons/dist/MaterialIcons'

function Header({navigation, totalCart}){
  function navigateToCart(){
   navigation.navigate('Cart');

  }
  function navigateToHome(){
    navigation.navigate('Main');
  }
  return(
    <Container>
        <ButtonLogo onPress={navigateToHome} >
        <LogoImage  source={Logo} ></LogoImage>
        </ButtonLogo>
        
        <Cart>
       
          <Icon name="shopping-basket" size={30} color='#fff' onPress={navigateToCart} />
          <BadgeCart  onPress={navigateToCart} value={totalCart} containerStyle={{position:'absolute',top: -3, right: -8}} />
          
        </Cart>
    </Container>
  )
}

const mapStateToProps = state => ({
  totalCart: state.cart.length  

});

export default connect(mapStateToProps)(Header);