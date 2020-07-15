import 'react-native-gesture-handler';

import React, {createContext, useReducer} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Home from './Screens/Home';
import CreateStandUser from './Screens/CreateStandUser';
import Profile from './Screens/Profile';
// import {createStore} from 'redux';
// import {Provider} from 'react-redux';
import {reducer, initState} from './reducers/reducer';

// const store = createStore(reducer);
export const Mycontext = createContext();

const Stack = createStackNavigator();
const myOptions = {
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: '#006aff',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerBackTitleVisible: false,
};

function MyStack() {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <Mycontext.Provider
      value={{
        state,
        dispatch,
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{...myOptions, title: 'My Home'}}
          />
          <Stack.Screen
            name="Create"
            component={CreateStandUser}
            options={{...myOptions, title: 'Create User'}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{...myOptions, title: 'User Profile'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Mycontext.Provider>
  );
}
function App() {
  return <MyStack />;
}

export default App;
