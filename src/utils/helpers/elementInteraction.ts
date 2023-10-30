export function displayErrorBlock(inputName: string, msg: string) {
  const input = document.querySelector(`input[name=${inputName}]`)
  const errorElement = input.parentElement.nextElementSibling;

  errorElement.classList.remove('form__error_hidden');
  errorElement.textContent = msg;
  input.classList.add('form__input_error')
}

export function hideErrorBlock() {
  const input = document.querySelectorAll('input');
  input.forEach((elem) => {
    const errorElement = elem.parentElement.nextElementSibling;
    errorElement.classList.add('form__error_hidden');
    errorElement.textContent = '';
    elem.classList.remove('form__input_error')
  })
}