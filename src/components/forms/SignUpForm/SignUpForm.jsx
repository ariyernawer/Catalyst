import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

export default function SignUpForm() {
  const navigate = useNavigate();
  return (
    <form className="flex flex-col gap-6">
      {/* Full name + phone number */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="fullName"
          label="Full Name"
          placeholder="Enter your full name"
        />
        <Input
          id="phoneNumber"
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
        />
      </div>

      {/* Email + education level */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
        />
        <Input
          id="education"
          label="Education Level"
          placeholder="Enter your education level"
        />
      </div>

      {/* Password + confirm password */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Min. 8 characters"
        />
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Repeat password"
        />
      </div>

      {/* Competition interest tags */}
      <div>
        <p className="mb-2 text-sm font-medium text-text-primary">
          Competition interests
        </p>
        <div className="flex flex-wrap gap-2">
          {["Hackathon", "Business", "Programming", "Innovation"].map((interest) => (
            <span
              key={interest}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-secondary"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Terms notice */}
      <p className="text-xs text-text-muted">
        By registering you agree to our Terms and Privacy Policy.
      </p>

      {/* Submit button */}
      <Button type="button" variant="primary" onClick={() => navigate("/discover")}>
        Create Account &amp; Explore
      </Button>

      {/* Sign in link */}
      <p className="text-center text-sm text-text-muted">
        Already have an account?
        <Link to="/signin" className="font-semibold text-sand hover:text-text-primary">
          Sign in
        </Link>
      </p>
    </form>
  );
}
