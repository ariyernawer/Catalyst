import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import TagSelector from '../../ui/TagSelector';
import Button from '../../ui/Button';
import { EDUCATION_LEVELS, COMPETITION_INTERESTS } from '../../../constants/formOptions';
import { validateSignUpForm } from '../../../utils/validation';

const INITIAL_VALUES = {
  fullName: '',
  phoneNumber: '',
  email: '',
  educationLevel: '',
  password: '',
  confirmPassword: '',
  interests: [],
};

export default function SignUpForm() {
  const navigate = useNavigate();

  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});

  const setField = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const setInterests = (interests) => {
    setValues((prev) => ({ ...prev, interests }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateSignUpForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // No backend yet — this is the single spot to wire up an API call later,
      // e.g. await api.createParticipant(values)
      console.log('Form is valid, ready to submit:', values);
      navigate('/discover');
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="fullName"
          label="Full Name"
          required
          placeholder="Rafsan Ahmed"
          value={values.fullName}
          onChange={setField('fullName')}
          error={errors.fullName}
        />
        <Input
          id="phoneNumber"
          label="Phone Number"
          type="tel"
          placeholder="+880 1700 000000"
          value={values.phoneNumber}
          onChange={setField('phoneNumber')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="email"
          label="Email Address"
          required
          type="email"
          placeholder="rafsan@example.com"
          value={values.email}
          onChange={setField('email')}
          error={errors.email}
        />
        <Select
          id="educationLevel"
          label="Education Level"
          required
          options={EDUCATION_LEVELS}
          value={values.educationLevel}
          onChange={setField('educationLevel')}
          error={errors.educationLevel}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="password"
          label="Password"
          required
          type="password"
          placeholder="Min. 8 characters"
          value={values.password}
          onChange={setField('password')}
          error={errors.password}
        />
        <Input
          id="confirmPassword"
          label="Confirm Password"
          required
          type="password"
          placeholder="Repeat password"
          value={values.confirmPassword}
          onChange={setField('confirmPassword')}
          error={errors.confirmPassword}
        />
      </div>

      <TagSelector
        label="Competition Interests"
        required
        options={COMPETITION_INTERESTS}
        selected={values.interests}
        onChange={setInterests}
      />
      {errors.interests && <span className="text-xs text-danger">{errors.interests}</span>}

      <p className="text-[0.8rem] text-text-muted m-0">
        By registering you agree to our{' '}
        <a href="/terms" className="text-text-secondary underline hover:text-sand">
          Terms
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-text-secondary underline hover:text-sand">
          Privacy Policy
        </a>
        .
      </p>

      <Button type="submit" variant="primary">
        Create Account &amp; Explore →
      </Button>

      <Button type="button" variant="link">
        Already have an account? Sign in →
      </Button>
    </form>
  );
}
