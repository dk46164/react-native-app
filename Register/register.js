import React from 'react'
import { ScrollView,View,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Input, Button, CheckBox, Overlay,Text,Header } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { HeaderTitle } from '@react-navigation/stack';
import Axios from 'axios'

export default class register extends React.Component {
    constructor(props) {
        super(props);
        this.state = { checked: false, checked_modal: false,Error:false,checked_modal1:true,submit_button:false }
        this.register = this.register.bind(this)
    }
    
    register() {
        this.setState({submit_button:true})
        Axios.post("https://8qhtlsgil5.execute-api.us-east-1.amazonaws.com/V1_0/singup",{"name":this.state.name,"phonenumber":this.state.mobile,"city":this.state.city,"bloodgroup":this.state.bloodgroup,"gender":this.state.gender,"age":this.state.age,"email":this.state.email}).then(
            (response)=>{
                var arr= response.data.Message.indexOf(":")
                if (arr==-1 && response.data.Error===false){
                    this.setState({Error:response.data.Error,msg:response.data.Message},()=>{this.props.navigation.navigate("preloginhome",{screen:"otp",params:{username:this.state.email,msg_code:1}})})
                }
                if (response.data.Error===true){
                    const art = response.data.Message.split(":")
                    console.log(art)
                    this.setState({Error:response.data.Error,msg:art[1],checked_modal1:true})

                }
                
            this.setState({submit_button:false})
            }
        ).catch(
            function (error) {
                console.log(error);
              }
        )
    }
    render() {
        return (
            <View>
                <Header
        containerStyle={{
         backgroundColor: '#3D6DCC',
       }}
   centerComponent={{ text: this.props.route.name, style: { color: 'white' ,marginTop:2,fontSize:20 } }}
   leftComponent ={<Icon name="arrow-left" onPress={()=>{this.props.navigation.pop()}} size={20} color="white" style={{marginTop:6}}/>}
     />
            <ScrollView style={{ marginTop: 10 }} >
                <Input
                    placeholder=' Name'
                    onChangeText={(value) => { this.setState({ name: value }) }}
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='teal'
                        />
                    }
                    keyboardType='name-phone-pad'
                    errorMessage={(!this.state.name)?"Please Enter the name":null}
                />
                <Input placeholder="Email" leftIcon={<Icon
                    name='at'
                    size={24}
                    color='teal'
                    
                />}
                errorMessage={(!this.state.email)?"Please Enter the email":null}
                onChangeText={(value)=>{this.setState({email:value})}}
                keyboardType="email-address"/>

                <Input
                    placeholder=' Contact No.,'
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    onChangeText={(value) => {this.setState({ mobile: value }) }}
                    leftIcon={
                        <Icon
                            name='mobile-alt'
                            size={24}
                            color='teal'
                        />
                    }
                    keyboardType='numeric'
                    errorMessage={(String(this.state.mobile).length!==10)?"Please Enter the valid 10 digit mobile":null}
                    maxLength={10}
                    min
                />

                <Input 
                    placeholder=' Your current City'
                    leftIcon={
                        <Icon
                            name='city'
                            size={24}
                            color='teal'
                        />

                    }
                    onChangeText={(value) => {this.setState({ city: value }) }}
                    keyboardType='ascii-capable'
                    errorMessage={(!this.state.city)?"Please Enter the city":null}
                />

                <View style={{ flex: 2, flexDirection: 'row' }}>

                    <View style={{ flex: 2, flexDirection: "column" }}>
                        <HeaderTitle style={{ marginBottom: 2, marginLeft: 5, color: 'teal' }}>
                            BloodGroup
                        </HeaderTitle>
                        <View style={{ flex: 2, flexDirection: 'row' }}>
                            <Icon
                                name='tint'
                                size={24}
                                color='red'
                                style={{ marginLeft: 8 }}
                            />
                            <Picker
                               selectedValue={this.state.bloodgroup}
                                style={{ height: 50, width: 130, marginTop: -13 }}
                                onValueChange={(itemValue, itemIndex) =>{ 
                                    this.setState({ bloodgroup: itemValue })}
                                }>
                                <Picker.Item label=""/>
                                <Picker.Item label="AB+" value="AB+" />
                                <Picker.Item label="AB-" value="AB-" />
                                <Picker.Item label="B+" value="B+" />
                                <Picker.Item label="B-" value="B-" />
                                <Picker.Item label="A+" value="A+" />
                                <Picker.Item label="A-" value="A-" />
                                <Picker.Item label="O+" value="O+" />
                                <Picker.Item label="O-" value="O-" />
                            </Picker>
                        </View>

                    </View>
                    <View style={{ flex: 2, flexDirection: 'column' }}>
                        <HeaderTitle style={{ marginBottom: 2, marginLeft: 5, color: 'teal' }}>Gender</HeaderTitle>
                        <View style={{ flex: 2, flexDirection: 'row' }}>
                            <Icon
                                name='female'
                                size={24}
                                color='black'
                                style={{ marginLeft: 8 }}
                            />
                            <Picker
                            selectedValue={this.state.gender}
                                style={{ height: 50, width: 130, marginTop: -13 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    {
                                    this.setState({ gender: itemValue })
                                    }
                                }>
                                <Picker.Item label=""/>
                                <Picker.Item label="Male" value="male" />
                                <Picker.Item label="Female" value="female" />
                            </Picker>
                        </View>
                    </View>

                    <View>

                    </View>
                </View>
                <Input placeholder=" Age" leftIcon={<Icon
                    name='calendar-alt'
                    size={24}
                    color='black'
                    
                />}
                errorMessage={(!this.state.age || !(this.state.age>=18 && this.state.age<150))?"Please Enter the valid age":null}
                onChangeText={(value)=>{this.setState({age:value})}}
                keyboardType='numeric' />
                <CheckBox
                    title='Please Read T&C'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={this.state.checked}
                    onPress={() =>{ this.setState({ checked: !this.state.checked, checked_modal: true })}}
                />


                <Overlay isVisible={this.state.checked_modal} onBackdropPress={() => { this.setState({ checked_modal: !this.state.checked_modal,modal_clicked:true }) }}>
                    <Text>We will make sure we don't share any information with anyone,& we also respect your privacy at any cost.</Text>
                </Overlay>


                 <TouchableOpacity>
                <Button loading={this.state.submit_button} onPress={this.register} disabled={!( this.state.email  && this.state.modal_clicked && this.state.name && this.state.mobile && this.state.city && this.state.bloodgroup && this.state.gender && (this.state.age>=18 && this.state.age<150))}  title="Submit" buttonStyle={{marginLeft:100,width:150,height:40,backgroundColor:'teal',marginBottom:8}} titleStyle={{fontSize: 20}}/>
                </TouchableOpacity>
                {(this.state.Error)?<Overlay isVisible={this.state.checked_modal1} onBackdropPress={()=>{this.setState({checked_modal1:false})}}><Text h4 h4Style={{color:'teal'}}>{this.state.msg}</Text></Overlay>:null}
    
            </ScrollView>
            </View>
        )
    }

}

