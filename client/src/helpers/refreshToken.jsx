import domain from './ApiDomain'

function refreshToken(callback) {
    const _refreshToken = localStorage.getItem('refreshToken');
    fetch(domain+'/auth/refreshtoken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${_refreshToken}`
      },
      body: JSON.stringify({ username: localStorage.getItem('username') })
    })
      .then((resp) => {
        
        return resp.json()
      })
      .then((result) => {
        
        
        localStorage.setItem('token', result.token);

        callback(); 
      })
      .catch((err) => console.warn(err))
  }


  export default refreshToken;