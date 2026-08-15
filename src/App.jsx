import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { OrganizerProvider } from './context/OrganizerContext';
import OrganizerLayout from './components/organizer/OrganizerLayout';
import OrganizerDashboard from './pages/organizer/OrganizerDashboard';
import MyCompetitions from './pages/organizer/MyCompetitions';
import CreateCompetition from './pages/organizer/CreateCompetition';
import OrganizationProfile from './pages/organizer/OrganizationProfile';
import OrganizerSignup from './pages/organizer/OrganizerSignup';
import OrganizerParticipant from './pages/organizer/organizerParticipant';

function App() {
  return (
    <OrganizerProvider>
      <BrowserRouter>
        <Routes>
          {/* Direct Sign Up / Auth as the entrance page */}
          <Route path="/" element={<OrganizerSignup />} />
          <Route path="/signup" element={<OrganizerSignup />} />
          <Route path="/signin" element={<OrganizerSignup />} />
          <Route path="/login" element={<OrganizerSignup />} />

          {/* Participant Route */}
          <Route path="/participant" element={<OrganizerParticipant />} />

          {/* Organizer Dashboard & Pages */}
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

          {/* Fallback to Sign Up */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </OrganizerProvider>
  );
}

export default App;