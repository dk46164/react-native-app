import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {ListItem ,Header,Divider} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5'
import * as SecureStore from 'expo-secure-store';
import Axios from "axios";
import Nointernet from '../CheckInternet/nointernet'
import NetInfo from '@react-native-community/netinfo';

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = { uri: 'https://ui-avatars.com/api/', intial_loading: true ,connection_status:true,connection_net_reachable:true}
  }


  async componentDidMount() {
    
    this.NetInfoSubscribtion = NetInfo.addEventListener(
      this._handleConnectivityChange,
    );
    const username = await SecureStore.getItemAsync('username');
    var temp = this.state.uri + `?name=${username[0]}+${username[1]}&rounded=true&size=135`
    this.setState({ uri: temp })
    Axios.get(" https://4hnfodheze.execute-api.us-east-1.amazonaws.com/V1_0/get-user-info", { params: { 'username': username } }).then((response) => {
      console.log(response.data)
      if (!response.data.body.Error) {
        var tempobject = { "username": response.data.body.Username }
        response.data.body.UserAttributes.map((eachvalue) => {
          switch (eachvalue.Name) {
            case "UserStatus":
              tempobject.confirmed = eachvalue.Value
              break;
            case "UserCreateDate":
              tempobject.UserCreateDate = eachvalue.Value
              break;
            case "phone_number":
              tempobject.phone_number = eachvalue.Value
              break;
            case "gender":
              tempobject.gender = eachvalue.Value
              break;
            case "name":
              tempobject.name = eachvalue.Value
              break;
            case "phone_number_verified":
              tempobject.phone_number_verified = eachvalue.Value
              break;
            case "preferred_username":
              tempobject.city = eachvalue.Value
              break;
            case "given_name":
              tempobject.age = eachvalue.Value;
              break;
            case "family_name":
              tempobject.bloodgroup = eachvalue.Value;
              break;
            case "email":
              tempobject.email = eachvalue.Value;
              break;
            default:
              break;
          }
        })
        this.setState({ ...tempobject, intial_loading: false }, () => console.log(this.state))
      }
    })
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
  componentWillUnmount() {
    this.NetInfoSubscribtion && this.NetInfoSubscribtion();
  }
  render() {
    return (
      <View style={styles.container}>
        <Header containerStyle={{backgroundColor: 'white',height:60}}
                  centerComponent={{ text: "RAKTDAN", style: { color: 'teal' ,marginTop:17,fontSize:22 } }} 
                rightComponent = { <TouchableOpacity style={styles.buttonContainer}  onPress={()=>{this.props.navigation.replace("preloginhome")}}>
                <Text style={{ fontSize: 20, color: 'white' }}>Logout</Text>
              </TouchableOpacity>}
                />
      { (!this.state.connection_net_reachable && !this.state.connection_status)?<Nointernet/>:
        (!this.state.intial_loading ) ?
          <ScrollView >
            
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{ uri: this.state.uri }} />
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Text style={styles.name}>{this.state.name}</Text>
                <Text style={styles.info}><Icon color='black' size={25} name='map-marker-alt' /> <Text>{this.state.city}</Text></Text>
                <Text style={styles.description}><Text style={{ fontSize: 20, color: "#336699", fontWeight: 'bold' }}> Email</Text><Text style={{ fontSize: 20, color: 'black' }}>            {this.state.email}</Text> </Text>
                <Text style={styles.description}><Text style={{ fontSize: 20, color: "#336699", fontWeight: 'bold' }}>BloodGroup                              </Text><Text style={{ fontSize: 25, color: 'black' }}>     {this.state.bloodgroup}</Text> </Text>
                <Text style={styles.description}><Text style={{ fontSize: 20, color: "#336699", fontWeight: 'bold' }}>Phone Number</Text><Text style={{ fontSize: 20, color: 'black' }}>     {this.state.phone_number}</Text> </Text>
                <Text style={styles.description}><Text style={{ fontSize: 20, color: "#336699", fontWeight: 'bold' }}>Gender                     </Text><Text style={{ fontSize: 20, color: 'black' }}>{this.state.gender}</Text> </Text>
                <Text style={styles.description}><Text style={{ fontSize: 20, color: "#336699", fontWeight: 'bold' }}>Age                     </Text><Text style={{ fontSize: 20, color: 'black' }}>{this.state.age}</Text> </Text>
                <Divider style={{ backgroundColor: 'blue' }} />

              </View>
            </View>
            <ListItem  Component={TouchableScale} friction={90}
              tension={100} 
              activeScale={0.95} //
              linearGradientProps={{
                colors: ['#F44336','#FF9800'],
                start: { x: 1, y: 0 },
                end: { x: 0.2, y: 0 },
              }}
              ViewComponent={LinearGradient} 
              onPress={()=>this.props.navigation.navigate("profile",{screen:"view Requested profile"})}
            >
              <ListItem.Content style={{borderRadius:30,width:170,height:30}}>
                <ListItem.Title style={{ color: 'white', fontWeight: 'bold',fontSize:22,marginBottom:10}}>Viewed Profile</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron color="white" size={40} />
            </ListItem>
            <View style={{height:10}}></View>
            <ListItem  Component={TouchableScale} friction={90}
              tension={100} 
              activeScale={0.95} //
              linearGradientProps={{
                colors: ['#F44336','#FF9800'],
                start: { x: 1, y: 0 },
                end: { x: 0.2, y: 0 },
              }}
              ViewComponent={LinearGradient} 
              onPress={()=>this.props.navigation.navigate("profile",{screen:"your's Requested profile"})}
            >
              <ListItem.Content   style={{borderRadius:30,width:170,height:30}}>
                <ListItem.Title style={{ color: 'white', fontWeight: 'bold',fontSize:22}}>Requested Profile</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron color="white"  size={40}/>
            </ListItem> 
                
            </ScrollView> : <ActivityIndicator style={{ marginTop: 150 }} size='large' color='blue'></ActivityIndicator>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 95,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 30
  },
  name: {
    marginTop: 98,
    fontSize: 27,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 25,
    color: "#336699",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 20,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 100,
    borderRadius: 30,
    backgroundColor: "teal",
  },
});
