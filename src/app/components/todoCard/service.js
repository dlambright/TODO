import { updateTodo, deleteTodo } from './customMutations';
import { generateClient } from 'aws-amplify/api';

/**
 * Updates a todo item in the database
 * @param {Todo} todo - The todo item to update
 * @returns {Promise<Todo>} Updated todo item
 * @throws {Error} If the update fails
 */
export const updateTodoInDb = async ( todo ) => {
  try {
    const {
      updatedAt, createdAt, __typename, ...sanitizedTodo
    } = todo;
    const client = generateClient();
    const result = await client.graphql( {
      query: updateTodo,
      variables: {
        input: sanitizedTodo,
      },
    } );
    return result.data.updateTodo;
  } catch ( error ) {
    console.error( 'Failed to update todo:', error );
    throw new Error( 'Failed to update todo' );
  }
};

/**
 * Deletes a todo item from the database
 * @param {Todo} todo - The todo item to delete
 * @returns {Promise<Todo>} Deleted todo item
 * @throws {Error} If the deletion fails
 */
export const deleteTodoInDb = async ( todo ) => {
  try {
    const client = generateClient();
    const result = await client.graphql( {
      query: deleteTodo,
      variables: {
        input: {
          id: todo.id,
        },
      },
    } );
    return result.data.deleteTodo;
  } catch ( error ) {
    console.error( 'Failed to delete todo:', error );
    throw new Error( 'Failed to delete todo' );
  }
};
