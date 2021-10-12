import React from 'react';
import {View, StyleSheet, TextInput, Alert, Text, Image} from 'react-native';
import AppButton from "../components/AppButton";
import { connect } from 'react-redux';
import Database from "../core/Database";
import Header from "../components/Header";
import {Camera} from "expo-camera";


class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            cameraView: true,
            hasPermission: null,
            uri: null
        };
    }

    componentDidMount() {
        //Database.clearDatabase();
        Database.initializeDatabase();
    }

    async useEffect(){
        const {status} = await Camera.requestPermissionsAsync();
        this.setState({hasPermission: status === 'granted'});
    }

    async snap(){
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            console.log(photo);
            this.setState({uri: photo.uri});
            this.setState({cameraView: false});
        }
    }

    static async onPressRegisterPlayer(name: string, uri: string, navigate: function){
        console.log('2. register player');
        //si aucun nom n'a été saisi
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
        //si aucune photo n'a été prise
        if(uri === null){
            Alert.alert(
                'Photo !',
                'Prendre une photo.',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
            );
        }

        //on crée un nouveau player
        let playerId = await Database.createPlayer(name, uri);
        //puis redirection vers la page quiz avec l'id player en props
        navigate('Quizscreen', {playerId: playerId});
    }

    render(){
        const {navigate} = this.props.navigation;
        //console.log(this.props.route.params);

        this.useEffect()
        if (this.state.hasPermission === null) {
            return <View/>;
        }
        if (this.state.hasPermission === false) {
            return <Text>No access to camera</Text>;
        }

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
                    {!!this.state.cameraView === true && (
                        <View>
                            <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={ref => {this.camera = ref;}}/>
                            <AppButton title={'Prendre une photo'} onPress={() => this.snap()}/>
                        </View>
                    )}
                    {!!this.state.cameraView === false && (
                        <View>
                            <Image style={styles.camera} source={{uri: this.state.uri}}/>
                            <AppButton title={'Reprendre une photo'} onPress={() => this.setState({cameraView: true})}/>
                        </View>
                    )}
                    <AppButton title={'Commencer !'} onPress={() => HomeScreen.onPressRegisterPlayer(this.state.name, this.state.uri, navigate)}/>
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
    },
    camera: {
        alignSelf: 'center',
        marginTop: 20,
        padding: 5,
        height: 200,
        width: 200,
        borderRadius: 50,
    }
});

const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps)(HomeScreen)
