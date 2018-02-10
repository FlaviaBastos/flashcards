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
      input: ''
    };
  }

  handleTextChange = (input) => {
    this.setState(() => ({
      input
    }))
  }

  submit = () => {
    console.log('on submit')
    const entry = this.state.input
    console.log('STATE:', entry)

    saveDeckTitle(entry) // saves to AsyncStorage
    // this.setState(() => ({ input: ''})) // clears local input (necessary?)

    getDecks() // just for testing; not showing all

  // this.toHome()

  }

  render() {
    const { input } = this.state
    return (
      <View>
        <Text style={{alignSelf: 'center'}}>What is the title of your new deck?</Text>
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
