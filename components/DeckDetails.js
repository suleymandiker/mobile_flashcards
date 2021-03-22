import React, { Component } from "react";
import { styles } from "../utils/styles";
import { Text, View, TouchableOpacity, Platform, Alert } from "react-native";
import { connect } from "react-redux";
import { Feather } from "@expo/vector-icons";
import Deck from "./Deck";

class DeckDetails extends Component {

	toNewQuestion = () => {
		const { deck } =  this.props;
		this.props.navigation.navigate('AddCard', {item: deck})

	}

	toStartQuiz = () => {

    const { deck } = this.props;
		if (this.props.questions.length > 0)
		{
			this.props.navigation.navigate('Quiz', {item: deck})
		}
		else
		{
			Alert.alert(
        'Alert!!!',
				'The deck doesnt have any cards!', 
				[
					{ text: 'Add Card', onPress: this.toNewQuestion },
					{ text: 'Cancel' }
				]
			)
		}
	}


  render() {
    const { deck } = this.props;
    console.log("DeckDetails part....")
    console.log(deck)
    return (
      <View style={styles.formContainer}>
        <Deck>
          <View style={styles.deckInfo}>
            <Text>{deck.questions.length} Cards</Text>
            <TouchableOpacity
              style={
                Platform.OS === "ios" ? styles.ios_btn : styles.android_btn
              }
			  onPress={this.toStartQuiz}
            >
              <Feather name="play" size={24} color="#5c5555" />
              <Text style={styles.button_text}> Start quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                Platform.OS === "ios" ? styles.ios_btn : styles.android_btn
              }
			  onPress={this.toNewQuestion}
            >
              <Feather name="plus-circle" size={24} color="#5c5555" />
              <Text style={styles.button_text}> New question</Text>
            </TouchableOpacity>
          </View>
        </Deck>
      </View>
    );
  }
}

function mapStateToProps(decks,props) {

  const currentDeck = Object.keys(decks).filter((deck) => deck === props.route.params.deck.title );
  const myDeck = decks[currentDeck]


	return {
    questions:myDeck.questions,
    title:myDeck.title,
    deck:myDeck,
	}
}

export default connect(mapStateToProps)(DeckDetails);
