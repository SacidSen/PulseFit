import { useNavigate } from 'react-router-dom';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

const LogoutButton = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();           // Clears auth cookie or localStorage
    navigate('/login');  // Redirect to login
  };

  return <button onClick={handleLogout}>Sign Out</button>;
};

export default LogoutButton;
