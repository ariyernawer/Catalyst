import { Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from './pages/SignUp/SignUpPage';
import { DiscoverPage } from './pages/Discover/DiscoverPage';
import { SavedItemsPage } from './pages/Saved/SavedItemsPage';
import { UpcomingPage } from './pages/Upcoming/UpcomingPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import SignInPage from './pages/SignIn/SignInPage';
import { BookmarksProvider } from './context/BookmarksContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

export default function App() {
  return (
    <AuthProvider>
    <BookmarksProvider>
    <Routes>
      {/* Root redirect — prevents a blank screen at / */}
      <Route path="/" element={<Navigate to="/signup" replace />} />

      <Route
        path="/signup"
        element={
          <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
            <SignUpPage />
          </div>
        }
      />
      <Route path="/discover" element={<DiscoverPage />} />
      <Route path="/signin" element={<div className="min-h-screen flex items-center justify-center p-4 sm:p-8"><SignInPage /></div>} />
      <Route path="/saved" element={<SavedItemsPage />} />
      <Route path="/upcoming" element={<UpcomingPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      {/* Catch-all — any unknown URL goes back to signup */}
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
    </BookmarksProvider>
    </AuthProvider>
  );
}
