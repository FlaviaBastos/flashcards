import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { getDecks } from '../utils/api'

export default class DeckDetail extends Component {
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
      <View style={styles.container}>
        {decks !== null && (
          Object.entries(decks).map(deck =>
            <View style={styles.deckList} key={deck[0]}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate(
                  'DeckDetail',
                  { deckTitle: deck[1]["title"] }
                )}>
                <Text style={{fontSize: 20}}>
                  {deck[1]["title"]}
                </Text>
                {deck[1]["questions"].length > 1
                ? <Text>
                  {deck[1]["questions"].length} cards
                  </Text>
                : <Text>
                  {deck[1]["questions"].length} cards
                  </Text>
                }
              </TouchableOpacity>
            </View>
          )
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  deckList: {
    backgroundColor: '#FFF',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  }
})
