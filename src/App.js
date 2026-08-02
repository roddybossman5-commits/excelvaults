import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './GLOBAL/components/layout/Navbar';
import Footer from './GLOBAL/components/layout/Footer';

import HomePage from './GLOBAL/pages/home/HomePage';
import AboutPage from './GLOBAL/pages/about/AboutPage';
import ServicesPage from './GLOBAL/pages/services/ServicesPage';
import ContactPage from './GLOBAL/pages/contact/ContactPage';
import ShipmentPage from './GLOBAL/pages/shipment/ShipmentPage';
import TrackingPage from './GLOBAL/pages/tracking/TrackingPage';
import AccountPage from './GLOBAL/pages/account/AccountPage';

/**
 * The login portal and the dashboard live on account.excelvaults.com on the real
 * site, with their own chrome — so the marketing header/footer is not rendered
 * on those routes here either.
 */
const BARE_ROUTES = ['/tracking', '/account'];

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  console.log('[ProtectedRoute] guard check:', { authenticated: Boolean(user) });
  return user ? children : <Navigate to="/tracking" replace />;
}

function Layout() {
  const { pathname } = useLocation();
  const bare = BARE_ROUTES.includes(pathname);

  return (
    <>
      {!bare && (
        <Navbar />
      )}

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/services-grid" element={<ServicesPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/track-your-shipment" element={<ShipmentPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!bare && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
