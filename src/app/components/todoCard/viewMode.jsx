'use client';

import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Paper, Text, Button, Group, Divider,
} from '@mantine/core';
import PropTypes from 'prop-types';

export const ViewModeTodoCard = ( props ) => {
  const { todo: { description, status }, setViewMode } = props;

  return (
    <Paper
      p="md"
      shadow="sm"
      withBorder
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
  );
};

ViewModeTodoCard.propTypes = {
  todo: PropTypes.shape( {
    description: PropTypes.string.isRequired,
    status: PropTypes.oneOf( ['pending', 'completed'] ).isRequired,
  } ).isRequired,
  setViewMode: PropTypes.func.isRequired,
};
