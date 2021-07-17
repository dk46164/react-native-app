import React from 'react';
import { Text, View, ActivityIndicator, FlatList,} from 'react-native';
import { Input, Button,Header} from 'react-native-elements';
import Axios from 'axios';
import Nointernet from '../CheckInternet/nointernet'
import NetInfo from '@react-native-community/netinfo';
import Usercard from '../List_user/user_card';
import * as SecureStore from 'expo-secure-store'



export default class search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {connection_status: false, InputError: false, searchtext: "", items: [], searchbar_loading: false, name: 0, bloodgroup: 0, city: 0, PaginationToken: "123456789" }
        this.SearchHandler = this.SearchHandler.bind(this)
        this.apiHanlder = this.apiHanlder.bind(this)
       
    }

   async componentDidMount() {

         var username = await SecureStore.getItemAsync("username")
         this.setState({username:username.replace("@","")})
        this.NetInfoSubscribtion = NetInfo.addEventListener(
          this._handleConnectivityChange,
        );
    
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
    
  apiHanlder() {
        if (this.state.searchtext) {
            Axios.get("https://4hnfodheze.execute-api.us-east-1.amazonaws.com/V1_0/get-user-city", { params: { PaginationToken: this.state.PaginationToken, bloodgroup: this.state.bloodgroup, city: this.state.city, name: 0, searchtext: this.state.searchtext } }).then(
                (response) => {
                    {/* reason of multiple error is due to async call of setState ,as a result previous state is shown in new search result*/ }
                    var tempuser = []
                    if (Array.isArray(response.data.body.Users) && response.data.body.Users.length > 0) {

                        response.data.body.Users.map((eachuser) => {
                             if(eachuser.Username!==this.state.username)
                            {var tempobject = { date: eachuser.UserCreateDate, confimed: eachuser.UserStatus,username: eachuser.Username}
                            eachuser.Attributes.map((eachvalue) => {
                                switch (eachvalue.Name) {
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
                            })}

                            tempuser.push(tempobject)
                        })
                    }

                    this.setState({ items: [...this.state.items, ...tempuser], PaginationToken: response.data.body.PaginationToken, searchbar_loading: false }, () => console.log(this.state,"deepak....................................................."))

                }


            ).catch((error) => console.log(error))
        }
    
    }
    SearchHandler() {
        console.log("1")
        this.setState({ searchbar_loading: true, }, () => console.log("2"))
        if (/(A|B|AB|O)[+-]/.test(this.state.searchtext)) {
            this.setState({ bloodgroup: "1", InputError: false, items: [], city: 0, PaginationToken: "123456789" }, () => this.apiHanlder())
        }
        else if (/[a-zA-Z]/.test(this.state.searchtext)) {
            this.setState({ city: "1", InputError: false, items: [], bloodgroup: 0, PaginationToken: "123456789" }, () => this.apiHanlder())
        }
        else if (/^[!@#\$%\^\&*\)\(+=._-]/.test(this.state.searchtext)) {
            this.setState({ InputError: true, searchtext: "", items: [],searchbar_loading:false })

        }
        else {
            this.setState({ InputError: true, searchtext: "", items: [],searchbar_loading:false })

        }
    }



    render() {
        return (
            
                
                <View style={{ flex: 6, flexDirection:'column',alignContent:'space-between'}}>
                     <Header containerStyle={{backgroundColor: 'teal',height:65}}
                  centerComponent={{ text: "RAKTDAN", style: { color: 'white' ,marginTop:2,fontSize:22 } }} />
                    {/* SEARCH BAR INPUT*/}
                    {(!(this.state.connection_status && this.state.connection_net_reachable)) ? <Nointernet /> : <Input
                        placeholderTextColor="#336699"
                        inputStyle={{ marginLeft:20,fontSize:25,color:"#336699"}}
                        value={this.state.searchtext}
                        rightIcon={<Button  type="clear" onPress={this.SearchHandler} icon={{ name: "search", size: 30, color: "#336699" }} />}
                        inputContainerStyle={{minHeight:20}}
                        onChangeText={(value) => this.setState({ searchtext: value })}
                        errorMessage={(this.state.InputError) ? "Please Enter valid Input Excluding Special charachters ":null }
                    />}
                   

                    {/* IF NO RECORDS FOUND FOR GIVEN SEARCH KEY,THEN SHOW GIVEN COMPONENT */}
                    {(this.state.items.length === 0 && this.state.searchtext && this.state.PaginationToken !== "123456789") ?
                        <View style={{ flex: 2, flexDirection: "column" }}>
                            <Button type="clear" icon={{ name: "mood-bad", size: 50, color: "teal" }} />
                            <Text style={{ textAlign: "center", marginLeft: 50, fontSize: 18 }}>Sorry,Nothing Found on SearhKey <Text style={{ color: "blue" }}>{this.state.searchtext}</Text>.</Text>
                        </View>
                        : null}

                    {/* ACTIVITY SPINNER  */}
                    {(this.state.searchbar_loading) ? <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 150, alignContent: "center" }} /> : null}

                    {/*FLATLIST FOR RENDERING THE COMPONENT IF RECORD IS FOUND */}
                    {(!this.state.searchbar_loading && this.state.items.length > 0) ? <FlatList
                        data={this.state.items}
                        ListFooterComponent={(this.state.PaginationToken === undefined && this.state.items.length > 0) ? ()=><Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18, color: "#336699",color: "orange" }}>||अन्तम् ||</Text>:<ActivityIndicator size="large" color="#0000ff" style={{ alignContent: "center" }} />}
                        renderItem={(item) => (<Usercard key={item.index} item={item} />)}
                        keyExtractor={(items) => items.email}
                        onEndReachedThreshold={.1}
                        onEndReached={(items)=>console.log(items,"deepak...................")}
                    /> : null}

                    
                </View>
               
            
        )

    }
}