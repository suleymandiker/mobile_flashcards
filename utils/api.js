import AsyncStorage from '@react-native-community/async-storage';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import {Alert, Linking} from 'react-native';
import { decks } from './_DATA';

const REMINDER_KEY = 'MobileFlashcards:reminder'
const DECKS_STORAGE_KEY = 'MobileFlashcards:decks'


export function getData() {
  return decks;
}

export async function getDecks() {
  try {
      const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

      if(storeResults == null) {
        AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(decks))
      }

      return storeResults === null ? decks : JSON.parse(storeResults);
    
  } catch (e) {
    console.log(e)
    
  }
}


export async function saveDeck(deck) {
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(deck));
  }


export async function ResetDecks() {
    try {
        return AsyncStorage.removeItem(DECKS_STORAGE_KEY)
    } catch (error) {
        console.error('We have a problem about removing');
    }
}
 





  export function createDeck(deckTitle) {

    return {
      [deckTitle]: {
        title: deckTitle,
        questions: []
      }
    };
  }

  export function addQuestToDeck(title, card) {
  

    getDecks().then((decks) => {
      decks[title] = {
        ...decks[title],
        questions: [...decks[title].questions, card]
        
    }
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
  })
  }


  function createReminder() {
    return {
      title: 'Fllashcard reminder!',
      body: "Time to take up the quiz today",
      ios: {
        sound: true
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true
      }
    }
  }
  
  
  export function setReminder() {
  
    AsyncStorage.getItem(REMINDER_KEY)
    .then(JSON.parse)
    .then((data) => {
  
      if (data === null)
      {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if( status !== 'granted')
            {
               Alert.alert(
                 "Access not allowed",
                 "Please go to settings and enable permissions for this device",
                 [
                   { text: "Cancel", onPress:() => console.log('cancel') },
                   { text: "Allow", onPress:() => Linking.openURL("app-settings:")}
                 ],
                 { cancelable : false}
               );
               return;
            }
            if (status === 'granted')
            {
              Notifications.cancelAllScheduledNotificationsAsync()

              Notifications.setNotificationHandler({
                handleNotification: async () => ({
                  shouldPlaySound: true,
                  shouldShowAlert: true,
                  shouldSetBadge: false
                })
              })
                
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(19)
              tomorrow.setMinutes(20)
  
              Notifications.scheduleNotificationAsync({
                content: createReminder(),
                trigger: {
                    hour: 19, minute: 20, repeats: true 
                  }
              })
              
              AsyncStorage.setItem(REMINDER_KEY, JSON.stringify(true))
            }
          })
      }
  
    })
  }
  
  
  export function clearReminder() {
    return AsyncStorage.removeItem(REMINDER_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }