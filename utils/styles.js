import { StyleSheet,Dimensions } from 'react-native'

export const styles = StyleSheet.create({
	container: {
		flex: 1
    }, 
    deck: {
        borderRadius:6,
        elevation:3,
        backgroundColor:'#FFFFFE',
        shadowOffset: { width:1,height:1},
        shadowColor: '#333',
        shadowOpacity:0.3,
        shadowRadius:2,
        marginHorizontal:4,
        marginVertical:6,
      },
      deckInfo:{
        display: "flex",
        flexDirection: "column",
      },
      deckContent:{        
        display: "flex",
        flexDirection: "row",
         marginHorizontal:18,
         marginVertical:10,
         justifyContent: "space-between",
         alignItems: "center",
      },
      deckTitle: {
        fontSize: 18,
        color: 'green',
      },
      formContainer:{
        display: "flex",
        flexDirection: "column",
        padding:30,
         marginHorizontal:18,
         marginVertical:10,
         justifyContent: "space-between",
      },
      title: {
        fontSize: 22,
        color: 'gray',
        justifyContent:"center"
      },
      deckInput: {
          borderWidth:1,
          borderColor:'#ddd',
        backgroundColor: 'lightgray',
        fontSize:18,
        padding: 10,
        color: 'black',
        borderRadius: 10,
        marginBottom: 10
      },
      ios_btn: {
        borderWidth: 1,
        borderRadius: 7,
        padding: 10,
        margin: 10
      },
      android_btn: {
        backgroundColor: '#fa7d7d',
        padding: 15,
        marginTop: 15,
        borderRadius: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
      button_text: {        
        color: 'maroon',
        textAlign: 'center',
        fontSize: 18
      },
      quizContainer:{
        display: "flex",
        flexDirection: "column",
        padding:50,
         marginHorizontal:18,
         marginVertical:100,
         justifyContent: "space-between",
      },
      quizcard: {        
        height: Dimensions.get('window').height / 3,
        width: Dimensions.get('window').width - 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,               
        borderRadius: 10,
        position: "absolute",
        backgroundColor: '#FFFFFE',
        marginTop: 20,
        padding: 20, 
      },
      questionStyle: {
        fontSize: 33,
        textAlign: 'center',
        lineHeight: 36,
      },
      flip: {
        fontSize: 22
      }, 
      score:{ 
        fontSize: 22,
        lineHeight: 22,
        marginTop: 10,
        alignItems:'center',
      },
      correctbtn: {
        color: '#00473E',
        fontSize: 18,
        lineHeight: 22,
        marginTop: 200,        
        alignItems:'center',
       }, 
       showAnsbtn:{
         margin:10,
         marginTop: 20,
         color: '#FFA8BA',
         fontSize: 18,
         lineHeight: 22,
       },
       results: {
        display: "flex",
        flexDirection: "column",
        padding:50,
         marginHorizontal:18,
         marginVertical:100,
         justifyContent: "space-between",     
        backgroundColor: '#FFFFFE',               
        alignItems:'center',
      },
      biggerFont: {
        fontSize: 22
      },      
	    percent: {
		    fontSize: 55,
		    marginBottom: 20
      },
      
    	iosBtn: {
		    borderRadius: 7,
	    },
	    androidBtn: {
		    borderRadius: 2,
	    },
      resetbtn: {        
        marginTop:20,
        borderRadius: 7,
        borderWidth: 1,
        padding: 10,
        color: '#FFA8BA',
      },
       
}) 