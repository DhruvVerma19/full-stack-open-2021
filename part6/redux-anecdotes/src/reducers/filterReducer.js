const filterReducer = (state = '', action) => {
    switch (action.type) {
      case 'Filter': {
        return action.data.filter
      }
      default:
        return state
    }
  }
  
  export const setFilter = (filter) => {
    return {
      type: 'Filter',
      data: {
        filter,
      },
    }
  }
  
  export default filterReducer