import React, { Component } from "react";
import { Alert, KeyboardAvoidingView, View, ScrollView } from "react-native";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { styles } from "../utils/styles";
import { createDeck, saveDeck } from "../utils/api";
import { addDeck } from "../actions";
import { Formik } from "formik";
import { Button } from "react-native-paper";
import * as yup from "yup";

class AddDeck extends Component {

    toDeckDetails = (item) => {
        const { navigate } = this.props.navigation;
        this.props.navigation.navigate('DeckDetails', {deck: item })
    }

    render() {
        const { navigate } = this.props.navigation;
        const { decks } = this.props;

        return(
            <Formik
            initialValues={{ title: "" }}
            onSubmit={(values) => {
              const deck = createDeck(values.title);
              saveDeck(deck);
              this.props.addDeck(deck);
              this.toDeckDetails(deck[values.title])
              values.title = ""
            }}
            validationSchema={yup.object().shape({
              title: yup.string().required("Deck title is required"),
            })}
          >
            {(props) => (
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.deckInput}
                  placeholder="Deck Title"
                  onChangeText={props.handleChange("title")}
                  value={props.values.title}
                  onBlur={() => props.setFieldTouched("title")}
                />
                {props.touched.title && props.errors.title && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {props.errors.title}
                  </Text>
                )}
                <Button
                  title="Add Deck"
                  color="maroon"
                  disabled={!props.isValid}
                  onPress={props.handleSubmit}
                >
                  Add Deck
                </Button>
              </View>
            )}
          </Formik>
        )
    }


}

const mapStateToProps = (decks) => {
    return { decks };
  };
  
  export default connect(mapStateToProps, { addDeck })(AddDeck);