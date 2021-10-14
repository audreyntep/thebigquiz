import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import AppButton from "./AppButton";
import {theme} from "../core/theme";
import Header from "./Header";

export default class Question extends React.Component {
    constructor() {
        super();

        this.state = {
            answer: null
        };
    }

    renderOptions = question => {
        if (question.type === "boolean") {
            return [
                <RadioButton value={"True"} key={1}>
                    <Text style={styles.radioText}>True</Text>
                </RadioButton>,

                <RadioButton value={"False"} key={2}>
                    <Text style={styles.radioText}>False</Text>
                </RadioButton>
            ];
        } else {
            const result = [];

            question.incorrect_answers.forEach((item, index) => {
                let key = `${question.id}-${index}`;

                if (index === this.props.correctPosition) {
                    let key2 = `${question.id}-100`;
                    result.push(
                        <RadioButton value={question.correct_answer} key={key2}>
                            <Text style={styles.radioText}>{question.correct_answer}</Text>
                        </RadioButton>
                    );
                }

                result.push(
                    <RadioButton value={item} key={key}>
                        <Text style={styles.radioText}>{item}</Text>
                    </RadioButton>
                );
            });

            return result;
        }
    };

    render() {
        return (
            <View style={styles.containerView}>
                <Text style={styles.player}>{this.props.name}</Text>
                <Text style={styles.index}>
                    Question : {this.props.current + 1} / {this.props.nbQuestion}
                </Text>
                <Text style={styles.question}>
                    {this.props.question.question}
                </Text>
                <RadioGroup
                    onSelect={(index, answer) => this.setState({ answer })}
                    selectedIndex={null}
                >
                    {this.renderOptions(this.props.question)}
                </RadioGroup>

                <AppButton title={'Valider'} onPress={() => {
                    this.props.onSelect(this.state.answer);
                }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        padding: 12,
    },
    radioText: {
        fontSize: 20
    },
    index: {
        fontSize: 18,
        color: "#666",
        textAlign: "right",
    },
    question: {
        fontSize: 24,
        color: theme.colors.primary,
        padding: 10,
        marginTop: 15,
    },
    player: {
        textAlign: 'center',
        color:theme.colors.primary,
        fontSize: 18,
        fontWeight: 'bold'
    }
});
