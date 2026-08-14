import { Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from './pages/SignUp/SignUpPage';
import { DiscoverPage } from './pages/Discover/DiscoverPage';

export default function App() {
  return (
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

      {/* Catch-all — any unknown URL goes back to signup */}
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
}