const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates the sign-up form state and returns an { field: message } map.
 * An empty object means the form is valid.
 * NOTE: this is client-side only — real uniqueness / server checks
 * (e.g. "email already registered") will need to happen once a backend exists.
 */
export function validateSignUpForm(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.educationLevel) {
    errors.educationLevel = 'Please select your education level.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (values.interests.length === 0) {
    errors.interests = 'Pick at least one competition interest.';
  }

  return errors;
}
