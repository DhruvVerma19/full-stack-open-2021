const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'Visible_Notify': {
        return action.data.notification
      }
      default:
        return state
    }
  }
  
  export const VisibleNotify = (notification, time) => {
    return async (dispatch) => {
      dispatch({
      type: 'Visible_Notify',
      data: {
        notification,
      },
    })
    setTimeout(() => 
      dispatch({
        type: 'Visible_Notify',
        data: {
          notification: null,
        },
    }), time * 1000
    )
  
}
  }
  
  export default notificationReducer