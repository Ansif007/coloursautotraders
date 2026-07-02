import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToastContainer } from "@/components/ui/Toast";
import { Skeleton } from "@/components/ui/Skeleton";
import { InquiryDrawer } from "@/components/inquiry/InquiryDrawer";
import { HomePage } from "@/pages/Home";
import { CatalogPage } from "@/pages/Catalog";
import { AboutPage } from "@/pages/About";
import { ContactPage } from "@/pages/Contact";
import { ProductDetailPage } from "@/pages/ProductDetail";
import Vehicles from "@/pages/Vehicles";
import VehicleDetail from "@/pages/VehicleDetail";
import { AdminLayout } from "@/components/admin/AdminLayout";

const AdminLogin = lazy(() =>
  import("@/pages/AdminLogin").then((m) => ({ default: m.AdminLogin }))
);
const AdminDashboard = lazy(() =>
  import("@/pages/AdminDashboard").then((m) => ({ default: m.AdminDashboard }))
);
const AdminInventory = lazy(() =>
  import("@/pages/AdminInventory").then((m) => ({ default: m.AdminInventory }))
);
const AdminAddPart = lazy(() =>
  import("@/pages/AdminAddPart").then((m) => ({ default: m.AdminAddPart }))
);
const AdminVehicles = lazy(() => import("@/pages/AdminVehicles"));
const AdminAddVehicle = lazy(() => import("@/pages/AdminAddVehicle"));

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function ProgressBar() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setProgress(0);

    const timer1 = setTimeout(() => setProgress(60), 50);
    const timer2 = setTimeout(() => setProgress(90), 150);
    const timer3 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setVisible(false), 300);
    }, 350);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-bg-base">
      <motion.div
        className="h-full bg-accent-amber"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <ProgressBar />
      <Header
        onInquiryToggle={() => setDrawerOpen(!drawerOpen)}
      />
      <main className="flex-1 pt-[5.5rem]">{children}</main>
      <Footer />
      <InquiryDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <PageTransition>
              <HomePage />
            </PageTransition>
          </Layout>
        }
      />
      <Route
        path="/catalog"
        element={
          <Layout>
            <PageTransition>
              <CatalogPage />
            </PageTransition>
          </Layout>
        }
      />
      <Route
        path="/catalog/:slug"
        element={
          <Layout>
            <PageTransition>
              <ProductDetailPage />
            </PageTransition>
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <PageTransition>
              <AboutPage />
            </PageTransition>
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <PageTransition>
              <ContactPage />
            </PageTransition>
          </Layout>
        }
      />
      <Route
        path="/vehicles"
        element={
          <Layout>
            <PageTransition>
              <Vehicles />
            </PageTransition>
          </Layout>
        }
      />
      <Route
        path="/vehicles/:slug"
        element={
          <Layout>
            <PageTransition>
              <VehicleDetail />
            </PageTransition>
          </Layout>
        }
      />

      {/* Admin Routes (code-split) */}
      <Route
        path="/admin"
        element={
          <Suspense
            fallback={
              <div className="min-h-screen bg-bg-base flex items-center justify-center">
                <Skeleton variant="rect" className="w-96 h-64" />
              </div>
            }
          >
            <AdminLogin />
          </Suspense>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/inventory"
        element={
          <AdminLayout>
            <AdminInventory />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/add-part"
        element={
          <AdminLayout>
            <AdminAddPart />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/edit-part/:slug"
        element={
          <AdminLayout>
            <AdminAddPart />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/vehicles"
        element={
          <AdminLayout>
            <AdminVehicles />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/add-vehicle"
        element={
          <AdminLayout>
            <AdminAddVehicle />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/edit-vehicle/:slug"
        element={
          <AdminLayout>
            <AdminAddVehicle />
          </AdminLayout>
        }
      />
    </Routes>
  );
}

export default App;
