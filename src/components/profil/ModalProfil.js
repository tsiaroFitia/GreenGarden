import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../../supabase";
import Colors from "../../outils/Colors";
import EditProfil from "./EditProfil";
import CustomSnackbar from "../CustomSnackBar";

const ModalProfil = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const [name, setName] = useState(""); // État pour stocker le nom
  const [profileImage, setProfileImage] = useState(""); // État pour stocker l'image de profil
  const navigation = useNavigation();

  // Récupérer les données du profil lors du montage du composant
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
        .select("name, avatar_url")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error(
          "Erreur lors de la récupération du profil :",
          profileError
        );
        return;
      }

      // Mettre à jour l'état avec le nom de l'utilisateur et l'image de profil
      if (profile) {
        setName(profile.name || "Utilisateur"); // Valeur par défaut si le nom est vide
        setProfileImage(profile.profile_image_url || ""); // Utilisez une URL par défaut ou vide si l'image n'existe pas
      }
    };

    fetchProfile();
  }, []);

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleLogout = () => {
    navigation.navigate("SignInScreen");
  };

  // Fonction de callback pour gérer la réussite de la mise à jour
  const handleUpdateSuccess = (updatedName, updatedProfileImage) => {
    setName(updatedName); // Mettre à jour le nom affiché
    setProfileImage(updatedProfileImage); // Mettre à jour l'image de profil
    closeEditModal(); // Fermer le modal
    setSnackbarMessage("Profil mis à jour avec succès !"); // Message de succès
    setSnackbarType("success"); // Type de message
    setSnackbarVisible(true); // Afficher le Snackbar
  };

  return (
    <View style={styles.container}>
      {/* Section Profil */}
      <View style={styles.profileSection}>
        <View style={styles.photo}>
          {/* Afficher l'image de profil */}
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Text style={styles.noImageText}>Pas d'image</Text> // Texte au cas où l'image est vide
          )}
        </View>
        <Text style={styles.nameText}>{name}</Text>
      </View>

      {/* Boutons d'actions */}
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={openEditModal}>
          <View style={styles.button1}>
            <Text style={styles.buttonText1}>Edit Profile</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.button2}>
            <Text style={styles.buttonText2}>Log Out</Text>
            <MaterialIcons
              name="logout"
              size={20}
              color={Colors.vert2}
              style={styles.logoutIcon}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Modal pour EditProfil */}
      <Modal visible={showEditModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <EditProfil
              goBack={closeEditModal}
              onUpdateSuccess={handleUpdateSuccess} // Passer la fonction de callback
            />
          </View>
        </View>
      </Modal>

      {/* Snackbar pour afficher les messages */}
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
  container: {
    width: "73%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  photo: {
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
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  noImageText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  nameText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
  },
  actionButtons: {
    width: "100%",
  },
  button1: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.vert1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText1: {
    fontSize: 16,
    color: "white",
  },
  button2: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.vert1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  buttonText2: {
    fontSize: 16,
    color: Colors.vert1,
  },
  logoutIcon: {
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default ModalProfil;
