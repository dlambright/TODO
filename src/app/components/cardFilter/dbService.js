import { createTodo } from './graphql/customMutations';
import { listTodos } from './graphql/customQueries';
import { generateClient } from 'aws-amplify/api';

export const getTodosForName = async ( name ) => {
  const client = generateClient();
  const result = await client.graphql( {
    query: listTodos,
    variables: {
      filter: {
        name: {
          eq: name,
        },
      },
    },
  } );
  return result.data.listTodos.items;
};

export const createNewTodo = async ( name ) => {
  const client = generateClient();
  const result = await client.graphql( {
    query: createTodo,
    variables: {
      input: {
        name,
        description: 'ADD DESCRIPTION',
        status: 'pending',
      },
    },
  } );
  return result.data.createTodo;
};
