import { updateTodoInDb, deleteTodoInDb } from './service';
import { faCancel } from '@fortawesome/free-solid-svg-icons/faCancel';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons/faDeleteLeft';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Paper, Button, Textarea, Checkbox,
} from '@mantine/core';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const EditModeTodoCard = ( props ) => {
  const {
    todo, setViewMode, updateTodosWithANewTodo, updateTodosWithARemovedTodo,
  } = props;
  const [updatedTodo, setUpdatedTodo] = useState( todo );

  const updateTodo = async () => {
    const result = await updateTodoInDb( updatedTodo );
    updateTodosWithANewTodo( result );
  };

  const deleteTodo = async () => {
    const result = await deleteTodoInDb( updatedTodo );
    updateTodosWithARemovedTodo( result );
  };

  return (
    <Paper
      p="md"
      shadow="sm"
      withBorder
    >
      <Textarea
        label="Description"
        mb="md"
        onChange={( event ) => setUpdatedTodo( {
          ...updatedTodo,
          description: event.target.value,
        } )}
        value={updatedTodo.description}
      />
      <Checkbox
        checked={updatedTodo.status === 'completed'}
        label="Completed"
        mb="md"
        onChange={( e ) => {
          setUpdatedTodo( { ...updatedTodo, status: e.target.checked ? 'completed' : 'pending' } );
        }}
      />
      <Button
        color="orange"
        fullWidth
        leftSection={<FontAwesomeIcon icon={faCancel} />}
        mb="sm"
        onClick={() => setViewMode( 'VIEW' )}
      >
        CANCEL
      </Button>
      <Button
        color="red"
        fullWidth
        leftSection={<FontAwesomeIcon icon={faDeleteLeft} />}
        mb="sm"
        onClick={() => {
          deleteTodo();
          setViewMode( 'VIEW' );
        }}
      >
        DELETE
      </Button>
      <Button
        color="green"
        fullWidth
        leftSection={<FontAwesomeIcon icon={faSave} />}
        onClick={() => {
          updateTodo();
          setViewMode( 'VIEW' );
        }}
      >
        SAVE
      </Button>
    </Paper>
  );
};

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
