import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { addCardToDeck, getDecks } from '../utils/api'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.submitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

export default class AddDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { toDeck } = navigation.state.params

    return {
      title: 'Add Card'
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.navigation.state.params.toDeck,
      question: '',
      answer: '',
      status: false
    };
  }

  handleQuestion = (question) => {
    this.setState(() => ({
      question
    }))
  }

  handleAnswer = (answer) => {
    this.setState(() => ({
      answer
    }))
  }

  submit = () => {
    const { question, answer, title } = this.state

    let card = {
      'question': question,
      'answer': answer
    }

    addCardToDeck({ title, card })
      .then(() => this.setState(() => ({status: true})))
  }

  render() {
    const { question, answer, status } = this.state

    if (status) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Card added to deck!</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <TextInput
          placeholder='Type your question here'
          value={question}
          style={styles.input}
          onChangeText={this.handleQuestion}
        />
        <TextInput
          placeholder='Type your answer here'
          value={answer}
          style={styles.input}
          onChangeText={this.handleAnswer}
        />
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    color: '#000',
    fontSize: 25,
    textAlign: 'center'
  },
  submitBtn: {
    backgroundColor: '#FF9912',
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
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#757575',
    margin: 50,
  },
})
