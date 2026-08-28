import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import API from "../../../api/axios";

const INTEREST_OPTIONS = ["Hackathon", "Business", "Programming", "Innovation"];

export default function SignUpForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    phoneNumber: "",
    email: "",
    education: "",
    password: "",
    confirmPassword: "",
    interests: [],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleInterest = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...payload } = formData;
      const res = await API.post("/participant/register", payload);
      console.log("Registered:", res.data);
      navigate("/discover");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="fullname"
          name="fullname"
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.fullname}
          onChange={handleChange}
        />
        <Input
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          id="education"
          name="education"
          label="Education Level"
          placeholder="Enter your education level"
          value={formData.education}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Min. 8 characters"
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Repeat password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-text-primary">
          Competition interests
        </p>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((interest) => {
            const selected = formData.interests.includes(interest);
            return (
              <button
                type="button"
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  selected
                    ? "border-sand bg-sand text-white"
                    : "border-border bg-surface text-text-secondary"
                }`}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-text-muted">
        By registering you agree to our Terms and Privacy Policy.
      </p>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Creating account..." : "Create Account & Explore"}
      </Button>

      <p className="text-center text-sm text-text-muted">
        Already have an account?{" "}
        <Link to="/signin" className="font-semibold text-sand hover:text-text-primary">
          Sign in
        </Link>
      </p>
    </form>
  );
}