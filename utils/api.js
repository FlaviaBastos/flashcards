import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'Flashcards:decks'

export function getDecks () {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
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
    deck.questions.push(card)
    AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
      [title]: deck
    }))
  })
}
