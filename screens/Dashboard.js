import React from 'react';
import {View, Button, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';

import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import {theme} from "../core/theme";
import {connect} from "react-redux";
import {Card} from "react-native-elements";
import AppButton from "../components/AppButton";

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.route.params.id,
        };
    }

    render(){
        console.log(this.props);
        console.log(this.state)
        return (
            <View>
                <Header title="Quiz terminé !"/>
                <View style={styles.container}>
                    {this.state.completed === true && (
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.text}>Votre score : {this.state.results.score} / 25</Text>
                            <Card>
                                <Card.Title style={styles.title}>Classement</Card.Title>
                                <Card.Divider/>
                                {
                                    users.map((u, i) => {
                                        return (
                                            <View key={i} style={styles.user}>
                                                <Image
                                                    style={styles.image}
                                                    resizeMode="cover"
                                                    source={{ uri: u.avatar }}
                                                />
                                                <Text style={styles.name}>{u.name} : {u.score}</Text>
                                            </View>
                                        );
                                    })
                                }
                            </Card>
                            <AppButton title={'Recommencer !'} onPress={() => this.props.navigation.navigate('Homescreen')}/>
                        </View>
                    )}
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({

});

const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps)(Dashboard)
