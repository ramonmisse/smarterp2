import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import routes from "tempo-routes";

// Lazy load pages for better performance
const Home = lazy(() => import("./components/home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Products = lazy(() => import("./pages/Products"));
const Consignment = lazy(() => import("./pages/Consignment"));
const POS = lazy(() => import("./pages/POS"));
const Financial = lazy(() => import("./pages/Financial"));
const Suppliers = lazy(() => import("./pages/Suppliers"));
const Appointments = lazy(() => import("./pages/Appointments"));
const Settings = lazy(() => import("./pages/Settings"));
const Customers = lazy(() => import("./pages/Customers"));
const Sellers = lazy(() => import("./pages/Sellers"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/products" element={<Products />} />
          <Route path="/consignment" element={<Consignment />} />
          <Route path="/pos" element={<POS />} />
          <Route path="/financial" element={<Financial />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/sellers" element={<Sellers />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />

          {/* Allow Tempo routes */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
