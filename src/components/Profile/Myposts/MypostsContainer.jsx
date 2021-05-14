import React from 'react';
import { connect } from 'react-redux';
import { updateNewTextPostActionCreator, addPostActionCreator } from '../../Redux/profile-reducer'
import Myposts from './Myposts';


let mapStateToProps = (state) => {
  return ({
    newPostText: state.ProfilePage.newPostText,
    Data: state.ProfilePage.Data,
  })
}

let mapDispatchToProps = (dispatch) => {
  return (
    {
      onPostChange: (text) => {
        dispatch(updateNewTextPostActionCreator(text))
      },
      addPost: (Post) => {
        dispatch(addPostActionCreator(Post))
      }
    }
  )
}

const MypostsContainer = connect(mapStateToProps, mapDispatchToProps)(Myposts)

export default MypostsContainer;