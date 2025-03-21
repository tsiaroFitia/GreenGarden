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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { supabase } from "../../supabase";
import Colors from "../outils/Colors";
import CustomSnackbar from "../components/CustomSnackBar";

const SignUpScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    check_textInputChange: false,
    secureTextEntry: true,
    secureTextEntryConfirm: true,
  });

  const [error, setError] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarType, setSnackbarType] = React.useState("success"); // "success" ou "error"

  const textInputChange = (val) => {
    setData({
      ...data,
      email: val,
      check_textInputChange: val.length !== 0,
    });
    setError((prevError) => ({ ...prevError, email: "" }));
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
    setError((prevError) => ({ ...prevError, password: "" }));
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirmPassword: val,
    });
    setError((prevError) => ({ ...prevError, confirmPassword: "" }));
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

  const userAccount = async (data, setError) => {
    if (data.password !== data.confirmPassword) {
      setError((prevError) => ({
        ...prevError,
        confirmPassword: "Les mots de passe sont différents",
      }));
      setSnackbarMessage("Les mots de passe sont différents.");
      setSnackbarType("error");
      setSnackbarVisible(true);
      return;
    }

    try {
      // Étape 1 : Inscription avec Supabase Auth
      const { user, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      // Étape 2 : Créer un profil minimal dans la table `profiles`
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: user.id, // L'ID de l'utilisateur authentifié
            email: user.email, // L'email de l'utilisateur
            created_at: new Date().toISOString(), // Date de création
          },
        ]);

      if (profileError) throw profileError;

      // Étape 3 : Rediriger vers l'écran principal
      navigation.navigate("MainAppScreen");

      setSnackbarMessage("Compte utilisateur créé avec succès !");
      setSnackbarType("success");
      setSnackbarVisible(true);
    } catch (error) {
      console.log(error.message);
      if (error.message.includes("email")) {
        setError((prevError) => ({
          ...prevError,
          email: "Cette adresse e-mail est déjà utilisée !",
        }));
        setSnackbarMessage("Cette adresse e-mail est déjà utilisée !");
        setSnackbarType("error");
        setSnackbarVisible(true);
      } else {
        setSnackbarMessage(error.message);
        setSnackbarType("error");
        setSnackbarVisible(true);
      }
    }
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
          {error.email ? <Text style={styles.Error}>{error.email}</Text> : null}
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
          {error.password ? (
            <Text style={styles.Error}>{error.password}</Text>
          ) : null}
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
          {error.confirmPassword ? (
            <Text style={styles.Error}>{error.confirmPassword}</Text>
          ) : null}
        </Animatable.View>

        <View style={styles.button}>
          <TouchableOpacity onPress={() => userAccount(data, setError)}>
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

      {/* CustomSnackbar pour afficher les messages */}
      <CustomSnackbar
        visible={snackbarVisible}
        message={snackbarMessage}
        type={snackbarType}
        onDismiss={() => setSnackbarVisible(false)}
      />
    </View>
  );
};

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
    marginBottom: 23,
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
  Error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default SignUpScreen;
