function refreshToken(callback) {
    const _refreshToken = localStorage.getItem('refreshToken');
    fetch('https://sore-gray-oyster-coat.cyclic.app/auth/refreshtoken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${_refreshToken}`
      },
      body: JSON.stringify({ username: localStorage.getItem('username') })
    })
      .then((resp) => {
        console.log({ resp })
        return resp.json()
      })
      .then((result) => {
        console.log({ result })
        console.log('new token generated successfully')
        localStorage.setItem('token', result.token);

        callback(); 
      })
      .catch((err) => console.log(err))
  }


  export default refreshToken;