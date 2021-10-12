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
            player: {
                name:"",
                score:"",
            },
            players: [],
            loading: false,
            questions: [],
            current: 0,
            correctScore: 5,
            totalScore: 50,
            results: {
                score: 0,
                correctAnswers: 0
            },
            completed: false
        };
    }

    componentDidMount() {
        this.fetchQuestions();
        console.log(Database.getPlayerById(this.state.id));
        this.setState({players: Database.getPlayers()});
        console.log(this.state.players);
    }

    fetchQuestions = async () => {
        await this.setState({ loading: true });
        const response = await fetch(
            'https://opentdb.com/api.php?amount=5&category=11&type=boolean', {
                method : 'POST', headers:{"Content-Type":"multipart/form-data"}
            }
        );
        const questions = await response.json();
        const { results } = questions;
        results.forEach(item => {
            //console.log(item.id);
            item.id = Math.floor(Math.random() * 10000);
        });
        await this.setState({ questions: results, loading: false });
    };

    reset = () => {
        this.setState(
            {
                questions: [],
                current: 0,
                results: {
                    score: 0,
                    correctAnswers: 0
                },
                completed: false
            },
            () => {
                this.fetchQuestions();
            }
        );
    };

    submitAnswer = (index, answer) => {
        const question = this.state.questions[index];
        const isCorrect = question.correct_answer === answer;
        const results = { ...this.state.results };

        results.score = isCorrect ? results.score + 5 : results.score;
        results.correctAnswers = isCorrect
            ? results.correctAnswers + 1
            : results.correctAnswers;

        this.setState({
            current: index + 1,
            results,
            completed: current === 4,
        });
        console.log('fini :'+this.state.completed);
        if(this.state.completed === true){
            navigate('Dashboard');
        }
    };

    render(){
        //const {navigate} = this.props.navigation;
        //console.log(this.state);
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
