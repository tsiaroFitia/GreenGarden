import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Modal } from 'react-native';
import { Camera } from 'expo-camera';

import Colors from '../outils/Colors';
import Header from '../components/Header';
import CameraOption from '../components/camera/CameraOption';

const CameraApp = () => {
  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.cam}>
        <CameraOption/>
      </View>
      
    </View>
  );
};

export default CameraApp;

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  cam:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
});