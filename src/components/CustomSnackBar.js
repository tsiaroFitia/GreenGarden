import React, { useEffect } from "react";
import { Modal, View, Text, StyleSheet, Animated } from "react-native";
import Colors from "../outils/Colors";

const CustomSnackbar = ({ visible, message, onDismiss, type = "success" }) => {
  const backgroundColor = type === "success" ? Colors.vert1 : Colors.rouge;
  const translateY = new Animated.Value(100); // Départ en bas

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0, // Remonte à la position initiale
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        onDismiss();
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      Animated.timing(translateY, {
        toValue: 100, // Redescend
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal transparent={true} visible={visible} animationType="none">
      <View style={styles.modalContainer}>
        <Animated.View
          style={[
            styles.snackbar,
            { backgroundColor, transform: [{ translateY }] },
          ]}
        >
          <Text style={styles.message}>{message}</Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  snackbar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default CustomSnackbar;
