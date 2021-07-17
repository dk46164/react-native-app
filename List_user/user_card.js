import React from 'react'
import {Text, View,Modal,StyleSheet,ActivityIndicator} from 'react-native';
import { Button, Card} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import * as SecureStore from 'expo-secure-store'
import Axios from 'axios'



export default class eachUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modal_visible:false, ...this.props.item,mobile_req_clicked:false,checked_modal:true,email_Sent_loading:false,button_clicked:false}
        this.viewcontactHandler = this.viewcontactHandler.bind(this)
    }
    async componentDidMount(){
        const username = await SecureStore.getItemAsync("username")
        this.setState({username:username})
        console.log(this.props.item)
    }
    
    viewcontactHandler(){ 
        this.setState({email_Sent_loading:true,button_clicked:true,modal_visible:true})
        const timestamp_millisecods = Date.now()
        Axios.post("https://8qhtlsgil5.execute-api.us-east-1.amazonaws.com/V1_0/log-user-in-db",{"profile1":this.state.item.email,"profile2":this.state.username,"timestamp":timestamp_millisecods}).then(
            (response)=>{
                console.log(response.data)
                if(!response.data.Error){
                    this.setState({Message:response.data.Message})
                }
                else{
                    var art = response.data.Message.split(":")
                    this.setState({Message:art[1]})
                }
                this.setState({email_Sent_loading:false})
                setTimeout(()=>this.setState({modal_visible:false,button_clicked:false}),2000)
                 
            }
        ).catch(
            (error) => { console.warn(error) }
        )
        }
      
    render() {
        return (
            <View>
                <Card containerStyle={{ backgroundColor: '#336699' ,padding:2}}>
                    <View style={{flex:3,flexDirection:"column",justifyContent:"space-evenly"}}>
                        <View style={{flex:2,flexDirection:'row',justifyContent:"space-between"}}>
                            <Card.Title style={{ fontSize: 22, color: 'white' }}>{this.state.item.name}</Card.Title>
                            <Card.Title style={{ color: 'white' }}>{(this.state.item.phone_number_verified===true)?<Icon name="check-circle" size={20}/>:<Icon name="exclamation"size={25} color="yellow"/>}</Card.Title>
                        </View>
                    
                    <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Card.Title>{<Icon size={20} name='at' style={{color:"white"}} />}</Card.Title>
                        <Card.Title style={{ color: 'white' }}>{this.state.item.email}</Card.Title>
                        
                    </View>
                    </View>
                    <Card.Divider />
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Card.Title style={{ fontSize: 18, color: 'white' }}> <Icon size={20} style={{ marginLeft: 15 }} name='calendar-alt' /></Card.Title>
                        <Card.Title style={{ color: 'white' }}>{this.state.item.date}</Card.Title>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Card.Title style={{ fontSize: 18, color: 'white' }}><Icon size={20} name='city' /></Card.Title>
                        <Card.Title style={{  color: 'white' }}>{this.state.item.city}</Card.Title>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Card.Title style={{ fontSize: 18, color: 'white' }}><Icon size={20} name='tint' /></Card.Title>
                        <Card.Title style={{ color: 'white' }}>{this.state.item.bloodgroup}</Card.Title>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Card.Title style={{ fontSize: 18, color: 'white' }}>{(this.state.gender === 'male') ? <Icon size={20} name='male' /> : <Icon size={20} name='female' />}</Card.Title>
                        <Card.Title style={{ color: 'white' }}>{this.state.item.gender}</Card.Title>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Card.Title style={{ fontSize: 18, color: 'white' }}>{<Icon size={20} name='calendar-day' />}</Card.Title>
                        <Card.Title style={{ color: 'white' }}>{this.state.item.age}</Card.Title>
                    </View>
                    <Card.Divider />
                    <View><Button  type="clear" onPress = {this.viewcontactHandler} title ="View contact" containerStyle={{backgroundColor:"white"}} raised={true}/>
                     </View>
                     <View style={styles.centeredView}>
                    <Modal
                      animationType="slide"
                      transparent = {true}
                      visible={this.state.button_clicked}
                    >
                      <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        {(this.state.button_clicked)?(this.state.email_Sent_loading)? (<View >
                                            <Text style={styles.modalText}>Please wait...</Text>
                                            <Text style={styles.modalText}>You will get email with User details</Text>
                                            <ActivityIndicator color ="blue" size='large'/>
                                        </View>):
                                         (<View >
                                         <Text style={styles.modalText}>Email Sent</Text>
                                         <Icon style = {{marginLeft:21}} name = 'check-circle' color="green" size={30}/>
                                     </View>):null}
                        </View>
                       
                      </View>
                    </Modal>
                    </View>
                    
                </Card>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 2,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      
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
        textAlign: "center",
        fontSize:20
      }
});


