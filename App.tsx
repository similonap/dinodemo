import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import ListScreen from './screens/ListScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, RouteProp, useRoute } from '@react-navigation/native';
import DetailScreen from './screens/DetailScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

export interface Dinosaur {
  Name:        string;
  Description: string;
}

interface IDinoContext {
  dinosaurs: Dinosaur[];
}

export const DinoContext = React.createContext<IDinoContext>({
  dinosaurs: [],
});

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [dinosaurs, setDinosaurs] = useState<Dinosaur[]>([]);
  const [loading, setLoading] = useState(true)

  const getDinosaur = async() => {
    setLoading(true);
    let response = await axios.get<Dinosaur[]>('https://dinosaur-facts-api.shultzlab.com/dinosaurs');
    setDinosaurs(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getDinosaur();
  },[])

  return (
    <DinoContext.Provider value={{dinosaurs: dinosaurs}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen name="Detail" component={DetailTabs} />

        </Stack.Navigator>
      </NavigationContainer>
    </DinoContext.Provider>
  );
}

const DetailTabs = () => {
  const route : RouteProp<any> = useRoute();
  let dinosaur : Dinosaur = route.params?.dinosaur;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen name="Pictures" options={{ title: 'Pictures', tabBarIcon: ({color, size}) => <AntDesign name="picture" size={size} color={color} /> }}>
        {(props) => <DetailScreen {...props} url={`https://dinosaurpictures.org/${dinosaur.Name}-pictures`} />}
      </Tab.Screen>
      <Tab.Screen name="Wikipedia" options={{ title: 'Wikipedia', tabBarIcon: ({color, size}) => <FontAwesome name="wikipedia-w" size={size} color={color} /> }}>
        {(props) => <DetailScreen {...props} url={`https://en.wikipedia.org/wiki/${dinosaur.Name}`} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
