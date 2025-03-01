import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../../supabase";
import Colors from "../../outils/Colors";
import CustomSnackbar from "../CustomSnackBar";

const EditProfil = ({ goBack }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  // Récupérer l'utilisateur connecté et charger les données du profil
  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
        return;
      }

      // Récupérer les données du profil
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error(
          "Erreur lors de la récupération du profil :",
          profileError
        );
        return;
      }

      // Pré-remplir les champs avec les données existantes
      if (profile) {
        setName(profile.name || "");
        setEmail(profile.email || "");
        setPhone(profile.phone || "");
        setSelectedGender(profile.genre || null);
      }
    };

    fetchProfile();
  }, []);

  // Fonction pour ouvrir la galerie
  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      setSnackbarMessage("Permission d'accès à la galerie refusée.");
      setSnackbarType("error");
      setSnackbarVisible(true);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri); // Mettre l'URI de l'image dans le state
    }
  };

  // Fonction pour mettre à jour le profil
  const handleUpdateProfile = async () => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError) {
      console.error(
        "Erreur lors de la récupération de l'utilisateur :",
        authError
      );
      setSnackbarMessage("Erreur lors de la récupération de l'utilisateur.");
      setSnackbarType("error");
      setSnackbarVisible(true);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({
          name,
          email,
          phone,
          genre: selectedGender,
        })
        .eq("id", user.id);

      if (error) throw error;

      setSnackbarMessage("Profil mis à jour avec succès !");
      setSnackbarType("success");
      setSnackbarVisible(true);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      setSnackbarMessage("Erreur lors de la mise à jour du profil.");
      setSnackbarType("error");
      setSnackbarVisible(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>
        <TouchableOpacity onPress={goBack}>
          <Icon name="times" size={30} color={Colors.vert5} />
        </TouchableOpacity>
      </View>

      {/* Section Photo de profil */}
      <View style={styles.photoSection}>
        <TouchableOpacity style={styles.photoContainer} onPress={openGallery}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Icon name="camera" size={30} color="white" />
          )}
        </TouchableOpacity>
      </View>

      {/* Formulaire d'édition */}
      <View style={styles.formSection}>
        {/* Nom */}
        <View style={styles.Viewinput}>
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color={Colors.vert1} />
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
          </View>
        </View>

        {/* Email */}
        <View style={styles.Viewinput}>
          <View style={styles.inputContainer}>
            <Icon name="envelope" size={16} color={Colors.vert1} />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
            />
          </View>
        </View>

        {/* Téléphone */}
        <View style={styles.Viewinput}>
          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color={Colors.vert1} />
            <TextInput
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
        </View>

        {/* Section Genre avec Boutons */}
        <View style={styles.Viewinput}>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                selectedGender === "homme" && styles.selectedButton,
              ]}
              onPress={() => setSelectedGender("homme")}
            >
              <MaterialIcons
                name="male"
                size={20}
                color={
                  selectedGender === "homme" ? Colors.vert : Colors.grisclair
                }
              />
              <Text style={styles.genderText}>Homme</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderButton,
                selectedGender === "femme" && styles.selectedButton,
              ]}
              onPress={() => setSelectedGender("femme")}
            >
              <MaterialIcons
                name="female"
                size={20}
                color={
                  selectedGender === "femme" ? Colors.vert : Colors.grisclair
                }
              />
              <Text style={styles.genderText}>Femme</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bouton Valider */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonOK} onPress={handleUpdateProfile}>
          <Text style={styles.buttonText}>Valid</Text>
          <MaterialIcons
            name="edit"
            size={20}
            color="white"
            style={styles.iconSpacing}
          />
        </TouchableOpacity>
      </View>

      {/* CustomSnackbar pour afficher les messages */}
      <CustomSnackbar
        visible={snackbarVisible}
        message={snackbarMessage}
        type={snackbarType}
        onDismiss={() => setSnackbarVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.vert5,
  },
  photoSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  photoContainer: {
    width: 120,
    height: 120,
    backgroundColor: Colors.vert1,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  formSection: {
    width: "100%",
  },
  Viewinput: {
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 43,
    borderColor: Colors.grisclair,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingLeft: 20,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  genderButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "45%",
    justifyContent: "center",
  },
  selectedButton: {
    borderColor: Colors.vert1,
  },
  genderText: {
    fontSize: 14,
    marginLeft: 10,
  },
  footer: {
    alignItems: "flex-end",
    marginTop: 20,
  },
  buttonOK: {
    backgroundColor: Colors.vert1,
    borderRadius: 13,
    width: "45%",
    height: 50,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    color: "white",
  },
  iconSpacing: {
    marginLeft: 15,
  },
});
export default EditProfil;
