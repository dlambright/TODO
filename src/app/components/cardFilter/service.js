// eslint-disable-next-line max-len
export const sortAndFilterTodos = ( todos, filters ) => todos.filter( ( todo ) => filters[todo.status.toLowerCase()])
  .sort( ( a, b ) => {
    if ( a.status < b.status ) {
      return 1;
    }
    return -1;
  } );
