import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

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
    this.state = {};
  }
  //
  // addDeckName = (name) => {
  //   this.setState((state) => {
  //     state[name]
  //
  //     return {
  //       ...state,
  //       [name]: {
  //         'title': name
  //       }
  //     }
  //   })
  // }

  submit = () => {
    console.log('on submit')
    const entry = this.state
    console.log('STATE:', entry)
  //
  // this.setState(() => ({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 }))
  //
  // this.toHome()
  //
  // submitEntry({ key, entry }) // calls api AsyncStorage
  //
  // clearLocalNotification()
  //   .then(setLocalNotification)
  }

  render() {
    return (
      <View>
        <Text>What is the title of your new deck?</Text>
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
})
