'use client';

import { getTodosForName, createNewTodo } from './dbService';
import { sortAndFilterTodos } from './service';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  TextInput, Paper, Text, Button, Group, Checkbox, Grid, Stack,
} from '@mantine/core';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export const CardFilter = ( props ) => {
  const { todos, setTodos, setFilteredTodos } = props;
  const [name, setName] = useState( '' );
  const [titleText, setTitleText] = useState( 'No user selected' );
  const [loading, setLoading] = useState( false );
  const [filters, setFilters] = useState( { pending: true, completed: true, all: true } );

  const fetchNewTodos = async () => {
    const newTodos = await getTodosForName( name );
    setTodos( newTodos );
    setLoading( false );
  };

  const createTodo = async () => {
    const newTodo = await createNewTodo( name );
    setTodos( [...todos, newTodo] );
  };

  useEffect( () => {
    setFilteredTodos( sortAndFilterTodos( todos, filters ) );
  }, [todos, filters] );

  return (
    <Paper
      p="md"
      shadow="sm"
      withBorder
    >
      <Text
        fw={900}
        gradient={{ from: 'green', to: 'cyan', deg: 90 }}
        pb="md"
        size="3rem"
        ta="center"
        variant="gradient"
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
                align="flex-end"
              >
                <TextInput
                  label="Name"
                  onChange={( event ) => setName( event.target.value )}
                  value={name}
                />
                <Button
                  disabled={name === ''}
                  fullWidth
                  leftSection={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                  loading={loading}
                  onClick={() => {
                    setLoading( true );
                    fetchNewTodos();
                    setTitleText( `Viewing todos for ${name}` );
                  }}
                >
                  {name !== '' ? `FIND TODOS FOR ${name}` : 'ENTER A NAME'}
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
              p="md"
              withBorder
            >
              <Text
                fw="bold"
                mb="sm"
              >
                Displaying
              </Text>
              <Checkbox
                checked={filters.pending}
                label="Pending"
                mb="xs"
                onChange={( event ) => setFilters( {
                  ...filters,
                  pending: event.target.checked,
                  all: filters.completed && event.target.checked,
                } )}
              />
              <Checkbox
                checked={filters.completed}
                label="Completed"
                mb="xs"
                onChange={( event ) => setFilters( {
                  ...filters,
                  completed: event.target.checked,
                  all: filters.pending && event.target.checked,
                } )}
              />
              <Checkbox
                checked={filters.all}
                label="All"
                mb="xs"
                onChange={( event ) => setFilters( {
                  completed: event.target.checked,
                  pending: event.target.checked,
                  all: event.target.checked,
                } )}
              />
            </Paper>
          </Grid.Col>
        )}
      </Grid>
    </Paper>
  );
};

CardFilter.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape( {
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.oneOf( ['pending', 'completed'] ).isRequired,
      updatedAt: PropTypes.string.isRequired,
    } ),
  ).isRequired,
  setTodos: PropTypes.func.isRequired,
  setFilteredTodos: PropTypes.func.isRequired,
};
