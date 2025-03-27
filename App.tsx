import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {View, Text, StyleSheet} from 'react-native';
import {logout} from './Libraries/Msal/msal';

import LoadingScreen from './components/Loading/LoadingScreen';
import LoginScreen from './components/Authentication/LoginScreen';
import CasesScreen from './components/Cases/CasesScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Loading: undefined;
  Login: undefined;
  Cases: undefined;
};

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Cases"
          component={CasesScreen}
          options={({route, navigation}) => ({
            headerRight: () => (
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText} onPress={() => {logout(); navigation.replace('Login')}}>
                  Logout
                </Text>
              </View>
            ),
           })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  item: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#2996ff',
    borderRadius: 8,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 5,
    marginHorizontal: 10,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default App;
