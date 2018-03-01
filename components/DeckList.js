import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { getDecks } from '../utils/api'

export default class DeckList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allDecks: null
    }
  }

  componentDidMount() {
    getDecks()
      .then((allDecks) => {
        this.setState({allDecks})
      })
  }

  render () {
    const decks = this.state.allDecks

    return (
      <ScrollView style={styles.container}>
        <View style={{justifyContent: 'center'}}>
          {decks !== null && (
            Object.entries(decks).map(deck =>
              <View style={styles.deckList} key={deck[0]}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate(
                    'DeckDetail',
                    { deckTitle: deck[1]["title"] }
                  )}>
                  <Text style={styles.header}>
                    {deck[1]["title"]}
                  </Text>
                  {deck[1]["questions"].length > 1
                  ? <Text style={styles.text}>
                    {deck[1]["questions"].length} cards
                    </Text>
                  : <Text style={styles.text}>
                    {deck[1]["questions"].length} cards
                    </Text>
                  }
                </TouchableOpacity>
              </View>
            )
          )}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  deckList: {
    backgroundColor: '#FFF',
    margin: 20,
    padding: 20,
    borderRadius: 2,
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  submitBtn: {
    backgroundColor: '#FF9912',
    margin: 10,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center'
  },
  header: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center'
  },
  text: {
    color: '#000',
    fontSize:12,
    textAlign: 'center'
  }
})
