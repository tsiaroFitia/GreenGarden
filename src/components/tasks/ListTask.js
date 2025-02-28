import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React, { Component } from "react";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../../outils/Colors";
import DeleteTask from "./DeleteTask";

export default class ListTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalDeleteVisible: false,
      isAchieved: false,
    };
  }

  toggleAchievedColor = () => {
    this.setState((prevState) => ({ isAchieved: !prevState.isAchieved }));
  };

  openDeleteTaskModal = () => {
    this.setState({ isModalDeleteVisible: true });
  };

  closeDeleteTaskModal = () => {
    this.setState({ isModalDeleteVisible: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.taskContainer}>
            {/* Icône de validation */}
            <TouchableOpacity onPress={this.toggleAchievedColor}>
              <FontAwesome6
                name="circle-check"
                size={24}
                color={this.state.isAchieved ? Colors.vert2 : "grey"}
                style={styles.icon}
              />
            </TouchableOpacity>

            {/* Détails de la tâche */}
            <View style={styles.taskDetails}>
              <Text style={styles.textName}>Name</Text>
              <Text style={styles.textDate}>Date</Text>
            </View>

            {/* Icône de suppression */}
            <TouchableOpacity onPress={this.openDeleteTaskModal}>
              <MaterialIcons
                name="delete"
                size={24}
                color={Colors.vert5}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          {/* Modal de suppression */}
          <Modal
            transparent={true}
            visible={this.state.isModalDeleteVisible}
            animationType="slide"
            onRequestClose={this.closeDeleteTaskModal}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                {/* Passer la fonction onClose à DeleteTask */}
                <DeleteTask onClose={this.closeDeleteTaskModal} />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  taskContainer: {
    width: "90%",
    height: 80,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    elevation: 3,
  },
  taskDetails: {
    flex: 1,
    marginLeft: 10,
  },
  textName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  textDate: {
    fontSize: 14,
    color: "#666",
  },
  icon: {
    padding: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    minHeight: 200,
  },
});
