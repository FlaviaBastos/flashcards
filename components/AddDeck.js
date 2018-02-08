import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class AddDeck extends Component {
  state = {}

  addDeckName = (name) => {
    this.setState((state) => {
      state[name]

      return {
        ...state,
        [name]: {}
      }
    })
  }

  render() {
    return (
      <View>
        <Text>What is the title of your new deck?</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
