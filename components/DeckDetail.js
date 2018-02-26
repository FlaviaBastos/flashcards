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

  componentDidUpdate() {
    getDeck(this.state.title)
      .then((deck) => {
        this.setState({deck})
      })
  }

  render() {
    const { deck, title } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.header}> Deck Name:</Text>
        <Text style={styles.text}>{title}</Text>
        {deck !== null && (
          <View>
            <Text style={styles.header}> Cards in this deck:</Text>
            <Text style={styles.text}>{deck["questions"].length}</Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.submitBtn, {backgroundColor: '#FF9912'}]}
          onPress={() =>
            this.props.navigation.navigate(
            'AddQuestion',
            { toDeck: title }
          )}>
            <Text style={styles.submitBtnText}>ADD CARD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submitBtn, {backgroundColor: '#c66a00'}]}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  submitBtn: {
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
  header: {
    color: '#000',
    fontSize: 12,
    textAlign: 'center'
  },
  text: {
    color: '#000',
    fontSize: 25,
    textAlign: 'center'
  }
})
