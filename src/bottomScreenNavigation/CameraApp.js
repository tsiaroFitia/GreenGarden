import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import { Camera } from 'expo-camera';

import Colors from '../outils/Colors';

const CameraApp = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  // Demande de permission pour la caméra
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert("Permission refusée", "L'accès à la caméra est requis.");
      }
    })();
  }, []);

  // Prendre une photo
  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  };

  // Basculer entre les caméras avant/arrière
  const toggleCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasPermission === null) {
    return <Text>Demande de permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Permission refusée pour accéder à la caméra.</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={cameraType}
        ref={(ref) => setCameraRef(ref)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Prendre une photo" onPress={takePicture} />
        <Button title="Basculer la caméra" onPress={toggleCamera} />
      </View>
      {photoUri && <Image source={{ uri: photoUri }} style={styles.preview} />}
    </View>
  );
};

export default CameraApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gris,
  },
  camera: {
    flex: 3,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  preview: {
    width: 300,
    height: 400,
    alignSelf: 'center',
    marginTop: 10,
  },
});
