import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function Card ({ count, value, onFlip }) {
  return (
    <View>
      <Text style={styles.cardCount}>{count}</Text>
      <Text style={styles.cardText}>{value}</Text>
      <TouchableOpacity
        style={styles.btnFlip}
        onPress={onFlip}>
        <Text style={styles.flipCardText}>Flip card</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnFlip: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'center'
  },
  flipCardText: {
    color: '#FF9912',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  cardText: {
    color: '#000',
    fontSize: 30,
    textAlign: 'center'
  },
  cardCount: {
    color: '#B0171F'
  }
})
