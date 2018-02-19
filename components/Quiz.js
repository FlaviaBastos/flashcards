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
          idx !== questions.length
          ? <View>
              {showAnswer
                ? <Card
                  value={questions[idx].answer}
                  onFlip={() => this.flipCard()}
                  />
                : <Card
                  value={questions[idx].question}
                  onFlip={() => this.flipCard()}
                  />}
              <Text>Not yet: {idx}</Text>
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
          : <Text>Done with cards! Total score: {score}</Text>
        )}
        <Text>Current score: {score} and idx: {idx}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})
