import React from 'react';
import {View, Text, Button} from 'react-native';
import {login} from '../../Libraries/Msal/msal';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, styles} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const startLogin = async () => {
    const result = await login();
    if (result != null && result.length > 0) {
      navigation.replace('Cases');
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText} onPress={startLogin}>
          Login
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
