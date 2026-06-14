"use client";

import { useState, useEffect } from "react";
import { Briefcase, BarChart3 } from "lucide-react";
import AddApplicationModal from "@/components/Addapplicationmodal";

interface Job {
  id: string;
  company: string;
  role: string;
  status: string;
}

interface DashboardStats {
  total: number;
  interviews: number;
  offers: number;
  rejected: number;
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    interviews: 0,
    offers: 0,
    rejected: 0,
  });

  const [applications, setApplications] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [dashboardRes, jobsRes] = await Promise.all([
        fetch("/api/dashboard"),
        fetch("/api/jobs"),
      ]);

      const dashboardData = dashboardRes.ok
        ? await dashboardRes.json()
        : { total: 0, interviews: 0, offers: 0, rejected: 0 };
      const jobsData = jobsRes.ok ? await jobsRes.json() : [];

      setStats(dashboardData);
      setApplications(Array.isArray(jobsData) ? jobsData : []);
    } catch (error) {
      console.error("Failed loading data:", error);
      setStats({ total: 0, interviews: 0, offers: 0, rejected: 0 });
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const fetchApplications = async () => {
    await loadData();
  };

  if (loading) {
    return (
      <div className="p-8">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Applications
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.total}
                </p>
              </div>

              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Interviews
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.interviews}
                </p>
              </div>

              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Offers
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.offers}
                </p>
              </div>

              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rejections
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.rejected}
                </p>
              </div>

              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                <BarChart3 className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Add Application */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Application
        </button>

        {/* Recent Applications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden mt-6">

          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Applications
            </h2>
          </div>

          {applications.length === 0 ? (
            <div className="p-6">
              <p className="text-gray-500">
                No applications yet.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {applications.map((job) => (
                <div
                  key={job.id}
                  className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {job.company}
                      </h3>

                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {job.role}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          job.status === "Applied"
                            ? "bg-blue-100 text-blue-700"
                            : job.status === "Interview"
                            ? "bg-green-100 text-green-700"
                            : job.status === "Offer"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {job.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      <AddApplicationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchApplications}
      />
    </div>
  );
}