import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import AddDeck from './components/AddDeck'
import AddQuestion from './components/AddQuestion'
import DeckDetail from './components/DeckDetail'
import DeckList from './components/DeckList'
import Quiz from './components/Quiz'
import { TabNavigator } from 'react-navigation'
import { Constants } from 'expo'

function FlashStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

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
    activeTintColor: '#FFF',
    style: {
      height: 56,
      backgroundColor: '#FF9912',
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
        <FlashStatusBar backgroundColor={"#FF9912"} barStyle="light-content" />
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
  }
})
