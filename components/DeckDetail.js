import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { getDeck } from '../utils/api'

export default class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params

    return {
      title: deckTitle
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.navigation.state.params.deckTitle,
      deck: null
    };
  }

  componentDidMount() {
    getDeck(this.state.title)
      .then((deck) => {
        this.setState({deck})
      })
  }

  render() {
    const { deck, title } = this.state

    return (
      <View>
        <Text> Deck Name:  {title}</Text>
        {deck !== null && (
          <Text> Questions in this deck: {deck["questions"].length}</Text>
        )}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() =>
            this.props.navigation.navigate(
            'AddQuestion',
            { toDeck: title }
          )}>
            <Text style={styles.submitBtnText}>ADD CARD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() =>
            this.props.navigation.navigate(
            'Quiz',
            { deckTitle: title }
          )}>
            <Text style={styles.submitBtnText}>START QUIZ</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

// make two buttons slightly different
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  submitBtn: {
    backgroundColor: '#FF9912',
    margin: 10,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    width: 190,
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
