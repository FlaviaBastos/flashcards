import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'Flashcards:decks'

// To manage your AsyncStorage database, you'll want to create four different helper methods.
//
// getDecks: return all of the decks along with their titles, questions, and answers.
// getDeck: take in a single id argument and return the deck associated with that id.
// saveDeckTitle: take in a single title argument and add it to the decks.
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.


export function getDecks () {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      console.log('DATA IN GETDECKS: ', data)
      return data
    })
}

export function getDeck (title) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      let deck = data[title]
      return deck
    })
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [title]: {
      'title': title,
      'questions': []
    }
  }))
}

export function addCardToDeck ({ title, card }) {
  return getDeck(title).then((deck) => {
    console.log('adding this card: ', card)
    console.log('adding card to this deck->: ', deck.questions)
    deck.questions.push(card)
    console.log('DECK CARDS ARE: ', deck["questions"])
    AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
      [title]: deck
    }), () => {
      AsyncStorage.getItem(STORAGE_KEY, (err, result) => {
        console.log('RESULT: ', result)
      })
    })
  })
}
