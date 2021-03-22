import React from 'react'
import { StatusBar,View } from 'react-native'
import Constants from "expo-constants"

function HeaderBar({ backgroundColor, ...props}) {
    return(
        <View style={{ backgroundColor, height: Constants.statusBarHeight}}>
<StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

export default HeaderBar;