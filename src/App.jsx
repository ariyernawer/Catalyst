import SignUpPage from './pages/SignUp/SignUpPage';
import './styles/global.css';

export default function App() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-8
        bg-[image:linear-gradient(theme(colors.surface)_1px,transparent_1px),linear-gradient(90deg,theme(colors.surface)_1px,transparent_1px)]
        bg-[length:48px_48px] bg-center"
    >
      <SignUpPage />
    </div>
  );
}
