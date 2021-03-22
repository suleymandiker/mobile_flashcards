import React, { Component } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { styles } from "../utils/styles";
import { clearReminder, setReminder } from '../utils/api'

class Quiz extends Component {
  state = {
    flip: false,
    score: 0,
    passed: 0,
  };

  handleRightAnswer = () => {

    const { route } = this.props;
    const { item } = route.params;
    const { questions, title } = item;
    const numQuestion = questions.length
		questions.push(questions.shift())

		const newAnswered = this.state.score + 1

		this.setState((currentState) => ({
			score: currentState.score + 1,
			passed: currentState.passed + 1,
			flip:false,
		}))

    if ( newAnswered === numQuestion )
		{
			clearReminder().then(setReminder)
		}
	
	}

	handleWrongAnswer = () => {

    const { route } = this.props;
    const { item } = route.params;
    const { questions, title } = item;
    const numQuestion = questions.length
    questions.push(questions.shift())

		this.setState((currentState) => ({
			score: currentState.score + 1,
			flip:false,
    }))
    
    const newAnswered = this.state.score

    if ( newAnswered === numQuestion )
		{
			clearNotification().then(setNotification)
		}

	}

  resetQuiz = () => {

		this.setState(() => ({ 
			flip: false,
			score: 0,
			passed: 0 
		}))

	}
	
	toDeckDetails = (item) => {
		const { navigate } = this.props.navigation;
		this.props.navigation.navigate('DeckDetails', { deck : item })
	}

  render() {
    const { route } = this.props;
    const { item } = route.params;
    const { questions, title } = item;
    const numQuestion = questions.length
    
    if ( this.state.score === questions.length ) 
		{
			return (
				<View style={styles.results}>
            { (this.state.passed / numQuestion) === 1 && <Text style={styles.biggerFont}>CONGRATULATIONS!</Text>}
					  <Text style={styles.biggerFont}>SCORE</Text>
						<Text
							style={[styles.percent, {
								color: (this.state.passed / numQuestion) < 0.8 
												? (this.state.passed / numQuestion) < 0.7 ? 'red' : 'purple' 
												: 'green'
							}]}
						>{ Math.round((this.state.passed / numQuestion) * 100) }%</Text>

						<Text
							style={styles.biggerFont}
						>{this.state.passed}/{numQuestion} Correct</Text>

				

					<TouchableOpacity
						style={[styles.resetbtn, 
							Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn
						]}
						onPress={this.resetQuiz}
					>
						<Text style={styles.reset_text}>Restart Quiz</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.resetbtn, 
							Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn
						]}
						onPress={() => this.toDeckDetails(item)}
					>
						<Text style={styles.reset_text}>Back to Deck</Text>
					</TouchableOpacity>


				</View>
			)
		}

    return (
      <View style={styles.quizContainer}>
     

      {
        questions.map((question, index) => (
        <View
          key={index}
          style={styles.quizcard}
        >
          {!this.state.flip ? (
            <Text style={styles.questionStyle}>{question.question}</Text>
          ) : (
            <Text style={styles.questionStyle}>{question.answer}</Text>
          )}

          <TouchableOpacity
            onPress={() =>
              this.setState(() => ({
                flip: !this.state.flip,
              }))
            }
          >
            {this.state.flip ? (
              <Text style={styles.flip}>Hide Answer</Text>
            ) : (
              <Text style={styles.flip}>Show Answer</Text>
            )}
          </TouchableOpacity>
        </View>
        ))
        
      }
      <View style={styles.correctbtn}>
      <View style={styles.score}>
						<Text style={styles.counter}>
							{this.state.score}/{numQuestion} answered
						</Text>
					</View>
					
					<TouchableOpacity 
						style={[styles.showAnsbtn, {borderColor: 'green'}]}
						onPress={this.handleRightAnswer}
					>
						{
							Platform.OS === 'ios'
							? <Ionicons name='ios-checkmark-circle-outline' size={66} style={styles.passed} />
							: <Ionicons name='md-checkmark-circle-outline' size={66} style={styles.passed} />
						}
					</TouchableOpacity>

					<TouchableOpacity 
						style={[styles.showAnsbtn, {borderColor: 'red'}]}
						onPress={this.handleWrongAnswer}
					>
						{
							Platform.OS === 'ios'
							? <Ionicons name='ios-close-circle-outline' size={66} style={styles.incorrect} />
							: <Ionicons name='md-close' size={66} style={styles.incorrect} />
						}
					</TouchableOpacity>

				</View>

      </View>
    );
  }
}

export default Quiz;
