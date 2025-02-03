import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeApp from '../../bottomScreenNavigation/HomeApp';
import ResearchApp from '../../bottomScreenNavigation/ResearchApp';
import CameraApp from '../../bottomScreenNavigation/CameraApp';
import DiscussionApp from '../../bottomScreenNavigation/DiscussionApp';
import ProfilApp from '../../bottomScreenNavigation/ProfilApp';

import Colors from '../../outils/Colors';

const Tab = createBottomTabNavigator();

const CustomCameraButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -25,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.vert1,
      width: 60,
      height: 60,
      borderRadius: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    }}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'HomeApp':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'ResearchApp':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'CameraApp':
              iconName = 'camera';
              break;
            case 'DiscussionApp':
              iconName = focused ? 'chatbox' : 'chatbox-outline';
              break;
            case 'ProfilApp':
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          left: 20,
          right: 20,
          backgroundColor: '#FFFF',
          borderRadius: 10,
          height: 50,
          alignItems: 'center',
        },
        tabBarActiveTintColor: Colors.vert1,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="HomeApp" component={HomeApp}  options={{ headerShown: false }} style={styles.container}/>
      <Tab.Screen name="ResearchApp" component={ResearchApp} options={{ headerShown: false }} style={styles.container}/>
      <Tab.Screen
        name="CameraApp"
        component={CameraApp}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="camera" size={30} color="white" />
          ),
          tabBarButton: (props) => <CustomCameraButton {...props} />,
          headerShown: false,
        }}
      />
      <Tab.Screen name="DiscussionApp" component={DiscussionApp} options={{ headerShown: false }}  style={styles.container}/>
      <Tab.Screen name="ProfilApp" component={ProfilApp} options={{ headerShown: false }} style={styles.container} />
    </Tab.Navigator>
  );
};

export default Tabs;


const styles = StyleSheet.create({
  container:{
    textAlign:'center',
    justifyContent:'center',
    paddingBottom:10,
  },
})
