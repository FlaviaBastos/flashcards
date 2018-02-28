import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { saveDeckTitle, getDecks } from '../utils/api'

export default class AddDeck extends Component {
  constructor() {
    super();
    this.state = {
      input: ''
    };
  }

  handleTextChange = (input) => {
    this.setState({ input })
  }

  goToAddCard = () => {
    const { input } = this.state
    this.props.navigation.navigate(
    'AddQuestion', { toDeck: input })
  }

  submit = () => {
    const entry = this.state.input
    saveDeckTitle(entry)
    this.props.navigation.navigate(
      'DeckDetail', { deckTitle: entry })
  }

  render() {
    const { input } = this.state

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
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => this.submit()}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
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
