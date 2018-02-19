import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { getDecks } from '../utils/api'

function ShowDecks ({ title, questions }) {
  const formattedQuestions =
    questions > 1
    ? `${questions}  cards`
    : `${questions}  card`

  return (
    <View style={styles.deckList}>
      <Text style={{fontSize: 20}}>{title}</Text>
      <Text>{formattedQuestions}</Text>
    </View>
  )
}

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

  componentWillReceiveProps (nextProps) {
    if (this.state.allDecks.length < nextProps.allDecks.length) {
      this.setState({allDecks: nextProps.allDecks})
    }
  }

  render() {
    const decks = this.state.allDecks

    return (
      <View style={styles.container}>
        {decks !== null && (
          Object.entries(decks).map(deck =>
            <ShowDecks key={deck[0]}
              title={deck[1]["title"]}
              questions={deck[1]["questions"].length}
            />
          )
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deckList: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
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
