import React from 'react'

const LoginForm = ({
  fn_submit,
  fn_usr_change,
  fn_pass_change,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={fn_submit}>
        <div>
          username
          <input value={username} onChange={fn_usr_change} />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={fn_pass_change}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
