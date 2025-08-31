import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import ClickSpark from './components/Common/ClickSpark';
import Navbar from './components/Layout/Navbar';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import DataStructureCategoryPage from './pages/DataStructureCategoryPage';
import LessonDetail from './pages/LessonDetail';
import Challenges from './pages/Challenges';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './landing/LandingPage';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    window.location.href = '/login';
    return null;
  }
  return <>{children}</>;
}

function App() {
  return (
    <UserProvider>
      <Router>
        <ClickSpark
          sparkColor="#22c55e"
          sparkSize={12}
          sparkRadius={20}
          sparkCount={6}
          duration={500}
          easing="ease-out"
          extraScale={1.2}
        >
          <div className="min-h-screen bg-gray-200 dark:bg-[#111113] flex flex-col transition-colors">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={
                <>
            <Navbar />
            <main className="flex-grow">
              <Routes>
                      <Route path="/learn" element={<PrivateRoute><Learn /></PrivateRoute>} />
                      <Route path="/learn/:categoryId" element={<PrivateRoute><DataStructureCategoryPage /></PrivateRoute>} />
                      <Route path="/learn/:categoryId/:lessonId" element={<PrivateRoute><LessonDetail /></PrivateRoute>} />
                      <Route path="/challenges" element={<PrivateRoute><Challenges /></PrivateRoute>} />
                      <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
                      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              </Routes>
            </main>
                </>
              } />
            </Routes>
          </div>
        </ClickSpark>
      </Router>
    </UserProvider>
  );
}

export default App;