'use client';

import { useState, useEffect } from 'react';
import { TextInput, Paper, Text, Button, Group, Checkbox, Grid, Stack } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { getTodosForName, createNewTodo } from './dbService'
import { sortAndFilterTodos } from './service'
import PropTypes from 'prop-types';

export const CardFilter = ( props ) => {
  const { todos, setTodos, setFilteredTodos, } = props;
  const [name, setName] = useState( 'duzn' );
  const [titleText, setTitleText] = useState( 'No user selected' );
  const [loading, setLoading] = useState( false );
  const [filters, setFilters] = useState( { pending: true, completed: true, all: true } );

  const fetchNewTodos = async () => {
    const newTodos = await getTodosForName( name );
    setTodos( newTodos );
    setLoading( false )
  }

  const createTodo = async () => {
    const newTodo = await createNewTodo( name );
    setTodos( [...todos, newTodo] )
  }

  useEffect( () => {
    setFilteredTodos( sortAndFilterTodos( todos, filters ) );
  }, [todos, filters] );

  return (
    <Paper
      withBorder
      p="md"
      shadow="sm"
    >
      <Text
        fw={900}
        size="3rem"
        gradient={{ from: 'green', to: 'cyan', deg: 90 }}
        variant="gradient"
        pb="md"
        ta="center"
      >
        {titleText}
      </Text>
      <Grid>
        <Grid.Col
          span={{ base: 12, md: 6 }}
        >
          <Paper
            p="md"
            withBorder
          >
            <Stack>
              <Group
                align='flex-end'
              >
                <TextInput
                  label="Name"
                  value={name}
                  onChange={( event ) => setName( event.target.value )}
                />
                <Button
                  leftSection={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                  loading={loading}
                  onClick={() => {
                    setLoading( true );
                    fetchNewTodos();
                    setTitleText( `Viewing todos for ${name}` );
                  }}
                  fullWidth
                >
                  {`FIND TODOS FOR ${name}`}
                </Button>

              </Group>
              {titleText !== 'No user selected' && (
                <Button
                  leftSection={<FontAwesomeIcon icon={faPlus} />}
                  onClick={() => {
                    createTodo();
                  }}
                >
                  ADD TODO
                </Button>
              )}
            </Stack>
          </Paper>
        </Grid.Col>
        {titleText !== 'No user selected' && (
          <Grid.Col
            span={{ base: 12, md: 6 }}
          >
            <Paper
              withBorder
              p="md"
            >
              <Text
                fw="bold"
                mb="sm"
              >
                Displaying
              </Text>
              <Checkbox
                checked={filters.pending}
                onChange={( event ) => setFilters( { ...filters, pending: event.target.checked, all: filters.completed && event.target.checked } )}
                label="Pending"
                mb="xs"
              />
              <Checkbox
                checked={filters.completed}
                onChange={( event ) => setFilters( { ...filters, completed: event.target.checked, all: filters.pending && event.target.checked } )}
                label="Completed"
                mb="xs"
              />
              <Checkbox
                checked={filters.all}
                onChange={( event ) => setFilters( {
                  completed: event.target.checked,
                  pending: event.target.checked,
                  all: event.target.checked
                } )}
                label="All"
                mb="xs"
              />
            </Paper>
          </Grid.Col>
        )}
      </Grid>
    </Paper>
  )
}

CardFilter.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape( {
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.oneOf( ['pending', 'completed'] ).isRequired,
      updatedAt: PropTypes.string.isRequired,
    } )
  ).isRequired,
  setTodos: PropTypes.func.isRequired,
  setFilteredTodos: PropTypes.func.isRequired,
};