'use client';
import { useState } from 'react';
import { Transition } from '@mantine/core';

import { Grid, Container, Divider } from '@mantine/core';
import { TodoCard } from "./components/todoCard/todoCard";
import { CardFilter } from './components/cardFilter/cardFilter';

const Page = () => {
  const [todos, setTodos] = useState( [] );
  const [filteredTodos, setFilteredTodos] = useState( [] );

  const updateTodosWithANewTodo = ( newTodo ) => {
    const newTodos = todos.map( ( todo ) => todo.id === newTodo.id ? newTodo : todo );
    setTodos( newTodos );
  }

  const updateTodosWithARemovedTodo = ( todoToRemove ) => {
    setTodos( todos.filter( ( todo ) => todo.id !== todoToRemove.id ) );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ececec' }}>
      <Container
        pt="xl"
        pb="xl"
      >
        <CardFilter
          todos={todos}
          setTodos={setTodos}
          setFilteredTodos={setFilteredTodos}
        />
        <Divider my="sm" />
        <Grid mt="lg">
          {filteredTodos.map( ( todo ) => (
            <Grid.Col key={todo.updatedAt} span={{ base: 12, md: 4 }}>
              <TodoCard
                todo={todo}
                updateTodosWithANewTodo={updateTodosWithANewTodo}
                updateTodosWithARemovedTodo={updateTodosWithARemovedTodo}
              />
            </Grid.Col>
          ) )}
        </Grid>
      </Container>
    </div >
  )
}

export default Page;