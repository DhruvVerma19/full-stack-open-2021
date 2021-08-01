const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'Visible_Notify': {
        return action.data.notification
      }
      default:
        return state
    }
  }
  
  export const VisibleNotify = (notification) => {
    return {
      type: 'Visible_Notify',
      data: {
        notification,
      },
    }
  }
  
  export default notificationReducer