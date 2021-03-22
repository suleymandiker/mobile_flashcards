import React from 'react'
import { View } from 'react-native'
import { styles } from '../utils/styles'

function Deck(props) {
    return(
        <View style={styles.deck}>
           <View style={styles.deckContent} >
               {props.children}
           </View>
        </View>
    )
}

export default Deck;