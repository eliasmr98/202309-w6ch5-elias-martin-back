const serverUrl = 'http://localhost:3500';

const handleSubmit = (event) => {
  event.preventDefault();
  const form = event.target;

  const userLogin = {
    email: form.elements.namedItem('email').value,
    passwd: form.elements.namedItem('passwd').value,
  };

  console.log(userLogin);

  const url = serverUrl + '/users/login';

  fetch(url, {
    method: 'POST',
  });
};

document.querySelector('form').addEventListener('submit', handleSubmit);
