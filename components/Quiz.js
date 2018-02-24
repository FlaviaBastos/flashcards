import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { getDeck } from '../utils/api'
import Card from './Card'
import DeckDetail from './DeckDetail'
import { Entypo } from '@expo/vector-icons'

export default class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params

    return {
      title: 'Quiz'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      title: this.props.navigation.state.params.deckTitle,
      questions: null,
      showAnswer: false,
      idx: 0,
      score: 0
    }
  }

  componentDidMount() {
    getDeck(this.state.title)
      .then((deck) => {
        this.setState(() => ({
          questions: deck.questions
        }))
      })
  }

  flipCard = () => {
    const { showAnswer } = this.state
    this.setState((state) => ({
      showAnswer: !showAnswer
    }))
  }

  correct = () => {
    const { idx, score, showAnswer } = this.state
    this.setState((prevState) => ({
      score: prevState.score + 1,
      idx: prevState.idx + 1,
      showAnswer: false
    }))
  }

  incorrect = () => {
    const { idx, showAnswer } = this.state
    this.setState((prevState) => ({
      idx: prevState.idx + 1,
      showAnswer: false
    }))
  }

  render() {
    const { questions, showAnswer, score, idx, title } = this.state

    return (
      <View style={styles.container}>
        {questions !== null && (
          questions.length === 0
          ? <View style={styles.box}>
              <Text style={styles.score}>
                There are no cards in this deck yet!
              </Text>
              <Entypo name='emoji-sad' size={30} color='#000' />
            </View>
          : idx !== questions.length
          ? <View style={styles.box}>
              {showAnswer
                ? <Card
                  value={questions[idx].answer}
                  onFlip={() => this.flipCard()}
                  />
                : <Card
                  value={questions[idx].question}
                  onFlip={() => this.flipCard()}
                  />}
              <TouchableOpacity
                style={[styles.submitBtn, {backgroundColor: '#008B00'}]}
                onPress={this.correct}>
                  <Text style={styles.submitBtnText}>CORRECT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.submitBtn, {backgroundColor: '#FF0000'}]}
                onPress={this.incorrect}>
                  <Text style={styles.submitBtnText}>INCORRECT</Text>
              </TouchableOpacity>
            </View>
          : <View  style={styles.box}>
              <Text style={styles.score}>Done! You got {Math.round((score *100) / questions.length)}% correct!</Text>
              <TouchableOpacity
                style={[styles.submitBtn, {backgroundColor: '#FF9912'}]}
                onPress={() =>
                  this.props.navigation.navigate(
                  'DeckDetail',
                  { deckTitle: title }
                )}>
                <Text style={styles.submitBtnText}>
                  Back to Deck</Text>
              </TouchableOpacity>
            </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    margin: 10,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    width: 190,
    borderRadius: 6,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
  },
  score: {
    color: '#000',
    fontSize: 25,
    textAlign: 'center',
  }
})
