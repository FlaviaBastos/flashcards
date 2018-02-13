import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import { getDecks } from '../utils/api'
import getStuff from '../fakeData'

function ShowDecks ({ title, questions }) {
  return (
    <View style={styles.deckList}>
      <Text style={{fontSize: 20}}>{title}</Text>
      <Text>{questions} cards</Text>
    </View>
  )
}

export default class DeckDetail extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     allDecks: []
  //   }
  // }
  //
  // componentDidMount() {
  //   getDecks(this.props.title)
  //     .then((allDecks) => {
  //       console.log('CAME BACK: ', allDecks)
  //       this.setState({allDecks})
  //     })
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (this.state.allDecks.length <  !=== nextProps.allDecks.length) {
  //     this.setState(allDecks: nextProps.allDecks)
  //   }
  // }
  // https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1

  render() {
    const decks = getStuff()
    let deckCollection = Object.entries(decks)

    return (
      <ScrollView>
        {deckCollection.map(deck =>
          <ShowDecks key={deck[0]} title={deck[1]["title"]} questions={deck[1]["questions"].length} />
        )}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  input: {
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: '#757575',
    margin: 50,
  },
})
