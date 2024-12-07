import { useState } from 'react';
import { Paper, Button, Textarea, Checkbox } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faCancel } from '@fortawesome/free-solid-svg-icons/faCancel';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons/faDeleteLeft';
import { updateTodoInDb, deleteTodoInDb } from './service';
import PropTypes from 'prop-types';

export const EditModeTodoCard = ( props ) => {
  const { todo, setViewMode, updateTodosWithANewTodo, updateTodosWithARemovedTodo } = props;
  const [updatedTodo, setUpdatedTodo] = useState( todo );

  const updateTodo = async () => {
    const result = await updateTodoInDb( updatedTodo );
    updateTodosWithANewTodo( result );
  }

  const deleteTodo = async () => {
    const result = await deleteTodoInDb( updatedTodo );
    updateTodosWithARemovedTodo( result );
  }

  return (
    <Paper
      withBorder
      p="md"
      shadow="sm"
    >
      <Textarea
        label="Description"
        value={updatedTodo.description}
        onChange={( event ) => setUpdatedTodo( { ...updatedTodo, description: event.target.value } )}
        mb="md"
      />
      <Checkbox
        checked={updatedTodo.status === 'completed'}
        label="Completed"
        mb="md"
        onChange={( e ) => {
          setUpdatedTodo( { ...updatedTodo, status: e.target.checked ? 'completed' : 'pending' } )
        }}
      />
      <Button
        fullWidth
        leftSection={<FontAwesomeIcon icon={faCancel} />}
        color="orange"
        onClick={() => setViewMode( 'VIEW' )}
        mb="sm"
      >
        CANCEL
      </Button>
      <Button
        fullWidth
        leftSection={<FontAwesomeIcon icon={faDeleteLeft} />}
        color="red"
        onClick={() => {
          deleteTodo();
          setViewMode( 'VIEW' )
        }}
        mb="sm"
      >
        DELETE
      </Button>
      <Button
        color="green"
        fullWidth
        leftSection={<FontAwesomeIcon icon={faEdit} />}
        onClick={() => {
          updateTodo();
          setViewMode( 'VIEW' );
        }}
      >
        SAVE
      </Button>
    </Paper>
  )
}

EditModeTodoCard.propTypes = {
  todo: PropTypes.shape( {
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.oneOf( ['pending', 'completed'] ).isRequired,
    updatedAt: PropTypes.string.isRequired,
  } ).isRequired,
  setViewMode: PropTypes.func.isRequired,
  updateTodosWithANewTodo: PropTypes.func.isRequired,
  updateTodosWithARemovedTodo: PropTypes.func.isRequired,
};