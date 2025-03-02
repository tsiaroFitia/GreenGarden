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

const EditProfil = ({ goBack, onUpdateSuccess }) => {
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
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) throw error;

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;

        if (profile) {
          setName(profile.name || "");
          setEmail(profile.email || "");
          setPhone(profile.phone || "");
          setSelectedGender(profile.genre || null);
          setProfileImage(profile.avatar_url || null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setSnackbarMessage("Error fetching profile.");
        setSnackbarType("error");
        setSnackbarVisible(true);
      }
    };

    fetchProfile();
  }, []);

  // Fonction pour ouvrir la galerie
  const openGallery = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        setSnackbarMessage("Gallery access permission denied.");
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
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error opening gallery:", error);
      setSnackbarMessage("Error opening gallery.");
      setSnackbarType("error");
      setSnackbarVisible(true);
    }
  };

  // Téléverser l'image sur Supabase Storage
  const uploadImage = async (uri, userId) => {
    try {
      const fileExt = uri.split(".").pop();
      const fileName = `${userId}.${fileExt}`;

      const { data, error } = await supabase.storage.from("avatars").upload(
        fileName,
        {
          uri,
          type: `image/${fileExt}`,
          name: fileName,
        },
        {
          cacheControl: "3600",
          upsert: true,
        }
      );

      if (error) throw error;

      // Récupérer l'URL publique de l'image après upload
      const { publicUrl, error: urlError } = await supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      if (urlError) throw urlError;

      return publicUrl; // Retourner l'URL publique
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  // Fonction pour mettre à jour le profil
  const handleUpdateProfile = async () => {
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError) throw authError;

      const genre = selectedGender === "female" ? "femme" : "homme";

      let avatarUrl = profileImage;
      if (profileImage && !profileImage.startsWith("http")) {
        avatarUrl = await uploadImage(profileImage, user.id);
      }

      const { data, error } = await supabase
        .from("profiles")
        .update({
          name,
          email,
          phone,
          genre,
          avatar_url: avatarUrl,
        })
        .eq("id", user.id);

      if (error) throw error;

      setSnackbarMessage("Profile updated successfully!");
      setSnackbarType("success");
      setSnackbarVisible(true);

      if (onUpdateSuccess) onUpdateSuccess(name);
    } catch (error) {
      console.error("Error updating profile:", error);
      setSnackbarMessage("Error updating profile.");
      setSnackbarType("error");
      setSnackbarVisible(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
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
                selectedGender === "male" && styles.selectedButton,
              ]}
              onPress={() => setSelectedGender("male")}
            >
              <MaterialIcons
                name="male"
                size={20}
                color={
                  selectedGender === "male" ? Colors.vert : Colors.grisclair
                }
              />
              <Text style={styles.genderText}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderButton,
                selectedGender === "female" && styles.selectedButton,
              ]}
              onPress={() => setSelectedGender("female")}
            >
              <MaterialIcons
                name="female"
                size={20}
                color={
                  selectedGender === "female" ? Colors.vert : Colors.grisclair
                }
              />
              <Text style={styles.genderText}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bouton Valider */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonOK} onPress={handleUpdateProfile}>
          <Text style={styles.buttonText}>Save</Text>
          <MaterialIcons
            name="edit"
            size={20}
            color="white"
            style={styles.iconSpacing}
          />
        </TouchableOpacity>
      </View>

      {/* Snackbar pour afficher les messages */}
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
