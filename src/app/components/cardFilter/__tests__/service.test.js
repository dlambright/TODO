import { sortAndFilterTodos } from '../service';

describe( 'sortAndFilterTodos', () => {
  const mockTodos = [
    { id: 1, status: 'pending' },
    { id: 2, status: 'completed' },
    { id: 3, status: 'pending' },
    { id: 4, status: 'completed' },
    { id: 4, status: 'pending' },
  ];

  it( 'should filter todos based on status filters', () => {
    const filters = {
      pending: true,
      completed: false,
      all: false,
    };

    const result = sortAndFilterTodos( mockTodos, filters );

    expect( result ).toHaveLength( 3 );
    expect( result.every( (todo) => todo.status === 'pending' ) ).toBe( true );
  } );

  it( 'should sort todos by status in descending order', () => {
    const filters = {
      pending: true,
      completed: true,
      all: true,
    };

    const result = sortAndFilterTodos( mockTodos, filters );

    expect( result ).toHaveLength( 5 );
    expect( result[0].status ).toBe( 'pending' );
    expect( result[result.length - 1].status ).toBe( 'completed' );
  } );

  it( 'should return empty array when no filters are true', () => {
    const filters = {
      pending: false,
      completed: false,
      all: false,
    };

    const result = sortAndFilterTodos( mockTodos, filters );

    expect( result ).toHaveLength( 0 );
  } );

  it( 'should handle empty todos array', () => {
    const filters = {
      pending: true,
      completed: true,
      all: true,
    };

    const result = sortAndFilterTodos( [], filters );

    expect( result ).toHaveLength( 0 );
  } );
} );
