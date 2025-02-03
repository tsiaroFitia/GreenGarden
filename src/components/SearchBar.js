import { Text, View , TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../outils/Colors';

export default class SearchBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          {/*<Ionicons name="search-outline" size={24} style={styles.iconSearch} />*/}
          <TextInput
            placeholder="Search..."
            style={styles.textInput}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  searchContainer: {
    width: '85%',
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: Colors.vert1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  iconSearch: {
    color: Colors.vert1,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.vert1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});