import React from 'react';
import {View, StyleSheet, TextInput, Alert, Text, Image} from 'react-native';
import AppButton from "../components/AppButton";
import { connect } from 'react-redux';
import Database from "../core/Database";
import Header from "../components/Header";


class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            uri: "",
        };
    }
/*
    componentDidMount() {
        Database.initializeDatabase();
    }*/

    static async onPressRegisterPlayer(name: string, navigate: function){
        console.log('2. register player');/*
        //si aucun name n'a été saisi
        if(name === ""){
            Alert.alert(
                'Champ obligatoire !',
                'Renseignez un nom.',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
            );
        }
        //on récupère la liste des players dans la db
        let players = await Database.getPlayers();
        //si la longueur de la liste est supérieure à 0
        if (players.length > 0) {
            //alors pour chaque player
            for (let i = 0; i < players.length; i++) {
                console.log('- player ' + players.item(i).id + ' : name : ' + players.item(i).name);
                //on compare le name du nouveau player
                if (players.item(i).name === name) {
                    //alerte si il existe déjà
                    Alert.alert(
                        'Nom indisponible !',
                        'Trouvez un autre pseudo.',
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false},
                    );
                    break;
                }
            }
        }*/
        //on crée un nouveau player
        let playerId = await Database.createPlayer(name);
        //puis redirection vers la page quiz avec l'id player en props
        navigate('Quizscreen', {playerId: playerId});
    }

    render(){
        const {navigate} = this.props.navigation;
        //console.log(this.props.route.params);
        Database.initializeDatabase();
        return (
            <View style={styles.containerView}>
                <Header title="Bienvenue !"/>
                <View style={styles.container}>
                    <Text style={styles.text}>Renseignez votre nom </Text>
                    <TextInput
                        label="Nom"
                        style={styles.input}
                        autoComplete={'name'}
                        value={this.state.name}
                        onChangeText={text => this.setState({ name: text })}
                    />
                    <Image style={styles.image} source={require('./img/user.jpg')}/>
                    <AppButton title={'Prendre une photo'} onPress={() => navigate('Camerascreen')}/>
                    <AppButton title={'Commencer !'} onPress={() => HomeScreen.onPressRegisterPlayer(this.state.name, navigate)}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerView: {
        flex:1,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1,
        margin: 10,
        backgroundColor: 'white',
        fontSize: 18,
        padding: 5,
        color: 'green',
        textAlign: 'center'
    },
    container: {

        marginHorizontal: 10,
    },
    text: {
        marginTop: 20,
        height: 40,
        textAlign: 'center',
        fontSize: 18,
    },
    image:{
        alignSelf: 'center',
        height: 250,
        width: 250,
        borderRadius: 5,
    }
});

const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps)(HomeScreen)
