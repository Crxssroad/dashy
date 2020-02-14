import React, { Fragment } from 'react'

const ModalForm = (props) => {

  let id, title, footer
  if (props.type === "signup") {
    id = "signupModal"
    title = "Sign Up"
    footer = <Fragment>
      <span>Already a member? </span>
      <a
        href="#loginModal"
        data-toggle="modal"
        onClick={() => {$('#signupModal').modal('hide')}}
      >
        Log In
      </a>
    </Fragment>
  }
  if (props.type === "login") {
    id = "loginModal"
    title = "Log In"
    footer = <Fragment>
      <span>New User? </span>
      <a
        href="#signupModal"
        data-toggle="modal"
        onClick={() => {$('#loginModal').modal('hide')}}
      >
        Sign Up
      </a>
    </Fragment>
  }

  if (props.type === "widget") {
    id = "widgetModal"
    title = "Add a New Widget"
  }

  return (
    <Fragment>
      <div id={id} className="modal fade">
      	<div className="modal-dialog modal-login">
      		<div className="modal-content">
      			<div className="modal-header">
      				<h4 className="modal-title">{title}</h4>
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
      			</div>
      			<div className="modal-body">
      				{props.children}
      			</div>
      			<div className="modal-footer">
      				{footer}
      			</div>
      		</div>
      	</div>
      </div>
    </Fragment>
  )
}

export default ModalForm;
