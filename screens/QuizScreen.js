import React from 'react';
import {View,Text, Image,TextInput, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import {connect} from "react-redux";
import Database from "../core/Database";
import Question from "../components/Question";
import AppButton from "../components/AppButton";

class QuizScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.route.params.playerId,
            name: this.props.route.params.playerName,
            loading: false,
            nbQuestion: 5,
            correctScore: 5,
            questions: [],
            current: 0,
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
            'https://opentdb.com/api.php?amount=6&category=11&type=boolean', {
                method : 'POST', headers: { Accept: 'application/json','Content-Type':'application/json'}
            }
        );
        const questions = await response.json();
        const { results } = questions;
        await this.setState({ questions: results, loading: false });
    };

    //gestion de la validation de la réponse
    submitAnswer = (index, answer) => {
        //on récupère la question courante
        const question = this.state.questions[index];
        //on vérifie si la réponse du joueur est identique
        const isCorrect = question.correct_answer === answer;
        //on attribue les points
        if(isCorrect){this.setState({score: + this.state.correctScore})};
        //on change de question
        this.setState({current: index + 1});
    };

    //on vérifie que le quiz est terminé
    isQuizCompleted(){
        return this.state.current === this.state.nbQuestion;
    };

    //on enregistre le score et redirige vers le dashboard
    static async updateScore(id: number, score: number,navigate: function){
        await Database.updatePlayerScore(id, score);
        navigate('Dashboard', {playerId: id})
    };


    render(){
        let indice = 0;
        indice+=1;
        console.log('4. start quiz'+ indice);
        let completed = this.isQuizCompleted();
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.containerView}>
                {!!this.state.loading && (
                    <View style={styles.loadingQuestions}>
                        <ActivityIndicator size="large" color="#00ff00" />
                        <Text>Chargement du quiz...</Text>
                    </View>
                )}

                {!!this.state.questions.length > 0 &&
                completed === false && (
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
                {!!completed === true && (
                    <View>
                        <AppButton title={'Voir les scores'} onPress={() => QuizScreen.updateScore(this.state.id, this.state.score, navigate)}/>
                    </View>
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
