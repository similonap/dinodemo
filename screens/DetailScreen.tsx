import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

interface DetailScreenProps {
    url: string;
}

const DetailScreen = ({url}: DetailScreenProps) => {
    const navigation : StackNavigationProp<any> = useNavigation();

    return (
        <View style={styles.container}>
            <WebView 
            style={{flex: 1, height: '100%', width: '100%'}}
            source={{ uri: url }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default DetailScreen;
