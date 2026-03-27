import { useLocation } from "wouter";
import { useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import QuotesTable from "@/components/QuotesTable";
import AnalyticsSection from "@/components/AnalyticsSection";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      setLocation("/");
    }
  }, [user, loading, setLocation]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Quote Management Dashboard</h1>
          <p className="text-gray-600 mt-2">Track and manage all customer quote requests</p>
        </div>

        {/* Analytics Section */}
        <AnalyticsSection />

        {/* Quotes Table */}
        <QuotesTable />
      </div>
    </DashboardLayout>
  );
}
