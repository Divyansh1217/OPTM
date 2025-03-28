
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import LoginPage from '@/pages/LoginPage';
import Login from '@/pages/Login';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import OAuthCallback from '@/pages/OAuthCallback';
import ReportsPage from '@/pages/ReportsPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import PatientReportsPage from '@/pages/PatientReportsPage';
import AnatomyMapPage from '@/pages/AnatomyMapPage';
import BiomarkersPage from '@/pages/BiomarkersPage';
import HealthAppsPage from '@/pages/HealthAppsPage';
import AppointmentsPage from '@/pages/AppointmentsPage';
import { AnalysisPage } from '@/pages/analysis';
import AIAnalysisPage from '@/pages/AIAnalysisPage';
import PatientsPage from '@/pages/patients';
import SettingsPage from '@/pages/SettingsPage';
import HelpPage from '@/pages/HelpPage';
import ExercisePage from '@/pages/exercises/ExercisePage';
import MotionAnalysisPage from '@/app/exercises/motion-analysis/page';

// Lazy load components
const DoctorDashboard = lazy(() => import('@/pages/dashboard/DoctorDashboard'));
const ReceptionistDashboard = lazy(() => import('@/pages/dashboard/ReceptionistDashboard'));
const PatientDashboard = lazy(() => import('@/pages/PatientDashboard'));

// Loading Component
const Loading = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Index Route - redirects to login or dashboard based on auth state */}
        <Route path="/" element={<Index />} />
        
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/legacy-login" element={<Login />} />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
        
        {/* Motion Analysis Route - Public for testing */}
        <Route path="/motion-analysis" element={<MotionAnalysisPage />} />
        
        {/* Doctor Routes */}
        <Route 
          path="/dashboard/doctor" 
          element={
            <ProtectedRoute requiredRole="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Analytics Route */}
        <Route 
          path="/analytics" 
          element={
            <ProtectedRoute requiredRole="doctor">
              <AnalyticsPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Patients Route */}
        <Route 
          path="/patients" 
          element={
            <ProtectedRoute requiredRole={["doctor", "receptionist"]}>
              <PatientsPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Patient Routes */}
        <Route 
          path="/dashboard/patient" 
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Patient-specific Routes */}
        <Route 
          path="/patient-reports" 
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientReportsPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/anatomy-map" 
          element={
            <ProtectedRoute requiredRole="patient">
              <AnatomyMapPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/biomarkers" 
          element={
            <ProtectedRoute requiredRole="patient">
              <BiomarkersPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/health-apps" 
          element={
            <ProtectedRoute requiredRole="patient">
              <HealthAppsPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/analysis" 
          element={
            <ProtectedRoute requiredRole="patient">
              <AnalysisPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/ai-analysis" 
          element={
            <ProtectedRoute requiredRole="patient">
              <AIAnalysisPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/exercises" 
          element={
            <ProtectedRoute requiredRole="patient">
              <ExercisePage />
            </ProtectedRoute>
          } 
        />
        
        {/* Receptionist Routes */}
        <Route 
          path="/dashboard/receptionist" 
          element={
            <ProtectedRoute requiredRole="receptionist">
              <ReceptionistDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Shared Routes (accessible by multiple roles) */}
        <Route 
          path="/appointments" 
          element={
            <ProtectedRoute>
              <AppointmentsPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Settings and Help Routes */}
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/help" 
          element={
            <ProtectedRoute>
              <HelpPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Reports Route */}
        <Route 
          path="/reports" 
          element={
            <ProtectedRoute requiredRole="doctor">
              <ReportsPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Legacy Redirects */}
        <Route path="/dashboard" element={<Navigate to="/dashboard/doctor" replace />} />
        <Route path="/patient-dashboard" element={<Navigate to="/dashboard/patient" replace />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
