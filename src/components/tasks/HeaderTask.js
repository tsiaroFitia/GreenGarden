import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import FonteAwesome6 from "react-native-vector-icons/FontAwesome6";

import Colors from "../../outils/Colors";

export default class HeaderTask extends Component {
  render() {
    const today = new Date(); // Get the current date
    const options = {
      weekday: "long", // Full name of the day (e.g., "Wednesday")
      day: "numeric", // Day of the month (e.g., "11")
      month: "long", // Full name of the month (e.g., "May")
    };
    const todayDateString = today.toLocaleDateString("en-GB", options); // Apply custom formatting

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.title}>
            <Text style={styles.texttitle}>Today's Task</Text>
            <Text style={styles.todayDate}>{todayDateString}</Text>
          </View>
          <TouchableOpacity onPress={this.props.openModal}>
            <View style={styles.buttonAddTask}>
              <FonteAwesome6
                name="plus"
                size={15}
                style={styles.iconButtonAddTask}
              />
              <Text style={styles.textButtonAddTask}>New task</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonAddTask: {
    width: 115,
    height: 45,
    backgroundColor: Colors.vert1,
    opacity: 0.7,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  header: {
    width: "90%",
    height: 90,

    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconButtonAddTask: {},
  texttitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  textButtonAddTask: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  todayDate: {
    alignItems: "center",
    paddingTop: 5,
    opacity: 0.7,
  },
});
