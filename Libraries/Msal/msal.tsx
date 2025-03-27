import PublicClientApplication, {
    MSALConfiguration,
    MSALAccount,
  } from 'react-native-msal';

  const MSAL_SCOPE = 'api://eitan/all';

  let authClient: PublicClientApplication;

  const config: MSALConfiguration = {
    auth: {
      clientId: 'c8af4e2c-193a-450c-aea3-08003c370736',
      
      redirectUri:
        'msauth://com.eitan/dAnXeXR0SfaDqouD9Bf7TjVhBkk%3D',
      authority:
        'https://login.microsoftonline.com/78820852-55fa-450b-908d-45c0d911e76b',
      knownAuthorities: [
        'https://login.microsoftonline.com/78820852-55fa-450b-908d-45c0d911e76b',
      ],
    },
  };

  export const getAuthClient = () => {
    return authClient;
  };
  
  export const getAccounts = async () => {
    return authClient.getAccounts();
  };
  
  export const initClientMsal = async (): Promise<void> => {
    console.log("msaltest start init")
    try {
    authClient = new PublicClientApplication(config);
    await authClient.init();
    console.log("msaltest start init ok")
    }
    catch (e) {
      console.log("msaltest error in initClientMsal",e)
    }
  };
  
  export const getAccessToken = async (): Promise<string | null> => {
    const accounts = await authClient.getAccounts();
    if (accounts.length > 0) {
      const account: MSALAccount = accounts[0];
      try {
        const tokenResponse = await authClient.acquireTokenSilent({
          scopes: [MSAL_SCOPE],
          account,
          forceRefresh: true,
        });
        
        if (tokenResponse) {
          return tokenResponse.accessToken;
        }
      } catch (e) {
        console.log("msaltest error in getAccessToken ",e)
      }
    }
  
    return null;
  };
  
  export const login = async (): Promise<string | null> => {
    try {
      console.log("msaltest login stage start")
      /////
      
      //authClient = new PublicClientApplication(config);
      //await authClient.init();
    
      /////

      const tokenResponse = await authClient.acquireToken({
        scopes: [MSAL_SCOPE],
      });

      if (tokenResponse) {
        console.log("msaltest login stage 2 ok")
        return tokenResponse.accessToken;
      }
    } catch (e) {
      console.log("msaltest error in login",e)
    }
  
    //updateIsLoggedIn(false);
    return null;
  };
  
  export const logout = async (): Promise<void> => {
    try {
      const accounts = await authClient.getAccounts();
  
      if (accounts.length > 0) {
        const account: MSALAccount = accounts[0];
        await authClient.signOut({account});
        console.log('logout successfully');
        //updateIsLoggedIn(false);
      } else {
        console.error('No accounts detected to logout.');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
