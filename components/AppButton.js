import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from "../core/theme";

class AppButton extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={styles.view}>
                <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view:{
        height: 40,
        margin: 20,
    },
    container: {
        elevation: 8,
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    title: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
    }
});

export default (AppButton);
