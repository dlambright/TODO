export const sortAndFilterTodos = ( todos, filters ) => {
  return todos.filter( ( todo ) => filters[todo.status.toLowerCase()] )
    .sort( ( a, b ) => {
      if ( a.status < b.status ) {
        return 1;
      }
      return -1;
    } );
} 