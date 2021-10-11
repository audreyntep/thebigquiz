import React from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import {connect} from "react-redux";
import AppButton from "../components/AppButton";
import Header from "../components/Header";
import Database from "../core/Database";
import {theme} from "../core/theme";

class CameraScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: null,
            uri: null
        };
    }

    async useEffect(){
        const {status} = await Camera.requestPermissionsAsync();
        this.setState({hasPermission: status === 'granted'});
    }

    async snap(){
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            console.log(photo)
            this.setState({uri: photo.uri})
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        this.useEffect()
        if (this.state.hasPermission === null) {
            return <View/>;
        }
        if (this.state.hasPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={styles.container}>
                <Header title="Souriez !"/>
                <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={ref => {this.camera = ref;}}/>
                <AppButton title={'Prendre une photo'} onPress={() => this.snap()}/>
                <Image style={styles.preview} source={{uri: this.state.uri ? this.state.uri : './img/user.jpg'}}/>
                <AppButton title={'Valider'} onPress={() => navigate('LeGrandQuiz', {uri: this.state.uri})}/>
                <TouchableOpacity onPress={() => navigate('LeGrandQuiz')} style={{backgroundColor:theme.colors.error}}>
                    <Text style={{color: 'white', textAlign: 'center',borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12}}>Annuler</Text>
                </TouchableOpacity>
            </View>
        );

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    camera: {
        alignSelf: 'center',
        marginTop: 20,
        padding: 5,
        height: 200,
        width: 200,
    },
    preview: {
        alignSelf: 'center',
        height: 100,
        width: 100,
        borderRadius: 50,
    }
});

const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps)(CameraScreen)
