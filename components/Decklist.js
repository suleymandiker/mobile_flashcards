import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList,SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks,saveDeck, getData,ResetDecks,setReminder } from '../utils/api'
import Deck from './Deck'
import { Feather } from "@expo/vector-icons";
import { styles } from '../utils/styles'
import AsyncStorage from '@react-native-community/async-storage';



class Decklist extends Component {


	toDeckDetails = (item) => {
		const { navigate } = this.props.navigation;
		this.props.navigation.navigate('DeckDetails', { deck : item })
	}

	renderDeckItem = ({ item }) => {
		return (
			<TouchableOpacity onPress={() => this.toDeckDetails(item)}>
            <Deck>
            <View style={styles.deckInfo}>
            <Text style={styles.deckTitle}>{item.title}</Text>
			<Text>{item.questions.length} Cards</Text>
            </View>
                <Feather name="arrow-right-circle" color='black' size={24} />
            </Deck>            
			</TouchableOpacity>
		)
	}

  
    
         
       

    componentDidMount() {

       ResetDecks();
       getDecks().then((results) => {
		this.props.dispatch(receiveDecks(results))  
        if (!results) {
            saveDeck(getData());
                     
          }
        })

    

	}
	 

	render() {
		
		return (
			<SafeAreaView style={styles.container}>
            <Text style={styles.title}>My Decks</Text>
				<FlatList 
					data={this.props.decks}
					renderItem={this.renderDeckItem}
					keyExtractor={(item, index) => item.title}
				/>
			</SafeAreaView>
		)
	}

}


function mapStateToProps(decks) {
	return {
		decks: Object.keys(decks).map((deck) => decks[deck] )
	}
}

export default connect(mapStateToProps)(Decklist)