import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import AddDeck from './components/AddDeck'
import AddQuestion from './components/AddQuestion'
import DeckDetail from './components/DeckDetail'
import DeckList from './components/DeckList'
import Quiz from './components/Quiz'
import { TabNavigator } from 'react-navigation'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DECKS',
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: '#FF9912',
    style: {
      height: 56,
      backgroundColor: '#fff',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <AddDeck /> */}
        {/* <AddQuestion toDeck="A1" /> */}
        {/* <DeckDetail selectedDeck="A1" /> */}
        {/* <DeckList /> */}
        {/* <Quiz selectedDeck="A1" /> */}
        <Tabs />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  }
})
