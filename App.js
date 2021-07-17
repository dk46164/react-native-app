/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';



import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from './homeScreen/home'
import Register from './Register/register'
import Otp from './Register/otp'
import Login from './login/login';
import Profile from './myaccount/myprofile'
import Usercard from './List_user/list_user';
import Search from './searchbar/searchbar'
import Icon from "react-native-vector-icons/FontAwesome5";
import Table from './myaccount/table'
import Test from './homeScreen/test'
import Phone_verify from './login/phone_verify'


const ApptabNavigator =  createBottomTabNavigator()
const PreloginStacknavigator = createStackNavigator()
const rootStacknavigator = createStackNavigator()
const MyprofileStackNavigator = createStackNavigator()

const MyprofileStackNavigatorRoutes =()=>(
  <MyprofileStackNavigator.Navigator initialRouteName="Profile"  screenOptions={{headerShown:false}} >
    <MyprofileStackNavigator.Screen name="Profile"  component={Profile} 
     />
    <MyprofileStackNavigator.Screen name="view Requested profile" component={Table}/>
    <MyprofileStackNavigator.Screen name="your's Requested profile" component={Table}/>
  </MyprofileStackNavigator.Navigator>
)

const tabnavigator = ()=>(
    <ApptabNavigator.Navigator tabBarOptions={{ showIcon: true,
      activeTintColor: '#336699',
      labelStyle:{fontSize:15}
     }}>
        <ApptabNavigator.Screen name="tabhome" component={Usercard} options={{title:"",tabBarLabel:"Home" ,tabBarIcon: ({color}) => (<Icon name="home" color={color} size={24}/>),}}/>
       <ApptabNavigator.Screen name="profilesearch" component={Search} options={{title:"", tabBarLabel:"Search" ,tabBarIcon: ({color}) => (<Icon name="search" color={color}  size={24}/>),}} />
        <ApptabNavigator.Screen name="profile" component={MyprofileStackNavigatorRoutes} options={{title:"", tabBarLabel:"Profile", tabBarIcon: ({color}) =>(<Icon name="user-alt"  color={color} size={24}/>),}}/>
    
        </ApptabNavigator.Navigator>
)

const preloginStack  = ()=>(
    <PreloginStacknavigator.Navigator initialRouteName ="stackhome"  screenOptions={{headerShown:false}} >
        <PreloginStacknavigator.Screen name="test" component={Test}/>
        <PreloginStacknavigator.Screen name = "stackhome" component={Home}/>
        <PreloginStacknavigator.Screen name = "register" component={Register}/>
        <PreloginStacknavigator.Screen name="otp" component={Otp}/>
<PreloginStacknavigator.Screen name ="login" component={Login}/>
<PreloginStacknavigator.Screen name ="phone_verify" component={Phone_verify}/>
    </PreloginStacknavigator.Navigator>
)


export default class App extends React.Component {

  render(){
  return (
    <NavigationContainer>
      <rootStacknavigator.Navigator>
        <rootStacknavigator.Screen name="preloginhome" component={preloginStack} options={{headerShown:false}}/>
        <rootStacknavigator.Screen name="postloginhome" component={tabnavigator} options={{headerShown:false,title:"Raktdan"}}/>
      </rootStacknavigator.Navigator>
    </NavigationContainer>
  );
}
}

