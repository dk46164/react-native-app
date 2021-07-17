import React from 'react'
import { ScrollView, Text, View,ActivityIndicator,Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Input,Header} from 'react-native-elements'
import Axios from 'axios';

export default class otp extends React.Component {
    constructor(props) {
        super(props)
        this.state = { otp: 0,username:this.props.route.params.username,checked_modal:false,Error:false,submit_button:false,resend_button:false}
        this.submitotp = this.submitotp.bind(this)
        this.resendotp=this.resendotp.bind(this)
    }
    componentDidMount()
    {  console.log(this.props)
        if(this.props.route.params.msg_code===1){
            this.resendotp()
        }
    }
    submitotp() {
        Axios.post("https://8qhtlsgil5.execute-api.us-east-1.amazonaws.com/V1_0/confirm-singup",{username:this.state.username,code:this.state.otp}).then(
            (response)=>{
                console.log(response.data)
                this.setState({submit_button:true})
                var arr= response.data.Message.indexOf(":")
                if (arr==-1 && !response.data.Error){
                    this.setState({Error:response.data.Error,code:""},()=>{this.props.navigation.popToTop()})
                }
                else{
                    const art = response.data.Message.split(":")
                    this.setState({Error:response.data.Error,msg:art[1],checked_modal:true,submit_button:false})

                }

              
            }
        ).catch(
            (error)=>{console.log(error)}
        )
    }
   resendotp()
   {
       
    Axios.post("https://8qhtlsgil5.execute-api.us-east-1.amazonaws.com/V1_0/resend-otp",{username:this.props.route.params.username}).then(
        (response)=>{
            console.log(response.data)
            this.setState({resend_button:true})
            var arr= response.data.Message.indexOf(":")
                if (arr==-1 && !response.data.Error){
                    this.setState({Error:response.data.Error,msg:response.data.Message,checked_modal:true,resend_button:false})
                }
                else{
                    const art = response.data.Message.split(":")
                    this.setState({Error:response.data.Error,msg:art[1],checked_modal:true,resend_button:false})

                }
           
            }
    ).catch(
        (error)=>{console.log(error)}
    )
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
                <Icon name="heartbeat" style={{ color: "red", flexDirection: 'row', alignContent: 'center', marginStart: 150,marginTop:50 }} size={45} />
                <Text style={{ marginTop:21, fontSize: 18, marginLeft: 9, }} >
                    Thank you for support in registeritng.Please enter the
                    otp ,you recieved on Registerd Number to complete the process
                </Text>
                <View style={{flex:2,flexDirection:'row',justifyContent:'space-evenly'}}>
                <Icon
                            name='at'
                            size={24}
                            color='teal'
                        />
                        <Text style={{fontSize:18,color:'teal'}}>{this.props.route.params.username}</Text>
                </View>
                <Input
                    placeholder='Please Type OTP Here'
                    leftIcon={
                        <Icon
                            name='key'
                            size={24}
                            color='teal'
                        />
                    }
                    keyboardType='numeric'
                    onChangeText={(value) => this.setState({otp:value})}
                    style={{ marginTop: 10, marginLeft: 20 }}
                    errorMessage={(String(this.state.otp).length!==6)?"Please Enter the valid 6 digit code":null}
                />
                <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-around' }}>
                {(this.state.submit_button)?<Button  title="Verify Passcode" onPress={this.submitotp} disabled={(String(this.state.otp).length!==6)} />:<ActivityIndicator size="large" color="#0000ff"/>}
                {(this.state.resend_button)?<Button title="Resend Passcode"  onPress={this.resendotp} />:<ActivityIndicator size="large" color="#0000ff"/>}
                </View>
                <Text style={{color:'black',fontSize:17,alignContent:'center',marginTop:20,fontStyle:'italic'}}>{this.state.msg}</Text>
            </ScrollView>

        )
    }
}
