import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

export const CustomInput = ({
  value = '',
  setValue,
  placeholder,
  secureTextEntry,
  required,
  type = 'normal',
}) => {
  const valor =
    type === 'email'
      ? /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      : '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  const typeReg = new RegExp(valor)
  const [valid, setValid] = useState(false)

  useEffect(() => {
    if (type === 'email' || type === 'password') {
      if (typeReg.test(value)) {
        setValid(true)
      } else {
        setValid(false)
      }
    } else {
      if (value === '') {
        setValid(false)
      } else {
        setValid(true)
      }
    }
  }, [value])
  return (
    <View style={styles.container}>
      {required && !valid ? (
        <Text style={styles.required}>
          {type === 'email'
            ? 'Email dont fill requisites'
            : type === 'password'
            ? 'Password dont fill the requisites'
            : 'Required'}
        </Text>
      ) : (
        <></>
      )}
      <View
        style={[styles.root, required && !valid ? styles.input_required : ``]}
      >
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          styles={{ color: 'white' }}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  root: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginBottom: 10,
  },
  required: {
    color: 'red',
    alignSelf: 'flex-start',
    paddingLeft: 4,
    marginBottom: 2,
  },
  input_required: {
    borderWidth: 1,
    borderColor: 'red',
  },
})

export default CustomInput
