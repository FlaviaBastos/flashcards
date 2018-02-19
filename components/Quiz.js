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
      card: {},
      value: '',
      showAnswer: false,
      idx: 0
    }
  }

  componentDidMount() {
    getDeck(this.state.title)
      .then((deck) => {
        // console.log('CAME BACK: ', deck.questions)
        this.setState(() => ({
          questions: deck.questions,
          card: deck.questions[0]
        }))
      })
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.value.length < nextProps.value.length) {
      console.log('WILL RECEIVE PROPS')
      this.setState({value: nextProps.value})
    }
  } // not necessary ???


  flipCard = () => {
    console.log('GONNA FLIP THIS CARD')
    const { card, value, showAnswer } = this.state
    this.setState((state) => ({
      // value: 'something',
      showAnswer: !showAnswer
    }))
  }

  correct = () => {
    const { idx } = this.state
    console.log('CORRECT. Next: ', idx)
    // also moves to next question
  }

  incorrect = () => {
    const { idx } = this.state
    console.log('INCORRECT. Next: ', idx)
    // also moves to next question
  }

  render() {
    const { questions, card, value, showAnswer } = this.state
    if (questions !== null) {
      console.log('QUESTIONS: ', questions)
    }

    return (
      <View>
        {showAnswer === true
          ? <Card
            value={card.answer}
            onFlip={() => this.flipCard()}
            />
          : <Card
            value={card.question}
            onFlip={() => this.flipCard()}
            />
        }
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
