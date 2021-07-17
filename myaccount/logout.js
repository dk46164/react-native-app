import React from 'react'
import {  Text, View ,TouchableOpacity,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Header} from 'react-native-elements'
import Axios from 'axios';



export default class otp extends React.Component {
    constructor(props) {
        super(props)}
        
render(){
    return(
     <View style={{flex:2,flexDirection:'column'}}>
       <Header
       containerStyle={{
        backgroundColor: '#3D6DCC',
      }}
  centerComponent={{ text: this.props.route.name, style: { color: 'white' ,marginTop:2,fontSize:22 } }}
  leftComponent ={<TouchableOpacity><Icon name="arrow-left" onPress={()=>{this.props.navigation.pop()}} size={20} color="white" style={{marginTop:6}}/></TouchableOpacity>}
    />
     </View>
        
    )
}
}
