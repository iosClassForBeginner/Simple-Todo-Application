import React, {Component} from 'react'
import {View} from 'react-native'
import {StackNavigator} from 'react-navigation'
import LoginPage from './LoginPage'
import TodoMain from './TodoMain'

const routes = StackNavigator({
    LoginPage: {
      screen: LoginPage,
    },
    TodoMain: {
      screen: TodoMain,
    },
  });

export default routes