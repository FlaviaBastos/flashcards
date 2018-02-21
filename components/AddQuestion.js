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
      answer: ''
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
    console.log('on submit')
    const { question, answer, title } = this.state
    console.log('STATE:', title, question, answer)

    let card = {
      'question': question,
      'answer': answer
    }

    console.log('STATE with card:', title, card)
    addCardToDeck({ title, card }) // saves to AsyncStorage
    // this.setState(() => ({ input: ''})) // clears local input (necessary?)

    // getDecks() // just for testing; not showing all

  // this.toHome()

  }

  render() {
    const { question, answer } = this.state
    return (
      <View>
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
