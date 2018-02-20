import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { getDeck } from '../utils/api'
import AddQuestion from '../components/AddQuestion'

function AddBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.submitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>ADD CARD</Text>

        {/* this may go right in render
          onPress={() => this.props.navigation.navigate(
          'EntryDetail',
          { entryId: key }
        )} */}
    </TouchableOpacity>
  )
}

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
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params

    return {
      title: deckTitle
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.navigation.state.params.deckTitle,
      deck: null
    };
  }

  componentDidMount() {
    getDeck(this.state.title)
      .then((deck) => {
        console.log('CAME BACK: ', deck)
        this.setState({deck})
      })
  }

  addCard = () => {
    console.log('WILL ADD CARD')
    // <AddQuestion toDeck=this.state.title />
  }

  startQuiz = () => {
    console.log('WILL START QUIZ')
  }

  render() {
    const { deck, title } = this.state
    console.log('DECK TITLE: ', title)
    // clear this up!
    if (deck !== null) {
      console.log('DECK DETAIL: ', title, deck["questions"].length)
      // let total = deck[title]["questions"].length
      // let numberQuestions = deck[title]["questions"].length
    } // clear this up!


    return (
      <View>
        <Text>in deck detail!!!</Text>
        <Text> Deck Name:  {title}</Text>
        {deck !== null && (
          <Text> Questions in the deck: {deck["questions"].length}</Text>
        )}
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
    width: 190,
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
})
