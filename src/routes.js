import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from './pages/Main';
import Cart from './pages/Cart';
import Header from './components/header'
const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      Cart,
    },
    {
      cardStyle:{
        backgroundColor: "#3c64ad",
        
      },
      headerMode: 'screen',
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#141417',
        },
        headerTintColor: '#141417',
      
      },
      
    }
  )
);

export default Routes;
