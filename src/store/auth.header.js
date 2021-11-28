export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.data && user.data.token) {
    return { Authorization: user.data.type + ' ' + user.data.token };
  } else {
    return {};
  }
}