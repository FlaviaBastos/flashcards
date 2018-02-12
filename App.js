import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import AddDeck from './components/AddDeck'
import AddQuestion from './components/AddQuestion'
import DeckDetail from './components/DeckDetail'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <AddDeck /> */}
        {/* <AddQuestion toDeck="A1" /> */}
        <DeckDetail selectedDeck="A1" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
