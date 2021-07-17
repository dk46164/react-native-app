import React, { Component } from 'react';
import {ImageBackground,View,ActivityIndicator} from 'react-native'
import Image_splash from  '../assets/pic1.png'


class splash extends Component {
    render() {
        return (
            <View style = {{ flex:2,flexDirection:'column',backgroundColor:"white"}}>
                <ImageBackground source ={Image_splash} resizeMode='center' style = {{justifyContent:'center',marginTop:180}}>
<ActivityIndicator color="red" size="large" style = {{marginTop:200}}/>
</ImageBackground>
</View>
            
        );
    }
}

export default splash;