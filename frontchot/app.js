const serverUrl = 'http://localhost:3500';

const handleSubmit = async (event) => {
  event.preventDefault();
  const form = event.target;

  const userLogin = {
    email: form.elements.namedItem('email').value,
    passwd: form.elements.namedItem('passwd').value,
  };

  const url = serverUrl + '/users/login';

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(userLogin),
    headers: {
      'Content-type': 'application/json',
    },
  });

  const result = await response.json();
  console.log(result);
};

document.querySelector('form').addEventListener('submit', handleSubmit);
