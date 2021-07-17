import React from 'react'
import { FlatList, View, Alert, BackHandler,TouchableOpacity } from 'react-native';
import CardItem from './user_card'
import Nointernet from '../CheckInternet/nointernet'
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Header} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store'



export default class listUser extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      connection_status:true,
      connection_net_reachable:true,
      items: [
        {
        name: "deepak",
        email: "dk4614@gmail.com",
        bloodgroup: "O+",
        city: "adaf",
        age: "22",
        gender: "male",
        date: "jioned on 23",
        phone_number_verified:true
      },

      {
        name: "deepak",
        email: "dk464@gmail.com",
        bloodgroup: "Ab+",
        city: "adaf",
        age: "22",
        gender: "male",
        date: "jioned on 23",
        phone_number_verified:true
      },
      {
        name: "deepak",
        email: "dk64@gmail.com",
        bloodgroup: "A+",
        city: "adaf",
        age: "22",
        gender: "male",
        date: "jioned on 23",
        phone_number_verified:false
      }

      ]
    }

    this.backAction = this.backAction.bind(this)
  }
 async componentDidMount() {
   const access = await SecureStore.getItemAsync("IdToken")
   console.log(access)
   const username = await SecureStore.getItemAsync("username")
   this.setState({username:username.replace("@","")})
    this.NetInfoSubscribtion = NetInfo.addEventListener(
      this._handleConnectivityChange,
    );
    BackHandler.addEventListener("hardwareBackPress", this.backAction);

  }

  componentWillUnmount() {
    this.NetInfoSubscribtion && this.NetInfoSubscribtion();
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }
  

  _handleConnectivityChange = (state) => {
    this.setState({
      connection_status: state.isConnected,
      connection_type: state.type,
      connection_net_reachable: state.isInternetReachable,
      connection_wifi_enabled: state.isWifiEnabled,
      connection_details: state.details,
    })
  }


  backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to exit app?", [
      {
        text: "Cancel",
        onPress: () => console.log(this.state),
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };


    



  render() {
    return (
     
      <View style={{ flex: 2, flexDirection: 'column' }}>
         <Header containerStyle={{backgroundColor: 'teal',height:65}}
                  centerComponent={{ text: "RAKTDAN", style: { color: 'white' ,marginTop:2,fontSize:22 } }} />
       {(this.state.connection_status && this.state.connection_net_reachable)? <FlatList
          data={this.state.items}
          renderItem={(item) => (<CardItem key={item.index} item={item} />)}
          keyExtractor={(item) => item.email}
          onEndReachedThreshold={.1}
          onEndReached={this.backAction}
        />:<Nointernet/>}
      </View>
  

    )
  }


}
