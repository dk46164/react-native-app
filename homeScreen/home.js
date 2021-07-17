import React from 'react'
import { Button, Text, View, Image,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Splash from '../splash/splash'
import * as SecureStore from 'expo-secure-store';
import { Header } from 'react-native-elements'
import Image_splash from '../assets/pic3.jpg'

export default class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = { aftermount: "", visible: false }
    }
    async componentDidMount() {
        
        setTimeout(() => this.setState({ visible: true }), 2000)
    }

    render() {
        return (
            <View style={{ backgroundColor: "#edeae1", flex: 2 }}>
                {(this.state.visible) ? <View>
                    <Header containerStyle={{ backgroundColor: 'white',height:70,marginTop:5 }}
                       rightComponent = {<View style = {{marginLeft:10}}><TouchableOpacity style={{height: 30,justifyContent: 'center',alignItems: 'center',marginBottom:10,width: 80,borderRadius: 30,backgroundColor: "blue",}} onPress={() => this.props.navigation.navigate("preloginhome", { screen: "login" })}>
                       <Text style={{ fontSize: 20, color: 'white' }}>Login</Text>
                   </TouchableOpacity></View>}
                        centerComponent={<View style={{ flex: 2, flexDirection: 'row',justifyContent:'space-evenly',marginLeft:15 }}>
                            <Text style={{ fontSize: 20, color: 'blue',marginRight:20,fontWeight:'400',marginTop:5}}>e RaktDan</Text>
                            <TouchableOpacity style={{height: 30,justifyContent: 'center',alignItems: 'center',marginBottom:10,width: 80,borderRadius: 30,backgroundColor: "blue",}} onPress={() => this.props.navigation.navigate("preloginhome", { screen: "register" })}>
                                <Text style={{ fontSize: 20, color: 'white' }}>Register</Text>
                            </TouchableOpacity>
                        </View>}
                        leftComponent={<Image source={Image_splash} resizeMode='contain' style={{ borderRadius: 10, borderColor: 'white', height: 30, width: 30, marginTop:5}} />}
                    />
                </View> : <Splash />}
            </View>
        )

    }
}