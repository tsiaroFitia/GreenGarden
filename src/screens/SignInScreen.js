import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { supabase } from "../../supabase";
import Colors from "../outils/Colors";
import CustomSnackbar from "../components/CustomSnackBar";

export default function SignInScreen({ navigation }) {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarType, setSnackbarType] = React.useState("success");

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleSignIn = async () => {
    if (data.email === "" || !isValidEmail(data.email)) {
      setData({ ...data, isValidUser: false });
      setSnackbarMessage("Please enter a valid email.");
      setSnackbarType("error");
      setSnackbarVisible(true);
      return;
    } else {
      setData({ ...data, isValidUser: true });
    }

    if (data.password === "") {
      setData({ ...data, isValidPassword: false });
      setSnackbarMessage("Password cannot be empty.");
      setSnackbarType("error");
      setSnackbarVisible(true);
      return;
    } else {
      setData({ ...data, isValidPassword: true });
    }

    if (isValidEmail(data.email) && data.password !== "") {
      // Étape 1 : Connexion avec Supabase Auth
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error("Authentication error:", error.message);
        setSnackbarMessage(error.message);
        setSnackbarType("error");
        setSnackbarVisible(true);
        return;
      }

      // Étape 2 : Vérifier si l'utilisateur a un profil
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError || !profile) {
        // Si l'utilisateur n'a pas de profil, créer un profil minimal
        const { data: newProfile, error: newProfileError } = await supabase
          .from("profiles")
          .insert([
            {
              id: user.id,
              email: user.email,
              created_at: new Date().toISOString(),
            },
          ]);

        if (newProfileError) {
          console.error(
            "Erreur lors de la création du profil :",
            newProfileError
          );
          setSnackbarMessage("Erreur lors de la création du profil.");
          setSnackbarType("error");
          setSnackbarVisible(true);
          return;
        }
      }

      // Étape 3 : Rediriger vers l'écran principal
      navigation.navigate("MainAppScreen");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sign in!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Animatable.View animation="fadeInUpBig" style={styles.viewInput}>
          <Text style={styles.LabelTextInput}>Email</Text>
          <View style={styles.iconInput}>
            <MaterialIcons name="person" color="#009367" size={22} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email..."
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
          {!data.isValidUser && (
            <Text style={styles.errorMsg}>Please enter a valid email.</Text>
          )}
        </Animatable.View>

        <Animatable.View animation="fadeInUpBig" style={styles.viewInput}>
          <Text style={styles.LabelTextInput}>Password</Text>
          <View style={styles.iconInput}>
            <FontAwesome name="lock" color="#009367" size={22} />
            <TextInput
              style={styles.input}
              placeholder="Enter your password..."
              secureTextEntry={data.secureTextEntry ? true : false}
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Ionicons name="eye-off" color="grey" size={20} />
              ) : (
                <Ionicons name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {!data.isValidPassword && (
            <Text style={styles.errorMsg}>Password cannot be empty.</Text>
          )}
        </Animatable.View>

        <View style={styles.button}>
          <TouchableOpacity onPress={handleSignIn}>
            <Animatable.View animation="fadeInLeftBig" style={styles.button1}>
              <Text style={styles.buttonText1}>Sign in</Text>
            </Animatable.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
            <Animatable.View animation="fadeInRightBig" style={styles.button2}>
              <Text style={styles.buttonText2}>Sign up</Text>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </Animatable.View>

      {/* CustomSnackbar pour afficher les messages */}
      <CustomSnackbar
        visible={snackbarVisible}
        message={snackbarMessage}
        type={snackbarType}
        onDismiss={() => setSnackbarVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.vert1,
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
  footer: {
    flex: 2,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 30,
    paddingHorizontal: 35,
  },
  viewInput: {
    paddingTop: 10,
    paddingBottom: 10,
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
  LabelTextInput: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.vert1,
  },
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
    marginBottom: 25,
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
  errorMsg: {
    color: "red",
  },
});
