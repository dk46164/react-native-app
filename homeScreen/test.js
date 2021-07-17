import React, { Component } from "react";
import { 
  Modal,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native";

class App extends Component {
  state = {
    modalVisible: true,sent:false
  };

  

  render() {
    const { modalVisible } = this.state;
    setTimeout(()=>this.setState({sent:true}),10000)
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => this.setState({modalVisible:false})}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hold on!</Text>
              <Text style={styles.modalText}>Logging you back </Text>
              {(this.state.sent==false)?<ActivityIndicator color ="blue" size='large'/>:<Text>sent</Text>}
            </View>
           
          </View>
        </Modal>

      </View>
    );
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

export default App;