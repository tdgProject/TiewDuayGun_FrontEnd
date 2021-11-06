export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
  
    if (user.data && user.data.token) {
      // for Node.js Express back-end
      console.log(user.data.token)
      console.log(user.data.type)
      console.log({ Authorization: user.data.type + ' ' + user.data.token })
      return { Authorization: user.data.type + ' ' + user.data.token };
    } else {
      return {};
    }
  }