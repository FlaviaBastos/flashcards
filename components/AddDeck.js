import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { saveDeckTitle, getDecks } from '../utils/api'

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
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      status: false
    };
  }

  handleTextChange = (input) => {
    this.setState(() => ({
      input
    }))
  }

  submit = () => {
    const entry = this.state.input

    saveDeckTitle(entry)
      .then(() => this.setState(() => ({status: true})))
  }

  render() {
    const { input, status } = this.state

    if (status) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>New deck added!</Text>
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() =>
              this.props.navigation.navigate(
              'AddQuestion',
              { toDeck: input }
            )}>
              <Text style={styles.submitBtnText}>ADD CARD</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() => this.setState(() => ({status: false}))}>
              <Text style={styles.submitBtnText}>ADD ANOTHER DECK</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          What is the title of your new deck?
        </Text>
        <TextInput
          value={input}
          style={styles.input}
          onChangeText={this.handleTextChange}
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
  submitBtn: {
    backgroundColor: '#FF9912',
    padding: 10,
    marginTop: 10,
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
  text: {
    color: '#000',
    fontSize: 25,
    textAlign: 'center'
  }
})
