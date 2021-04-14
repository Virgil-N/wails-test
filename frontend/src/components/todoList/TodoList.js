/**
 * Created Date: 2020-11-27 01:56:45
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2020-11-30 03:34:29
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2020 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

const TodoList = ({ todos, actions }) => (
  <ul className="todo-list">
    {todos.map(todo =>
      <TodoItem key={todo.id} todo={todo} {...actions} />
    )}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    id: PropTypes.number.isRequired
  }))
}

export default TodoList