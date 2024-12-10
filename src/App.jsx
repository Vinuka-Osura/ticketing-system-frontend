//import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/login/index.jsx';
import RegisterPage from './pages/register/index.jsx';
import PrivateRoute from './utility/protective-routs-login.jsx';

import HomePage from './pages/home-page/index.jsx';

import AdminDashboardLayout from './pages/admin-home/index.jsx';
import VenderDashboardLayout from './pages/vender-home/index.jsx';
import CustomerDashboardLayout from './pages/customer-home/index.jsx';

import EventOverview from './pages/vender-home/components/event-overview.jsx';
import VendorTicketManagement from './pages/vender-home/components/event-ticket-management.jsx'

import EventBrowsing from './pages/customer-home/components/event-browsing.jsx';
import CustomerTicketManagement from './pages/customer-home/components/ticket-management.jsx';

import EventManagement from './pages/admin-home/components/event-management.jsx';
import SystemConfig from './pages/admin-home/components/system-config.jsx';
import VenderMangement from './pages/admin-home/components/vendor-management.jsx';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Private Routs */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/admin-home" element={<AdminDashboardLayout />}>
            <Route
              path="/admin-home/system-config"
              element={<SystemConfig />}
            />
            <Route
              path="/admin-home/event-management"
              element={<EventManagement />}
            />
            <Route
              path="/admin-home/vendor-management"
              element={<VenderMangement />}
            />
          </Route>

          <Route path="/customer-home" element={<CustomerDashboardLayout />}>
            <Route
              path="/customer-home/event-browsing"
              element={<EventBrowsing />}
            />
            <Route
              path="/customer-home/ticket-management"
              element={<CustomerTicketManagement />}
            />
          </Route>

          <Route path="/vendor-home" element={<VenderDashboardLayout />} >
            <Route
              path="/vendor-home/event-ticket-management"
              element={<VendorTicketManagement />}
            />
            <Route
              path="/vendor-home/event-overview"
              element={<EventOverview />}
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;