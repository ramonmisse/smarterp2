import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import StatCards from "@/components/dashboard/StatCards";
import ModuleCards from "@/components/dashboard/ModuleCards";
import RecentSalesChart from "@/components/dashboard/RecentSalesChart";
import TopSellingItems from "@/components/dashboard/TopSellingItems";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import LowStockAlert from "@/components/dashboard/LowStockAlert";

const Dashboard = () => {
  return (
    <MainLayout title="Dashboard">
      <div className="space-y-6">
        <StatCards />

        <ModuleCards />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <RecentSalesChart />
          </div>
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            <TopSellingItems />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6">
            <UpcomingAppointments />
          </div>
          <div className="lg:col-span-6">
            <LowStockAlert />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
