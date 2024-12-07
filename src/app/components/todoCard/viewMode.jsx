'use client';

import { Paper, Text, Button, Group, Divider } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export const ViewModeTodoCard = ( props ) => {
  const { todo: { description, status }, setViewMode } = props;

  return (
    <Paper
      withBorder
      p="md"
      shadow="sm"
    >
      <Text
        size="xl"
      >
        {description}
      </Text>
      <Divider my="sm" />
      <Group
        justify="space-between"
        mb="md"
      >
        <Text fw="bold">
          STATUS
        </Text>
        <Text>
          {status.toUpperCase()}
        </Text>
      </Group>

      <Button
        fullWidth
        leftSection={<FontAwesomeIcon icon={faEdit} />}
        onClick={() => setViewMode( 'EDIT' )}
      >
        EDIT
      </Button>
    </Paper>
  )
}

ViewModeTodoCard.propTypes = {
  todo: PropTypes.shape( {
    description: PropTypes.string.isRequired,
    status: PropTypes.oneOf( ['pending', 'completed'] ).isRequired,
  } ).isRequired,
  setViewMode: PropTypes.func.isRequired,
};