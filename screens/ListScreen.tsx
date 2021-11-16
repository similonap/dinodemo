import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react"
import { View , StyleSheet, FlatList, Text, TouchableOpacity, Button} from "react-native"
import { DinoContext, Dinosaur } from "../App"

interface ListScreenProps {

}

interface ListItemProps {
    dinosaur: Dinosaur,
    selected: boolean,
    onPress: () => void
}

const ListItem = ({dinosaur, selected, onPress}: ListItemProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{backgroundColor: selected ? 'red' : 'yellow', height: 100, borderWidth: 1, borderColor: 'black', justifyContent: 'center', alignItems: 'flex-start'}}>
                <Text style={{fontSize: 20}}>{dinosaur.Name}</Text>
                <Text>{dinosaur.Description}</Text>
            </View>
        </TouchableOpacity>
    );
}

const ListScreen = ({} : ListScreenProps) => {
    const navigation : StackNavigationProp<any> = useNavigation();

    let { dinosaurs } = useContext(DinoContext);
    const [selectedDinosaur, setSelectedDinosaur] = useState<Dinosaur>();

    const setAsFavorite = async () => {
        await AsyncStorage.setItem("@favourite", JSON.stringify(selectedDinosaur));
    }

    const loadFavorite = async () => {
        let item = await AsyncStorage.getItem("@favourite");
        if (item) {
            let dino : Dinosaur = JSON.parse(item);
            setSelectedDinosaur(dino);
        }
    }

    useEffect(() => {
        loadFavorite();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                
                data={dinosaurs}
                renderItem={({item}) => <ListItem dinosaur={item} selected={item.Name == selectedDinosaur?.Name} onPress={() => {setSelectedDinosaur(item)}}/>}
                keyExtractor={(item) => item.Name}
            ></FlatList>
            <Button title="Detail" onPress={() => { navigation.navigate('Detail', {dinosaur: selectedDinosaur})}}></Button>
            <Button title="Set as favourite" onPress={() => { setAsFavorite(); }}></Button>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default ListScreen;