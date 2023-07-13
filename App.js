import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignIn = () => {
    console.log('Username:', username);
    console.log('Password:', password);

    // Add logic to check if the entered username and password are correct
    if (username === 'admin' && password === 'password') {
      navigation.navigate('Main');
    } else {
      Alert.alert('Invalid Credentials', 'Please enter a valid username and password.');
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('SignUp');
  };

  const handleForgotPassword = () => {
    Alert.prompt(
      'Forgot Password',
      'Enter your email address to reset your password',
      (email) => {
        if (email) {
          console.log('Reset password email sent to:', email);
          // Set the resetEmail state variable here
          Alert.alert(
            'Password Reset',
            'A password reset email has been sent to your email address.'
          );
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Tutor.AI</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Username"
          placeholderTextColor="#fff"
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#fff"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.signInBtn} onPress={handleSignIn}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.createAccountBtn} onPress={handleCreateAccount}>
        <Text style={styles.createAccountText}>If new, create an account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPasswordBtn} onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    // Add logic to sign up the user with the entered email and password
    // ...

    // After signing up, navigate to the main screen
    navigation.navigate('Main');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Create Account</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#fff"
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#fff"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Confirm Password"
          placeholderTextColor="#fff"
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
        />
      </View>
      <TouchableOpacity style={styles.signInBtn} onPress={handleSignUp}>
        <Text style={styles.signInText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.goBackBtn} onPress={handleGoBack}>
        <Text style={styles.goBackText}>Do you already have an account?</Text>
      </TouchableOpacity>
    </View>
  );
};

const MainScreen = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [requests, setRequests] = useState([]); // New state to store the requests
  const navigation = useNavigation();

  const subjects = [
    'Math',
    'Science',
    'Social Studies',
    'English',
    // Add more subjects here if needed
  ];

  const handleSubjectSelection = (subject) => {
    setSelectedSubject(subject);
    setResponse('');
  };

  const handleAskQuestion = () => {
    if (!selectedSubject) {
      Alert.alert('No Subject Selected', 'Please select a subject first.');
      return;
    }

    if (!question) {
      Alert.alert('No Question', 'Please enter a question.');
      return;
    }

    console.log('Subject:', selectedSubject);
    console.log('Question:', question);

    const newRequest = {
      subject: selectedSubject,
      question: question,
      timestamp: new Date().toISOString(),
    };

    // Add the new request to the requests list
    setRequests((prevRequests) => [...prevRequests, newRequest]);

    // Clear the question input
    setQuestion('');
  };

  const handleConnectWithStudents = () => {
    navigation.navigate('Connect', { requests });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Tutor.AI</Text>
      <Text style={styles.mainText}>Select a subject to be tutored in:</Text>
      <ScrollView contentContainerStyle={styles.subjectContainer} horizontal={true}>
        <TouchableOpacity style={[styles.subjectButton, styles.connectButton]} onPress={handleConnectWithStudents}>
          <Text style={[styles.subjectButtonText, styles.connectButtonText]}>Connect with other students</Text>
        </TouchableOpacity>
        {subjects.map((subject, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.subjectButton,
              selectedSubject === subject ? styles.selectedSubjectButton : null,
            ]}
            onPress={() => handleSubjectSelection(subject)}
          >
            <Text style={styles.subjectButtonText}>{subject}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.questionLabel}>Ask a question:</Text>
      <TextInput
        style={styles.questionInput}
        placeholder="Enter your question"
        placeholderTextColor="#999"
        value={question}
        onChangeText={setQuestion}
      />
      <TouchableOpacity style={styles.askButton} onPress={handleAskQuestion}>
        <Text style={styles.askButtonText}>Ask</Text>
      </TouchableOpacity>
      {response ? (
        <ScrollView style={styles.responseContainer}>
          <Text style={styles.responseText}>{response}</Text>
        </ScrollView>
      ) : null}
    </View>
  );
};

const ConnectScreen = ({ route, navigation }) => {
  const { requests } = route.params;

  const handleFindStudyPartner = () => {
    // Logic for finding a study partner goes here
    // ...
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Tutor.AI</Text>
      <Text style={styles.mainText}>Connect with other students</Text>
      <TouchableOpacity style={styles.findStudyPartnerBtn} onPress={handleFindStudyPartner}>
        <Text style={styles.findStudyPartnerText}>Find a Study Partner</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.requestsContainer}>
        {requests.map((request, index) => (
          <View key={index} style={styles.requestItem}>
            <Text style={styles.requestSubject}>{request.subject}</Text>
            <Text style={styles.requestQuestion}>{request.question}</Text>
            <Text style={styles.requestTimestamp}>{request.timestamp}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Connect" component={ConnectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#151515',
  },
  logo: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 50,
  },
  inputView: {
    backgroundColor: '#333',
    borderRadius: 10,
    width: '70%',
    height: 45,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  signInBtn: {
    width: '70%',
    backgroundColor: '#fb5b5a',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  signInText: {
    color: 'white',
    fontSize: 16,
  },
  createAccountBtn: {
    marginTop: 10,
  },
  createAccountText: {
    color: '#999',
    fontSize: 14,
  },
  forgotPasswordBtn: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#999',
    fontSize: 14,
  },
  mainText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  subjectContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  subjectButton: {
    backgroundColor: '#fb5b5a',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  selectedSubjectButton: {
    backgroundColor: '#ff7f7e',
  },
  subjectButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  connectButton: {
    backgroundColor: 'grey',
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  questionLabel: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  questionInput: {
    backgroundColor: '#333',
    borderRadius: 10,
    width: '70%',
    height: 45,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#fff',
  },
  askButton: {
    width: '70%',
    backgroundColor: '#fb5b5a',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  askButtonText: {
    color: 'white',
    fontSize: 16,
  },
  responseContainer: {
    backgroundColor: '#333',
    borderRadius: 10,
    width: '70%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
    maxHeight: 150,
  },
  responseText: {
    color: '#fff',
  },
  requestsContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  requestItem: {
    backgroundColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  requestSubject: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  requestQuestion: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  requestTimestamp: {
    color: '#999',
    fontSize: 12,
  },
  goBackBtn: {
    marginTop: 10,
  },
  goBackText: {
    color: '#999',
    fontSize: 14,
  },
  findStudyPartnerBtn: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: '#fb5b5a',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  findStudyPartnerText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
