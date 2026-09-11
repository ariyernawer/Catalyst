import { Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from './pages/SignUp/SignUpPage';
import { DiscoverPage } from './pages/Discover/DiscoverPage';
import { SavedItemsPage } from './pages/Saved/SavedItemsPage';
import { UpcomingPage } from './pages/Upcoming/UpcomingPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import SignInPage from './pages/SignIn/SignInPage';
import Landing from './pages/Landing';
import SelectRole from './pages/SelectRole';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

import { OrganizerProvider } from './context/OrganizerContext';
import OrganizerLayout from './components/organizer/OrganizerLayout';
import OrganizerDashboard from './pages/organizer/OrganizerDashboard';
import MyCompetitions from './pages/organizer/MyCompetitions';
import CreateCompetition from './pages/organizer/CreateCompetition';
import OrganizationProfile from './pages/organizer/OrganizationProfile';
import OrganizerSignup from './pages/organizer/OrganizerSignup';

export default function App() {
  return (
    <OrganizerProvider>
      <Routes>
        {/* Root shows Landing page */}
        <Route path="/" element={<Landing />} />

        {/* Public routes (redirect to dashboard when already logged in) */}
        <Route element={<PublicRoute />}>
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
          <Route path="/select-role" element={<SelectRole />} />
          <Route path="/organizer/signup" element={<OrganizerSignup />} />
          <Route path="/organizer/login" element={<OrganizerSignup />} />
        </Route>

        {/* Protected participant routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/saved" element={<SavedItemsPage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Protected organizer routes */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/organizer"
            element={
              <OrganizerLayout>
                <OrganizerDashboard />
              </OrganizerLayout>
            }
          />
          <Route
            path="/organizer/dashboard"
            element={
              <OrganizerLayout>
                <OrganizerDashboard />
              </OrganizerLayout>
            }
          />
          <Route
            path="/organizer/competitions"
            element={
              <OrganizerLayout>
                <MyCompetitions />
              </OrganizerLayout>
            }
          />
          <Route
            path="/organizer/competitions/new"
            element={
              <OrganizerLayout>
                <CreateCompetition />
              </OrganizerLayout>
            }
          />
          <Route
            path="/organizer/competitions/edit/:id"
            element={
              <OrganizerLayout>
                <CreateCompetition />
              </OrganizerLayout>
            }
          />
          <Route
            path="/organizer/organization"
            element={
              <OrganizerLayout>
                <OrganizationProfile />
              </OrganizerLayout>
            }
          />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </OrganizerProvider>
  );
}