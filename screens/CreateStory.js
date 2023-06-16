import React, { Component } from "react";
import { Text, View, Image, StyleSheet, SafeAreaView, Platform, StatusBar, Dimensions, TouchableOpacity } from "react-native";
import DropdownPicker from "react-native-dropdown-picker"

import * as Font from "expo-font";
import { RFValue } from "react-native-responsive-fontsize";
import * as SplashScreen from 'expo-splash-screen';
import { TextInput } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

let customFonts = {
	"Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class CreateStory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fontsLoaded: false,
      preview: "image1",
      tamanho: 40
		};
	}

	async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount() {
		this._loadFontsAsync();
	}

	render() {
		if (this.state.fontsLoaded) {
      const imagens = {
        image1: require("../assets/story_image_1.png"),
        image2: require("../assets/story_image_2.png"),
        image3: require("../assets/story_image_3.png"),
        image4: require("../assets/story_image_4.png"),
        image5: require("../assets/story_image_5.png"), 
      }
			SplashScreen.hideAsync();
			return(
			<View style={styles.container}>
				<SafeAreaView style={styles.droidSafeArea} />
				<View style={styles.appTitle}>
					<View style={styles.appIcon}>
						<Image
							source={require("../assets/logo.png")}
							style={styles.iconImage}
						></Image>
					</View>
					<View style={styles.appTitleTextContainer}>
						<Text style={styles.appTitleText}>New Story</Text>
					</View>

				</View>
        <View style={styles.fieldsContainer}>
          <Image source={imagens[this.state.preview]} style={styles.previewImage} />
          <View style={{
            height: RFValue(this.state.tamanho)
          }}>
            <DropdownPicker items={[
              {value: "image1", label: "Imagem 1" },
              {value: "image2", label: "Imagem 2" },
              {value: "image3", label: "Imagem 3" },
              {value: "image4", label: "Imagem 4" },
              {value: "image5", label: "Imagem 5" },
              ]} defaultValue={this.state.preview}
              open={this.state.tamanho == 170? true : false}
              onOpen={() => {
                this.setState({tamanho: 170});
              }}
              onClose={() => {
                this.setState({tamanho: 40});
              }}
              textStyle={{
                color: this.state.tamanho == 170? "black" : "white",
              }}
              containerStyle={{
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "white"
              }}
              onSelectItem={(item) => {
                this.setState({preview: item.value})
              }}/>
              <TextInput style={styles.inputFont} placeholder="Título" placeholderTextColor={"white"} onChangeText={(titulo) => {
                this.setState({titulo});
              }}/>   
              <TextInput style={styles.inputFont} placeholder="Descrição" placeholderTextColor={"white"} multiline={true} numberOfLines={3} onChangeText={(desc) => {
                this.setState({desc});
              }}/>   
              <TextInput style={[styles.inputFont, styles.inputFontExtra, styles.inputTextBig]} placeholder="Texto" placeholderTextColor={"white"} multiline={true} numberOfLines={20} onChangeText={(text) => {
                this.setState({text});
              }}/>   
              <TextInput style={[styles.inputFont, styles.inputFontExtra, styles.inputTextBig]} placeholder="Moral da História" placeholderTextColor={"white"} multiline={true} numberOfLines={3} onChangeText={(moral) => {
                this.setState({moral});
              }}/>
          </View>
        </View>
			</View>)
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#15193c"
	},
	droidSafeArea: {
		marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
	},
	appTitle: {
		flex: 0.07,
		flexDirection: "row"
	},
	appIcon: {
		flex: 0.3,
		justifyContent: "center",
		alignItems: "center"
	},
	iconImage: {
		width: "100%",
		height: "100%",
		resizeMode: "contain"
	},
	appTitleTextContainer: {
		flex: 0.7,
		justifyContent: "center"
	},
	appTitleText: {
		color: "white",
		fontSize: RFValue(28),
		fontFamily: "Bubblegum-Sans"
	},fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain",
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    marginTop: RFValue(10),
    fontFamily: "Bubblegum-Sans",
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5),
  },



})