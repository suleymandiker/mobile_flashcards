import React, { Component } from "react";
import { Alert, KeyboardAvoidingView, View, ScrollView } from "react-native";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../utils/styles";
import Deck from "./Deck";
import { Formik } from "formik";
import { Button } from "react-native-paper";
import * as yup from "yup";
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { addQuestToDeck } from '../utils/api'

class AddCard extends Component {
 
  toDetails = (deck) => {
		this.props.navigation.navigate('DeckDetails', deck)
	}

  render() {
    const { route } = this.props;
		const { item } = route.params;

    return (
     
        <Formik
          initialValues={{ question: "",answer: "" }}
          onSubmit={(values) => {
            const newCard = {
			            	question: values.question,
			            	answer: values.answer
	        		}
              addQuestToDeck(item.title, newCard)
              this.props.dispatch(addCard(item.title, newCard))
              this.toDetails(item[item.title])
          }}
          validationSchema={yup.object().shape({
            question: yup.string().required("You must write question"),
            answer: yup.string().required("You must write answer"),
          })}
        >
          {(props) => (
            <View style={styles.formContainer}>
              <TextInput
                style={styles.deckInput}
                placeholder="Please enter your question..."
                onChangeText={props.handleChange("question")}
                value={props.values.question}
                onBlur={() => props.setFieldTouched("question")}
              />
              {props.touched.question && props.errors.question && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {props.errors.question}
                </Text>
              )}
              <TextInput
                style={styles.deckInput}
                placeholder="Please enter your answer..."
                onChangeText={props.handleChange("answer")}
                value={props.values.answer}
                onBlur={() => props.setFieldTouched("answer")}
              />
              {props.touched.answer && props.errors.answer && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {props.errors.answer}
                </Text>
              )}
              <Button
                title="Add Card"
                color="green"
                disabled={!props.isValid}
                onPress={props.handleSubmit}
              >
                Add Card
              </Button>
            </View>
          )}
        </Formik>
     
    );
  }
}

export default connect()(AddCard);
