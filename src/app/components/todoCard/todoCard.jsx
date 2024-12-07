'use client';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { ViewModeTodoCard } from './viewMode'
import { EditModeTodoCard } from './editMode';

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
          todo={todo}
          setViewMode={setViewMode}
        />
      ) : (
        <EditModeTodoCard
          todo={todo}
          setViewMode={setViewMode}
          updateTodosWithANewTodo={updateTodosWithANewTodo}
          updateTodosWithARemovedTodo={updateTodosWithARemovedTodo}
        />
      )}
    </>
  );
};

TodoCard.propTypes = {
  todo: PropTypes.shape( {
    id: PropTypes.string.required,
    description: PropTypes.string.required,
    status: PropTypes.oneOf( ['pending', 'completed'] ).required,
    updatedAt: PropTypes.string.required,
  } ).required,
  updateTodosWithANewTodo: PropTypes.func.required,
  updateTodosWithARemovedTodo: PropTypes.func.required,
};