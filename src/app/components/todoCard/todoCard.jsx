'use client';

import { EditModeTodoCard } from './editMode';
import { ViewModeTodoCard } from './viewMode';
import PropTypes from 'prop-types';
import { useState } from 'react';

/**
 * TodoCard component that handles both view and edit modes for a todo item
 * @param {Object} props - Component props
 * @param {Todo} props.todo - Todo item to display
 * @param {Function} props.updateTodosWithANewTodo - Callback to update todo
 * @param {Function} props.updateTodosWithARemovedTodo - Callback to remove todo
 */
export const TodoCard = ( { todo, updateTodosWithANewTodo, updateTodosWithARemovedTodo } ) => {
  const [viewMode, setViewMode] = useState( 'VIEW' );

  return (
    <>
      {viewMode === 'VIEW' ? (
        <ViewModeTodoCard
          setViewMode={setViewMode}
          todo={todo}
        />
      ) : (
        <EditModeTodoCard
          setViewMode={setViewMode}
          todo={todo}
          updateTodosWithANewTodo={updateTodosWithANewTodo}
          updateTodosWithARemovedTodo={updateTodosWithARemovedTodo}
        />
      )}
    </>
  );
};

TodoCard.propTypes = {
  todo: PropTypes.shape( {
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.oneOf( ['pending', 'completed'] ).isRequired,
    updatedAt: PropTypes.string.isRequired,
  } ).isRequired,
  updateTodosWithANewTodo: PropTypes.func.isRequired,
  updateTodosWithARemovedTodo: PropTypes.func.isRequired,
};
