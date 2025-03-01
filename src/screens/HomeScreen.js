import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";

import * as Animatable from "react-native-animatable";

import Colors from "../outils/Colors";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          source={require("../img/logo.png")}
          style={styles.logo}
          resizeMode="cover"
        />
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.welcome}>Welcome to</Text>
        <Text style={styles.welcome}>SmartHarvest</Text>
        <Text style={styles.welcome2}>Assistance of plantation with AI</Text>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
            <Animatable.View
              animation="fadeInRightBig"
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.vert1,
  },
  footer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 25,
    paddingVertical: 50,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  header: {
    flex: 2,
    backgroundColor: Colors.vert1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 220,
    height: 220,
    borderRadius: 110, // Rend l'image circulaire
  },
  welcome: {
    fontSize: 32,
    fontWeight: "bold", // Utilisation de bold pour le poids
    color: Colors.vert5,
  },
  welcome2: {
    fontSize: 20,
    color: Colors.vert1,
    marginBottom: 20,
  },
  buttonContainer: {
    width: "50%",
    height: 45,
    backgroundColor: Colors.vert1,
    alignItems: "center",
    marginTop: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "flex-end", // Ajoutez cette ligne pour aligner à droite
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
