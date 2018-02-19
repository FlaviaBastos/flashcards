import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { getDeck } from '../utils/api'
import Card from './Card'

export default class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.selectedDeck,
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
    console.log('INCORRECT.')
    // only moves to next question
    this.setState((prevState) => ({
      idx: prevState.idx + 1,
      showAnswer: false
    }))
  }

  render() {
    const { questions, showAnswer, score, idx } = this.state
    if (questions !== null) {
      console.log('QUESTIONS: ', idx, questions)
    }

    return (
      <View>
        {questions !== null && (
          showAnswer
            ? <Card
              value={questions[idx].answer}
              onFlip={() => this.flipCard()}
              />
            : <Card
              value={questions[idx].question}
              onFlip={() => this.flipCard()}
              />
        )}
        <TouchableOpacity
          style={styles.submitBtnCorr}
          onPress={this.correct}>
            <Text style={styles.submitBtnText}>CORRECT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitBtnInc}
          onPress={this.incorrect}>
            <Text style={styles.submitBtnText}>INCORRECT</Text>
        </TouchableOpacity>
        <Text>Current score: {score} and idx: {idx}</Text>
      </View>
    )
  }
}

// see how to apply style and and color separatelly
// syntax: style={[styles.row, {justifyContent: 'space-between'}]}
// make the all buttons the same length
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnFlip: {
    backgroundColor: '#fff',
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
  submitBtnCorr: {
    backgroundColor: '#008B00',
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
  submitBtnInc: {
    backgroundColor: '#FF0000',
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
  flipCardText: {
    color: '#FF9912',
    fontSize: 22,
    fontWeight: 'bold',
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
