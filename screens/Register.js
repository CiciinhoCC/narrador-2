import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Text
} from "react-native";
import firebase from "firebase"
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

const appIcon = require("../assets/logo.png");

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmar: "",
      nome: "",
      sobrenome: "",
      fontsLoaded: false
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  registerUser = (email,password,confirmar,nome,sobrenome) => {
    if(password === confirmar){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            Alert.alert("Usuário crido :)")
            this.props.navigation.replace("Login")
            firebase.database().ref("/users/" + userCredential.user.uid).set({nome: nome,
            sobrenome: sobrenome,
            email: email,
            current_theme: "dark"
        })
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            Alert.alert(errorMessage);
        });
    }
    else{
        Alert.alert("Tem dislexia pra não saber escrever a tua senha mais de uma vez?")
    }
  }


  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      const { email, password, nome, sobrenome, confirmar} = this.state;

      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />

          <Text style={styles.appTitleText}>Registrar</Text>

          <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ nome: text })}
            placeholder={"Nome"}
            placeholderTextColor={"#FFFFFF"}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ sobrenome: text })}
            placeholder={"Sobrenome"}
            placeholderTextColor={"#FFFFFF"}
          />


          <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ email: text })}
            placeholder={"Digite o e-mail"}
            placeholderTextColor={"#FFFFFF"}

          />
          <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ password: text })}
            placeholder={"Digite a senha"}
            placeholderTextColor={"#FFFFFF"}
            secureTextEntry
          />
          <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ confirmar: text })}
            placeholder={"Digite a senha denovo só pra ter certeza"}
            placeholderTextColor={"#FFFFFF"}
            secureTextEntry
          />



          <TouchableOpacity
            style={[styles.button, { marginTop: 20 }]}
            onPress={this.registerUser(email,password,confirmar,nome,sobrenome)}
          >
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
          
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
    alignItems: "center",
    justifyContent: "center"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appIcon: {
    width: RFValue(200),
    height: RFValue(200),
    resizeMode: "contain",
    marginBottom: RFValue(20)
  },
  appTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
    marginBottom: RFValue(20)
  },
  textinput: {
    width: RFValue(250),
    height: RFValue(40),
    padding: RFValue(10),
    marginTop: RFValue(10),
    borderColor: "#FFFFFF",
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    fontSize: RFValue(15),
    color: "#FFFFFF",
    backgroundColor: "#15193c",
    fontFamily: "Bubblegum-Sans"
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: RFValue(30),
    backgroundColor: "white",
    marginBottom: RFValue(20)
  },
  buttonText: {
    fontSize: RFValue(24),
    color: "#15193c",
    fontFamily: "Bubblegum-Sans"
  },
  buttonTextNewUser: {
    fontSize: RFValue(12),
    color: "#FFFFFF",
    fontFamily: "Bubblegum-Sans",
    textDecorationLine: 'underline'
  }
});