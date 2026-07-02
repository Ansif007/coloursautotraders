import { useEffect, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { useAdminStore } from "@/store/adminStore";
import { Skeleton } from "@/components/ui/Skeleton";

function AdminLoading() {
  return (
    <div className="min-h-screen bg-bg-base flex">
      <div className="hidden lg:block w-[220px]" />
      <main className="flex-1 lg:ml-0 p-4 sm:p-6 lg:p-8 pt-14 lg:pt-8">
        <div className="space-y-4">
          <Skeleton variant="text" className="w-48 h-8" />
          <Skeleton variant="rect" className="w-full h-32" />
          <Skeleton variant="rect" className="w-full h-64" />
        </div>
      </main>
    </div>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, checkAuth, fetchParts, error } =
    useAdminStore();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchParts();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated && !loading) {
    return <Navigate to="/admin" replace />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-base flex">
        <div className="hidden lg:block w-[220px]" />
        <main className="flex-1 lg:ml-0 p-4 sm:p-6 lg:p-8 pt-14 lg:pt-8">
          <AdminLoading />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-base flex">
      <AdminSidebar />
      <main className="flex-1 lg:ml-[220px] p-4 sm:p-6 lg:p-8 pt-14 lg:pt-8">
        {error && (
          <div className="bg-status-red/5 border border-status-red/20 rounded-md px-4 py-2.5 mb-6">
            <p className="text-xs font-body text-status-red/80">{error}</p>
          </div>
        )}
        <Suspense fallback={<AdminLoading />}>{children}</Suspense>
      </main>
    </div>
  );
}
