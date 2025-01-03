import { useNavigate, Outlet } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const userRole = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/basepage');
  }

  return (
    <div className="dashboard-container">
      <header className="navbar">
        <div className="navbar-title">Movies Sphere</div>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="content-container">
        <aside className="sidebar">
          <div className="sidebar-buttons">
            <button onClick={() => navigate('/dashboard/movies')} className="sidebar-btn">
              Movies
            </button>

            <button onClick={() => navigate('/dashboard/cinema')} className="sidebar-btn">
              Cinemas
            </button>

            <button onClick={() => navigate('/dashboard/bookings')} className="sidebar-btn">
              Bookings
            </button>
            <button onClick={() => navigate('/dashboard/profile')} className="sidebar-btn">
              Profile
            </button>

          {userRole === 'ADMIN' && (
              <button onClick={() => navigate('/dashboard/admin')} className="sidebar-btn">
                Admin
              </button>
            )}
          </div>
        </aside>

        <main className="main-block">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
