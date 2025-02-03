import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import Colors from '../outils/Colors';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

const ResearchApp = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header />
      <View style={[styles.searchContainer, isFocused && styles.searchFocused]}>
        <SearchBar
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ResearchApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gris,
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchFocused: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
});
