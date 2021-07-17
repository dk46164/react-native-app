import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {Header} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Table, TableWrapper, Row } from 'react-native-table-component';
 
export default class ExampleThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['S.I no', 'Email', 'Date', 'Time'],
      widthArr :[97,105,97,97]
    }
  }
 
  render() {
    const state = this.state;
    let dee = "200`dk2asfggf@gmail.com.in`2018-12-25`09:27:53"
    const tableData = [];

    for (let i = 0; i < 30; i += 1) {
      tableData.push(dee.split('`'));
    }
 
    return (
        <View style={{flex:2,flexDirection:"column"}}>
        <Header
        containerStyle={{
         backgroundColor: '#3D6DCC',
       }}
   centerComponent={{ text: this.props.route.name, style: { color: 'white' ,marginTop:2,fontSize:20 } }}
   leftComponent ={<Icon name="arrow-left" onPress={()=>{this.props.navigation.pop()}} size={20} color="white" style={{marginTop:6}}/>}
     />
      <View style={styles.container}>
          
        <ScrollView>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} style={styles.header} textStyle={{color:"white",paddingLeft:8,fontSize:20}}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1,backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#336699' },
  text: { textAlign: 'center', fontWeight:"300",color:"black",fontSize:17,paddingTop:3},
  dataWrapper: { marginTop: -1 },
  row: { height: 85, backgroundColor: '#E7E6E1' }
});