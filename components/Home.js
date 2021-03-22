import React from "react";
import {View,Text} from "react-native";
import Decklist from './Decklist'

function HomeScreen(props) {
    return (
      <View style={{ flex: 1,padding:25 }}>
        <Decklist {...props} />
      </View>
    );
  }


  export default HomeScreen;