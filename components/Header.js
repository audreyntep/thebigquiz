import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Header extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={styles.view}>
                <Text style={styles.header}>{this.props.title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 26,
        color: 'white',
        fontWeight: 'bold',
        paddingVertical: 14,
        backgroundColor: 'limegreen',
        textAlign: 'center',
    },
    view:{
        marginBottom: 20,
    },
});

export default (Header);
