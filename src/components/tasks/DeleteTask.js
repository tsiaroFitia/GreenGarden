import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../outils/Colors";

export default function DeleteTask({ onClose, onConfirm }) {
  return (
    <Modal transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={styles.contain}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Delete</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.bodyText}>
              Do you really want to delete this task?
            </Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={onConfirm}>
              <View style={styles.buttonOK}>
                <Text style={styles.buttonText}>OK</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <View style={styles.buttonCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contain: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  header: {
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: Colors.vert1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.vert1,
  },
  body: {
    alignItems: "center",
    paddingVertical: 20,
  },
  bodyText: {
    textAlign: "center",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonOK: {
    backgroundColor: Colors.vert1,
    borderRadius: 10,
    padding: 10,
    minWidth: 80,
    alignItems: "center",
  },
  buttonCancel: {
    backgroundColor: Colors.gris,
    borderRadius: 10,
    padding: 10,
    minWidth: 80,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
