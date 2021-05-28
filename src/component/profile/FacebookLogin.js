import React, { useEffect } from 'react'

function FacebookLogin() {
  return (
    <div
      class="fb-login-button"
      data-width=""
      data-size="large"
      data-button-type="continue_with"
      data-layout="default"
      data-auto-logout-link="false"
      data-use-continue-as="false"
    ></div>
  )
}

export default FacebookLogin
