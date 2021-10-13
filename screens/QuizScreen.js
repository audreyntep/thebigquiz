import React from 'react';
import {View,Text, Image,TextInput, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import {connect} from "react-redux";
import Database from "../core/Database";
import Question from "../components/Question";
import AppButton from "../components/AppButton";
import { Card, ListItem, Button, Icon } from 'react-native-elements';

const users = [
    {
        name: 'john',
        avatar: '/img/user.jpg',
        score: 10,
    },
    {
        name: 'brynn',
        avatar: '/img/user.jpg',
        score: 20,
    },
    {
        name: 'helen',
        avatar: '/img/user.jpg',
        score: 15,
    },
    {
        name: 'audrey',
        avatar: '/img/user.jpg',
        score: 25,
    },
]


class QuizScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.route.params.playerId,
            name: this.props.route.params.playerName,
            loading: false,
            nbQuestion: 5,
            correctScore: 5,
            completed: false,
            questions: [],
            current: 1,
            score:0
        };
    }

    componentDidMount() {
        this.fetchQuestions();
    }

    //gestion des questions
    fetchQuestions = async () => {
        //chargement des questions
        await this.setState({ loading: true });
        //on récupère les questions depuis un serveur distant
        const response = await fetch(
            'https://opentdb.com/api.php?amount='+this.state.nbQuestion+'&category=11&type=boolean', {
                method : 'POST', headers: { Accept: 'application/json','Content-Type':'application/json'}
            }
        );
        const questions = await response.json();
        const { results } = questions;
        /*results.forEach(item => {
            item.id = Math.floor(Math.random() * 10000);
        });*/
        await this.setState({ questions: results, loading: false });
    };

    //gestion de la validation de la réponse
    submitAnswer = (index, answer) => {
        console.log('submit current '+this.state.current);
        //on récupère la question courante
        const question = this.state.questions[index];
        //on vérifie si la réponse du joueur est identique
        const isCorrect = question.correct_answer === answer;
        //on attribue les points
        if(isCorrect){this.setState({score: + this.state.correctScore})};
        //on change de question
        this.setState({current: index + 1});
        //on vérifie que la partie n est pas finie
        this.setState({completed: this.state.current === this.state.nbQuestion});
        /*
        console.log('completed :'+this.state.completed);
        if(this.state.completed === true){
            navigate('Dashboard');
        }*/
    };

    async navigateToDashboard(navigate){
        if(this.state.current === this.state.nbQuestion){await navigate('Dashboard');}
    }

    render(){
        console.log('4. start quiz');
        const {navigate} = this.props.navigation;
        console.log('render current '+this.state.current);
        this.navigateToDashboard({navigate});
        return (
            <View style={styles.containerView}>
                {!!this.state.loading && (
                    <View style={styles.loadingQuestions}>
                        <ActivityIndicator size="large" color="#00ff00" />
                        <Text>Chargement du quiz...</Text>
                    </View>
                )}

                {!!this.state.questions.length > 0 &&
                this.state.completed === false && (
                    <Question
                        onSelect={answer => {
                            this.submitAnswer(this.state.current, answer);
                        }}
                        name={this.state.name}
                        nbQuestion={this.state.nbQuestion}
                        question={this.state.questions[this.state.current]}
                        correctPosition={Math.floor(Math.random() * 3)}
                        current={this.state.current}
                    />
                )}

            </View>
        )
    }
};

const styles = StyleSheet.create({
    containerView: {
        display: "flex",
        height: "100%",
        marginHorizontal: 10,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
    },
    loadingQuestions: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 25,
        marginTop: 20,
        color: 'green',
    },
    text: {
        margin: 20,
    },
    user: {
        fontSize: 18,
    },
    image: {
        height: 20,
        width: 20,
        borderRadius: 50,
    }
});

const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps)(QuizScreen)
