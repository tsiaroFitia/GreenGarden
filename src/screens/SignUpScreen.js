import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../outils/Colors";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebaseconfig"; // Utilisation de l'auth initialisée

const userAccount = async (data) => {
  if (data.password !== data.confirmPassword) {
    Alert.alert("Erreur", "Les mots de passe ne correspondent pas !");
    return;
  }

  try {
    // Utilisation de createUserWithEmailAndPassword avec l'auth exportée
    await createUserWithEmailAndPassword(auth, data.email, data.password);
    Alert.alert("Succès", "Compte utilisateur créé et connecté !");
  } catch (error) {
    console.log(error.code, error.message);
    if (error.code === "auth/email-already-in-use") {
      Alert.alert("Erreur", "Cette adresse e-mail est déjà utilisée !");
    } else if (error.code === "auth/invalid-email") {
      Alert.alert("Erreur", "L'adresse e-mail est invalide !");
    } else {
      Alert.alert("Erreur", error.message);
    }
  }
};

export default function SignInScreen({ navigation }) {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    check_textInputChange: false,
    secureTextEntry: true,
    secureTextEntryConfirm: true,
  });

  const textInputChange = (val) => {
    setData({
      ...data,
      email: val,
      check_textInputChange: val.length !== 0,
    });
  };

  const handlePasswordChange = (val) => {
    // Correction du nom de la fonction
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirmPassword: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateSecureTextEntryConfirm = () => {
    setData({
      ...data,
      secureTextEntryConfirm: !data.secureTextEntryConfirm,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Register Now !</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Animatable.View animation="fadeInUpBig" style={styles.viewInput}>
          <Text style={styles.LabelTextInput}>Identifiant</Text>
          <View style={styles.iconInput}>
            <MaterialIcons name="person" color="#009367" size={22} />
            <TextInput
              value={data.email}
              style={styles.input}
              placeholder="Enter your identifiant ..."
              onChangeText={(val) => textInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Ionicons
                  name="checkmark-circle-outline"
                  color="grey"
                  size={20}
                />
              </Animatable.View>
            ) : null}
          </View>
          {/*message d'erreur si erreur en rouge si succes rediriger vers component=SignIN */}
          <Text></Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUpBig" style={styles.viewInput}>
          <Text style={styles.LabelTextInput}>Password</Text>
          <View style={styles.iconInput}>
            <FontAwesome name="lock" color="#009367" size={22} />
            <TextInput
              value={data.password}
              style={styles.input}
              placeholder="Entrer your password..."
              secureTextEntry={data.secureTextEntry}
              onChangeText={(val) => handlePasswordChange(val)} // Correction du nom de la fonction
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Ionicons name="eye-off" color="grey" size={20} />
              ) : (
                <Ionicons name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
        </Animatable.View>

        <Animatable.View animation="fadeInUpBig" style={styles.viewInput}>
          <Text style={styles.LabelTextInput}>Confirm password</Text>
          <View style={styles.iconInput}>
            <FontAwesome name="lock" color="#009367" size={22} />
            <TextInput
              value={data.confirmPassword}
              style={styles.input}
              placeholder="Confirm your password ..."
              secureTextEntry={data.secureTextEntryConfirm}
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntryConfirm}>
              {data.secureTextEntryConfirm ? (
                <Ionicons name="eye-off" color="grey" size={20} />
              ) : (
                <Ionicons name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {/*affiche erreur si different de password en rouge*/}
          <Text></Text>
        </Animatable.View>

        <View style={styles.button}>
          <TouchableOpacity onPress={() => userAccount(data)}>
            <Animatable.View animation="fadeInLeftBig" style={styles.button1}>
              <Text style={styles.buttonText1}>Sign Up</Text>
            </Animatable.View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
            <Animatable.View animation="fadeInRightBig" style={styles.button2}>
              <Text style={styles.buttonText2}>Sign In</Text>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingTop: 30,
  },
  button1: {
    width: "100%",
    height: 45,
    borderRadius: 15,
    backgroundColor: Colors.vert1,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 25, // Espacement entre le premier et le deuxième bouton
  },
  buttonText1: {
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
    color: "white",
  },
  button2: {
    width: "100%",
    height: 45,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.vert1,
    backgroundColor: "#FFFF",
    textAlign: "center",
    justifyContent: "center",
  },
  buttonText2: {
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
    color: Colors.vert1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.vert1,
  },
  footer: {
    flex: 2,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 30,
    paddingHorizontal: 35,
  },
  header: {
    flex: 1,
    backgroundColor: Colors.vert1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    paddingLeft: 30,
  },
  iconInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },
  input: {
    flex: 1,
    marginLeft: 20,
  },
  viewInput: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  LabelTextInput: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.vert2,
  },
});
