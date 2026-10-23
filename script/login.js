const loginForm = document.querySelector('.login-form');
const idInput = document.querySelector('#user-id');
const passwordInput = document.querySelector('#user-password');
const passwordToggle = document.querySelector('.password-toggle');
const formMessage = document.querySelector('.form-message');

function setError(input, message) {
  const field = input.closest('.field');
  const error = field.querySelector('.field-error');
  field.classList.toggle('has-error', Boolean(message));
  input.setAttribute('aria-invalid', String(Boolean(message)));
  error.textContent = message;
}

passwordToggle?.addEventListener('click', () => {
  const showing = passwordInput.type === 'text';
  passwordInput.type = showing ? 'password' : 'text';
  passwordToggle.textContent = showing ? '보기' : '숨김';
  passwordToggle.setAttribute('aria-label', showing ? '비밀번호 보기' : '비밀번호 숨기기');
  passwordToggle.setAttribute('aria-pressed', String(!showing));
});

[idInput, passwordInput].forEach((input) => {
  input?.addEventListener('input', () => {
    setError(input, '');
    formMessage.classList.remove('show');
  });
});

loginForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const id = idInput.value.trim();
  const password = passwordInput.value;
  let valid = true;

  setError(idInput, '');
  setError(passwordInput, '');

  if (!id) {
    setError(idInput, '아이디를 입력해 주세요.');
    valid = false;
  }

  if (!password) {
    setError(passwordInput, '비밀번호를 입력해 주세요.');
    valid = false;
  } else if (password.length < 8) {
    setError(passwordInput, '비밀번호는 8자 이상 입력해 주세요.');
    valid = false;
  }

  if (!valid) {
    loginForm.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }

  formMessage.textContent = '로그인 정보 확인 또는 추가 인증 단계는 서버 연결 후 진행됩니다.';
  formMessage.classList.add('show');
});
