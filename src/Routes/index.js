import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import {useSelector} from 'react-redux';
import Loader from '../components/Loader';
import AudioRecording from '../screens/AudioRecording';
const Stack = createStackNavigator();
export default function Routes() {
  const isLogin = useSelector((state) => state.Auth.isLogin);
  return (
    <NavigationContainer>
      <Loader />
      {!isLogin ? (
        <Stack.Navigator initialRouteName="Login" headerMode="none">
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="AudioRecording" headerMode="none">
          <Stack.Screen name="AudioRecording" component={AudioRecording} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
