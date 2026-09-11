import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import LandingPage from './views/pages/LandingPage';
import SelectRolePage from './views/pages/auth/SelectRolePage';
import SignInPage from './views/pages/auth/SignInPage';
import SignUpPage from './views/pages/auth/SignUpPage';
import DiscoverPage from './views/pages/participant/DiscoverPage';
import SavedItemsPage from './views/pages/participant/SavedItemsPage';
import UpcomingPage from './views/pages/participant/UpcomingPage';
import ProfilePage from './views/pages/participant/ProfilePage';
import OrganizerSignupPage from './views/pages/organizer/OrganizerSignupPage';
import OrganizerDashboardPage from './views/pages/organizer/OrganizerDashboardPage';
import MyCompetitionsPage from './views/pages/organizer/MyCompetitionsPage';
import CreateCompetitionPage from './views/pages/organizer/CreateCompetitionPage';
import OrganizationProfilePage from './views/pages/organizer/OrganizationProfilePage';
import PrivateRoute from './controllers/utils/PrivateRoute';
import PublicRoute from './controllers/utils/PublicRoute';
import { OrganizerProvider } from './models/contexts/OrganizerContext';
import OrganizerLayout from './views/components/layout/OrganizerLayout';

// Keys the edit page by :id so a new id remounts the form (lazy-init prefill).
function EditCompetitionRoute() {
  const { id } = useParams();
  return <CreateCompetitionPage key={id} />;
}

export default function App() {
  return (
    <OrganizerProvider>
      <Routes>
        {/* Root shows Landing page */}
        <Route path="/" element={<LandingPage />} />

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
          <Route path="/select-role" element={<SelectRolePage />} />
          <Route path="/organizer/signup" element={<OrganizerSignupPage />} />
          <Route path="/organizer/login" element={<OrganizerSignupPage />} />
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
                <OrganizerDashboardPage />
              </OrganizerLayout>
            }
          />
          <Route
            path="/organizer/dashboard"
            element={
              <OrganizerLayout>
                <OrganizerDashboardPage />
              </OrganizerLayout>
            }
          />
          <Route
            path="/organizer/competitions"
            element={
              <OrganizerLayout>
                <MyCompetitionsPage />
              </OrganizerLayout>
            }
          />
          <Route
            path="/organizer/competitions/new"
            element={
              <OrganizerLayout>
                <CreateCompetitionPage />
              </OrganizerLayout>
            }
          />
          <Route
            path="/organizer/competitions/edit/:id"
            element={
              <OrganizerLayout>
                <EditCompetitionRoute />
              </OrganizerLayout>
            }
          />
          <Route
            path="/organizer/organization"
            element={
              <OrganizerLayout>
                <OrganizationProfilePage />
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