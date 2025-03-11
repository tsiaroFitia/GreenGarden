import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import * as Camera from "expo-camera";

import AsyncStorage from "@react-native-async-storage/async-storage";

const OpenCamera = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  // Fonction pour vérifier et demander la permission
  const requestPermission = async () => {
    const storedPermission = await AsyncStorage.getItem("cameraPermission");
    if (storedPermission === "granted") {
      setHasPermission(true);
    } else {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
        setHasPermission(true);
        AsyncStorage.setItem("cameraPermission", "granted");
      } else {
        setHasPermission(false);
        AsyncStorage.setItem("cameraPermission", "denied");
        Alert.alert(
          "Permission Denied",
          "You have denied the camera permission. Please enable it in settings.",
          [{ text: "OK" }]
        );
      }
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  // Vérification si la permission est en cours ou non accordée
  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // Fonction pour prendre une photo
  const takePicture = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      setPhoto(photoData);
    }
  };

  return (
    <View style={styles.container}>
      {photo ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo.uri }} style={styles.image} />
          <Button title="Retake" onPress={() => setPhoto(null)} />
        </View>
      ) : (
        <Camera style={styles.camera} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            />
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    backgroundColor: "white",
    borderRadius: 35,
    marginBottom: 20,
  },
  previewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  image: {
    width: "100%",
    height: "70%",
    resizeMode: "contain",
  },
});

export default OpenCamera;
