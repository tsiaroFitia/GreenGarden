import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../../outils/Colors";
import { supabase } from "../../../supabase";

export default class AddTask extends Component {
  state = {
    date: new Date(),
    showDatePicker: false,
    taskName: "",
  };

  // Function to show or hide the date picker
  showDatepicker = () => {
    this.setState({ showDatePicker: true });
  };

  // Function to handle the selected date
  onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      showDatePicker: false,
      date: currentDate,
    });
  };

  // Function to save the task to Supabase
  handleAddTask = async () => {
    const { taskName, date } = this.state;
    const { onAddTask, onClose } = this.props;

    if (!taskName.trim()) {
      onAddTask("Please enter a task name.", "error");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("task")
        .insert([
          { name: taskName, date: date.toISOString(), is_achieved: false },
        ]);

      if (error) {
        throw error;
      }

      // Notify the parent of successful addition
      onAddTask("Task added successfully!", "success");

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error adding task:", error);
      onAddTask("An error occurred while adding the task.", "error");
    }
  };

  render() {
    const { date, showDatePicker, taskName } = this.state;

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Add Task</Text>
          <TouchableOpacity onPress={this.props.onClose}>
            <MaterialIcons name="cancel" size={30} color={Colors.vert1} />
          </TouchableOpacity>
        </View>

        {/* Main content */}
        <View style={styles.body}>
          <View style={styles.formGroup}>
            <Text>Name</Text>
            <TextInput
              placeholder="Enter the name of the task..."
              style={styles.textInput}
              value={taskName}
              onChangeText={(text) => this.setState({ taskName: text })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text>Date</Text>
            <TouchableOpacity onPress={this.showDatepicker}>
              <View style={styles.dateInput}>
                <FontAwesome name="calendar" size={22} color={Colors.vert1} />
                <Text style={styles.dateText}>{date.toDateString()}</Text>
              </View>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={this.onDateChange}
              />
            )}
          </View>
        </View>

        {/* Add button */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={this.handleAddTask}>
            <View style={styles.buttonAddTask}>
              <Text style={styles.buttonText}>Add</Text>
              <MaterialIcons name="navigate-next" size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
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
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.vert1,
  },
  body: {
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  textInput: {
    marginTop: 10,
    backgroundColor: Colors.gris,
    padding: 10,
    borderRadius: 10,
  },
  dateInput: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.gris,
    padding: 10,
    borderRadius: 10,
  },
  dateText: {
    color: "black",
    marginLeft: 10,
  },
  footer: {
    alignItems: "flex-end",
  },
  buttonAddTask: {
    width: 90,
    height: 45,
    backgroundColor: Colors.vert1,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
