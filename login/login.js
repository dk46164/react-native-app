import React from 'react'
import { Text, View, ScrollView,Button,ActivityIndicator,Modal,StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Input,Header ,Overlay} from 'react-native-elements';
import Nointernet from '../CheckInternet/nointernet'
import NetInfo from '@react-native-community/netinfo';


export default class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Error: true, message_recieved: false, button_loading_get: false, checked_modal: true, code_recieved: false, button_loading_verify: false,connection_net_reachable:true,connection_status:true}
        this.get_otp = this.get_otp.bind(this)
        this.verify_otp = this.verify_otp.bind(this)
    }
    

    async componentDidMount() {
        this.NetInfoSubscribtion = NetInfo.addEventListener(
            this._handleConnectivityChange,
          );
        const val1 = await SecureStore.getItemAsync("RefreshToken")

        const username = await SecureStore.getItemAsync("username") 

        if (val1 && username ){
            this.setState({alert_loading:true})   
          Axios.post("https://8qhtlsgil5.execute-api.us-east-1.amazonaws.com/V1_0/refresh-refreshtoken",{"username":username,"refreshToken":val1}).then(async (response)  =>{
             
          if (response.data.Error===false){
         await SecureStore.setItemAsync("AccessToken",response.data.message.AuthenticationResult.AccessToken)
         await SecureStore.setItemAsync("IdToken",response.data.message.AuthenticationResult.IdToken)
         await SecureStore.setItemAsync("Logged",'true')
         const val = await SecureStore.getItemAsync("Logged")
         this.setState({alert_loading:false},()=>(val==='true')?this.props.navigation.replace("postloginhome"):null)
         }
              
                }
          ).catch((error)=>console.warn(error))
        }
        else{
          this.setState({msg_code:3})
        }
        
    }


    get_otp() {
        this.setState({ button_loading_get: true })

        Axios.post("https://8qhtlsgil5.execute-api.us-east-1.amazonaws.com/V1_0/forgot-passward", { "username": this.state.email.replace("@","") }).then(
             (response) => {
                var arr = response.data.Message.indexOf(":")
                if (response.data.Error === false && arr == -1) {
                    this.setState({ Error: false, code_recieved: true, msg: response.data.Message, message_recieved: true })
                }
                else {
                    const art = response.data.Message.split(":")
                    this.setState({ Error: response.data.Error, msg: art[1], message_recieved: true })
                    if (response.data.Error && response.data.msg_code === 1) {
                        this.props.navigation.navigate("preloginhome",{screen:"otp", params:{ username: this.state.email, msg_code: 1 }})
                    }

                }
                
                this.setState({ button_loading_get: false })
            }

        ).catch(
            (error) => { console.warn(error) }

        )
    }
    verify_otp() {
        this.setState({ button_loading_verify: true })
        Axios.post("https://8qhtlsgil5.execute-api.us-east-1.amazonaws.com/V1_0/confirm-forgot-password", { "username": this.state.email, "code": this.state.code,msg_code:this.state.msg_code }).then(
            async (response) => {
              console.log(response.data)
                if (!response.data.Error) {
                    try {
                        
                        await SecureStore.setItemAsync("AccessToken", response.data.body.Message.AuthenticationResult.AccessToken)
                        await SecureStore.setItemAsync("IdToken", response.data.body.Message.AuthenticationResult.IdToken)
                        await SecureStore.setItemAsync("RefreshToken", response.data.body.Message.AuthenticationResult.RefreshToken)
                        await SecureStore.setItemAsync("username", this.state.email)
                       
                        if (response.data.body.phone_number_verified===false){this.props.navigation.navigate("preloginhome",{screen:'phone_verify',params:{mobile:response.data.body.phone_number}})}
                        await SecureStore.setItemAsync("Logged", "true")
                        const val  = await SecureStore.getItemAsync("Logged")
                        if(val==="true" && response.data.body.phone_number_verified){
                          this.props.navigation.replace("postloginhome")}
                    }
                    catch
                        { this.setState({ msg_Error: "BAd Newss" })}
                }
                else {
                    const art = response.data.message.split(":")
                    this.setState({ Error: response.data.Error, msg: art[1], message_recieved: true, checked_modal: true })

                }
                this.setState({ button_loading_verify: false })
            }
        ).catch(
            (error) => { console.warn(error) }

        )

    }
    componentWillUnmount() {
        this.NetInfoSubscribtion && this.NetInfoSubscribtion();
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
    

    render() {
        return (
            <ScrollView>
               <Header
        containerStyle={{
         backgroundColor: '#3D6DCC',
       }}
   centerComponent={{ text: this.props.route.name, style: { color: 'white' ,marginTop:2,fontSize:20 } }}
   leftComponent ={<Icon name="arrow-left" onPress={()=>{this.props.navigation.pop()}} size={20} color="white" style={{marginTop:6}}/>}
     />
                {(this.state.connection_net_reachable && this.state.connection_status)?
                <View>
                <Input placeholder="Email" leftIcon={<Icon
                    name='at'
                    size={24}
                    color='teal'

                />}
                    errorMessage={(!this.state.email) ? "Please Enter the email" : null}
                    onChangeText={(value) => { this.setState({ email: value }) }}
                    keyboardType="email-address" />
                {(this.state.checked_modal && this.state.message_recieved) ? <Overlay isVisible={this.state.checked_modal && this.state.message_recieved} onBackdropPress={() => { this.setState({ checked_modal: true, message_recieved: false }) }}><Text style={{ fontSize: 18, color: "red" }}>{this.state.msg}</Text></Overlay> : null}
                <Input placeholder="Code" leftIcon={<Icon
                    name='key'
                    size={24}
                    color='teal'

                />}
                    errorMessage={(String(this.state.code).length !== 6) ? "Please Enter the valid 6 digit code" : null}
                    onChangeText={(value) => { this.setState({ code: value }) }}
                    keyboardType='number-pad' />
                <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                {(!this.state.button_loading_get)?<Button  title="Get Passcode" onPress={this.get_otp} disabled={!this.state.email && !this.state.code_recieved} />:<ActivityIndicator size="large" color="#0000ff"/>}
                {(!this.state.button_loading_verify)?<Button title="Verfiy Passcode"  onPress={this.verify_otp} disabled={!this.state.code_recieved} />:<ActivityIndicator size="large" color="#0000ff"/>}
                </View>
                { (this.state.alert_loading)?
                    <View style={styles.centeredView}>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={this.state.alert_loading}
                      onRequestClose={() => this.setState({alert_loading:false})}
                    >
                      <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                          <Text style={styles.modalText}>Hold on!</Text>
                          <Text style={styles.modalText}>Logging you back </Text>
                          <ActivityIndicator color ="blue" size='large'/>
                        </View>
                       
                      </View>
                    </Modal>
            
                  </View>:null}
                  </View>
                :<Nointernet/>}
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "#ECF1F6",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation:10
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize:25
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });