import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions
} from "react-native";

import * as Font from "expo-font"
import { RFValue } from "react-native-responsive-fontsize";;
import * as SplashScreen from 'expo-splash-screen';
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";


SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class StoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      corSpeaker: "gray",
      iconSpeaker: "volume-high-outline",
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
      SplashScreen.hideAsync();
      return (
        <View style={styles.container}>
          <SafeAreaView style={{
		marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
	}}/>
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
          <View style={styles.cardContainer}>
            <Image
              source={require("../assets/story_image_1.png")}
              style={styles.storyImage}
            ></Image>

            <View style={styles.titleContainer}>
              <Text style={styles.storyTitleText}>
                {this.props.route.params.story.title}
              </Text>
              <Text style={styles.storyAuthorText}>
                {this.props.route.params.story.author}
              </Text>
              <Text style={styles.storyText}>
                {this.props.route.params.story.story}
              </Text>
              <Text style={styles.storyMoral}>
                {this.props.route.params.story.moral}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => {ler(this.props.route.params.story.title,
                this.props.route.params.story.author,
                this.props.route.params.story.story,
                this.props.route.params.story.moral)}}>
                <Ionicons name={this.state.iconSpeaker} size={RFValue(30)} color={this.state.corSpeaker} style={{margin: RFValue(15)}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create(
{
  container: {
  flex: 1
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
cardContainer: {
  margin: RFValue(13),
  backgroundColor: "#2f345d",
  borderRadius: RFValue(20)
},
storyImage: {
  resizeMode: "contain",
  width: "95%",
  alignSelf: "center",
  height: RFValue(250)
},
titleContainer: {
  paddingLeft: RFValue(20),
  justifyContent: "center"
},
storyTitleText: {
  fontSize: RFValue(25),
  fontFamily: "Bubblegum-Sans",
  color: "white"
},
storyAuthorText: {
  fontSize: RFValue(18),
  fontFamily: "Bubblegum-Sans",
  color: "white"
},
storyText: {
  fontFamily: "Bubblegum-Sans",
  fontSize: 13,
  color: "white",
  paddingTop: RFValue(10)
},
iconContainer: {
  justifyContent: "center",
  alignItems: "center",
  padding: RFValue(10)
},
likeButton: {
  width: RFValue(160),
  height: RFValue(40),
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  backgroundColor: "#eb3948",
  borderRadius: RFValue(30)
},
likeText: {
  color: "white",
  fontFamily: "Bubblegum-Sans",
  fontSize: RFValue(25),
  marginLeft: RFValue(5)
}





});
