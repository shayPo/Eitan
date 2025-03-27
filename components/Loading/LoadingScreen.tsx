import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Button} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import {getAccessToken, initClientMsal} from '../../Libraries/Msal/msal';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Loading'>;

type LoadingProps = {
  connectionState: boolean;
};

function LoadingState({connectionState}: LoadingProps): React.JSX.Element {
  if (connectionState) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>You are not connected to the internet</Text>
      </View>
    );
  }
}
const LoadingScreen: React.FC<Props> = ({navigation}) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!isConnected && state.isConnected) {
        onNetworkRestored();
      }
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, [isConnected]);

  const onNetworkRestored = async () => {
    setReloadKey(prevKey => prevKey + 1);
    await initClientMsal();
    const result = await getAccessToken();
    if (result == null || result == '') {
      //navigation.navigate('Login');
      navigation.replace('Login');
    } else {
      //navigation.navigate('Cases');
      navigation.replace('Cases');
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, styles.horizontal]}>
        <View
          key={reloadKey}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LoadingState
            connectionState={isConnected != null && isConnected}></LoadingState>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default LoadingScreen;
