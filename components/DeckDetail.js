import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { getDeck } from '../utils/api'

function AddBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.submitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>ADD CARD TO DECK</Text>
    </TouchableOpacity>
  )
}
// make the two buttons the same length
// make two buttons slightly different

function QuizBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.submitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>START QUIZ</Text>
    </TouchableOpacity>
  )
}

export default class DeckDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.selectedDeck,
      deck: null
    };
  }

// how to receive deck info and display on the screen?
  componentDidMount() {
    getDeck(this.props.title)
      .then((deck) => {
        console.log('CAME BACK: ', deck)
        this.setState({deck})
      })
  }

  addCard = () => {
    console.log('WILL ADD CARD')
  }

  startQuiz = () => {
    console.log('WILL START QUIZ')
  }

  render() {
    const { deck, title } = this.state
    console.log('DECK TITLE: ', title)
    if (deck !== null) {
      console.log('DECK DETAIL: ', deck[title]["questions"].length)
      let numberQuestions = deck[title]["questions"].length
    }


    return (
      <View>
        <Text> Deck Name:  {title}</Text>
        {deck !== null &&
          <Text> Questions in the deck: {deck[title]["questions"].length} </Text>
        }
        <AddBtn onPress={this.addCard} />
        <QuizBtn onPress={this.startQuiz} />
      </View>
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
