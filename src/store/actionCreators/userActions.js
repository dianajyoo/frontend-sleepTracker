export const fetchIsLoading = (bool) => {
  return {
    type: 'FETCH_IS_LOADING',
    isLoading: bool
  }
}

export const fetchUserSuccess = (user) => {
  return {
    type: 'FETCH_USER_SUCCESS',
    user
  }
}

export const storeToken = (access_token) => {
  return {
    type: 'STORE_TOKEN',
    token: access_token
  }
}

export const storeSleepData = (data) => {
  return {
    type: 'STORE_SLEEP',
    data
  }
}

// ADD GOAL

export const setGoals = (goals) => {
  return {
    type: 'SET_GOALS',
    goals: goals
  }
}

export const setGoalDate = (date) => {
  return {
    type: 'SET_GOAL_DATE',
    goalDate: date
  }
}

export const setBedtime = (time) => {
  return {
    type: 'SET_BEDTIME',
    bedtimeTarget: time
  }
}

export const setWakeupTime = (time) => {
  return {
    type: 'SET_WAKEUP_TIME',
    wakeupTarget: time
  }
}

export const setFitbitUser = (user) => {
  return {
    type: 'SET_FITBIT_USER',
    user: user
  }
}

// EDIT

export const editGoals = (goals) => {
  return {
    type: 'EDIT_GOALS',
    goals: goals
  }
}

export const editGoalDate = (date) => {
  return {
    type: 'EDIT_GOAL_DATE',
    goalDate: date
  }
}

export const editBedtime = (time) => {
  return {
    type: 'EDIT_BEDTIME',
    bedtimeTarget: time
  }
}

export const editWakeupTime = (time) => {
  return {
    type: 'EDIT_WAKEUP_TIME',
    wakeupTarget: time
  }
}

// DELETE

export const deleteGoals = (goals) => {
  return {
    type: 'DELETE_GOALS',
    goals: goals
  }
}

export const deleteGoalDate = (date) => {
  return {
    type: 'DELETE_GOAL_DATE',
    goalDate: date
  }
}

export const deleteBedtime = (time) => {
  return {
    type: 'DELETE_BEDTIME',
    bedtimeTarget: time
  }
}

export const deleteWakeupTime = (time) => {
  return {
    type: 'DELETE_WAKEUP_TIME',
    wakeupTarget: time
  }
}

// HEART RATE

export const getHeartRate = (heartRate) => {
  return {
    type: 'GET_HEART_RATE',
    heartRate: heartRate
  }
}

// <--- redux thunk here --->

// FETCH GET
export const fetchUserData = (url, token) => {
    return (dispatch) => {
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
        .then(res => res.json())
        .then(user => dispatch(fetchUserSuccess(user)))
        .then( data => {
          fetchSleepData(`https://api.fitbit.com/1.2/user/-/sleep/date/2018-12-18.json`, token)(dispatch)
        })
        .catch(console.error)
    }
}

export const fetchSleepData = (url, token) => {
    return (dispatch) => {
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
        .then(res => res.json())
        .then(data => {
          dispatch(storeSleepData(data))})
        .catch(console.error)
    }
}

export const fetchHeartRate = (token) => {
    return (dispatch) => {
      fetch(`https://api.fitbit.com/1/user/-/activities/heart/date/2018-12-18/1d.json`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
        .then(res => res.json())
        .then(data => {
          dispatch(getHeartRate(data))})
        .catch(console.error)
    }
}

export const fetchBackendUserData = (token, fitBitUser) => {
    return (dispatch) => {
      fetch('http://localhost:3000/api/v1/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
        .then(res => res.json())
        .then(data => {
          data.forEach(user => {
            if (fitBitUser.encodedId === user.encodedId) {
              dispatch(setFitbitUser(user))
            }
          })
        })
        .catch(console.error)
    }
}

export const fetchGoalData = (token) => {
    return (dispatch) => {
      fetch('http://localhost:3000/api/v1/goals', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
        .then(res => res.json())
        .then(data => {
          dispatch(setGoals(data))
        })
        .catch(console.error)
    }
}

// FETCH POST
export const fetchSleepGoals = (goalDate, bedtimeTarget, wakeupTarget, fitBitUser, token) => {
    return (dispatch) => {
      fetch('http://localhost:3000/api/v1/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          goalDate: goalDate,
          bedtimeTarget: bedtimeTarget,
          wakeupTarget: wakeupTarget,
          user_id: fitBitUser.id
        })
      })
        .then(res => res.json())
        .then(data => {
          dispatch(setGoalDate(data.goalDate))
          dispatch(setBedtime(data.bedtimeTarget))
          dispatch(setWakeupTime(data.wakeupTarget))
        })
        .catch(console.error)
    }
}

// FETCH PATCH
export const fetchEditedGoals = (goalId, goalDate, bedtimeTarget, wakeupTarget, token) => {
    return (dispatch) => {
      fetch(`http://localhost:3000/api/v1/goals/${goalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          goalDate: goalDate,
          bedtimeTarget: bedtimeTarget,
          wakeupTarget: wakeupTarget
        })
      })
        .then(res => res.json())
        .then(data => {
          dispatch(editGoalDate(data.goalDate))
          dispatch(editBedtime(data.bedtimeTarget))
          dispatch(editWakeupTime(data.wakeupTarget))
        })
        .catch(console.error)
    }
}

// FETCH DELETE
export const fetchDeleteGoals = (goalId, token) => {
    return (dispatch) => {
      fetch(`http://localhost:3000/api/v1/goals/${goalId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          id: goalId
        })
      })
        .then(res => res.json())
        .then(data => {
          dispatch(deleteGoals(data.id))
        })
        .catch(console.error)
    }
}