import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import Colors from "../../outils/Colors";

export default class TrierTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: "All", // Valeur par défaut
    };
  }

  // Met à jour le filtre sélectionné et appelle la fonction onFilterChange
  setFilter = (filter) => {
    this.setState({ selectedFilter: filter });
    this.props.onFilterChange(filter); // Appelle la fonction passée via les props
  };

  render() {
    const { selectedFilter } = this.state;
    const filters = ["All", "Achieved", "Inachieved"];

    return (
      <View style={styles.container}>
        <View style={styles.menu}>
          {filters.map((filter, index) => (
            <React.Fragment key={filter}>
              <TouchableOpacity onPress={() => this.setFilter(filter)}>
                <View
                  style={[
                    styles.filterItem,
                    selectedFilter === filter && styles.activeFilter,
                  ]}
                >
                  <Text
                    style={{
                      color: selectedFilter === filter ? Colors.vert1 : "black",
                    }}
                  >
                    {filter}
                  </Text>
                </View>
              </TouchableOpacity>

              {index < filters.length - 1 && <View style={styles.bar} />}
            </React.Fragment>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 5,
    alignItems: "center",
  },
  menu: {
    width: "90%",
    height: 40,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  filterItem: {
    opacity: 0.8,
    paddingHorizontal: 15,
  },
  activeFilter: {
    color: Colors.vert1,
    fontWeight: "bold",
  },
  bar: {
    width: 1,
    height: "60%",
    backgroundColor: "gray",
    marginHorizontal: 10,
  },
});
