import { Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from './pages/SignUp/SignUpPage';
import { DiscoverPage } from './pages/Discover/DiscoverPage';
import { SavedItemsPage } from './pages/Saved/SavedItemsPage';
import { UpcomingPage } from './pages/Upcoming/UpcomingPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import SignInPage from './pages/SignIn/SignInPage';
import Landing from './pages/Landing';


import SelectRole from './pages/SelectRole';

export default function App() {
  return (
    <Routes>
      {/* Root shows Landing page */}
      <Route path="/" element={<Landing />} />

      <Route
        path="/signup"
        element={
          <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
            <SignUpPage />
          </div>
        }
      />
      <Route
        path="/signin"
        element={
          <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
            <SignInPage />
          </div>
        }
      />
      <Route path="/discover" element={<DiscoverPage />} />
      <Route path="/saved" element={<SavedItemsPage />} />
      <Route path="/upcoming" element={<UpcomingPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      <Route path="/select-role" element={<SelectRole />} />
     
      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
}