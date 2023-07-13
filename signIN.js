import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

GoogleSignin.configure({
  // Configure your Google API credentials here
  webClientId: 'YOUR_WEB_CLIENT_ID',
});

const SignInScreen = () => {
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // Handle the user information returned from Google sign-in
      console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Tutor.AI</Text>
      <View style={styles.formContainer}>
        <GoogleSigninButton
          style={styles.googleSignInButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInWithGoogle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24,
  },
  formContainer: {
    alignItems: 'center',
  },
  googleSignInButton: {
    width: 192,
    height: 48,
    marginBottom: 16,
  },
});

export default SignInScreen;
