'use client';
import AddApplicationModal from '@/components/Addapplicationmodal';
import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import StatCard from '@/components/StatCard';

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

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    interviews: 0,
    offers: 0,
    rejected: 0,
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [dashboardRes, jobsRes] = await Promise.all([
          fetch('/api/dashboard'),
          fetch('/api/jobs'),
        ]);

        const dashboardData = await dashboardRes.json();
        const jobsData = await jobsRes.json();

        setStats(dashboardData);
        setJobs(jobsData);
      } catch (error) {
        console.error('Dashboard Error:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const statusCounts = jobs.reduce(
    (acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const pieData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }));
   const [showModal, setShowModal] = useState(false);
   const fetchApplications = () => {
    // Implement application refresh logic here if needed.
  };

  const COLORS = [
    '#60a5fa',
    '#34d399',
    '#f87171',
    '#a78bfa',
    '#fbbf24',
  ];

  const interviewRate =
    stats.total > 0
      ? ((stats.interviews / stats.total) * 100).toFixed(1)
      : '0';

  const offerRate =
    stats.total > 0
      ? ((stats.offers / stats.total) * 100).toFixed(1)
      : '0';

  const barData = [
    {
      name: 'Interviews',
      value: stats.interviews,
    },
    {
      name: 'Offers',
      value: stats.offers,
    },
  ];
  const syncGmail = async () => {
  try {
    const res = await fetch("/api/gmail-sync");
    const data = await res.json();

    alert(
      `Processed ${data.processedEmails || 0} emails`
    );
  } catch (error) {
    console.error(error);
  }
};

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          Analytics Dashboard
        </h1>
        <div><button
  onClick={syncGmail}
  className="bg-green-600 text-white px-4 py-2 rounded-lg"
>
  Sync Gmail
</button></div>

        <button  onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add Application
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Applications"
          value={stats.total.toString()}
          color="blue"
        />

        <StatCard
          title="Interviews"
          value={stats.interviews.toString()}
          color="green"
        />

        <StatCard
          title="Offers"
          value={stats.offers.toString()}
          color="purple"
        />

        <StatCard
          title="Rejections"
          value={stats.rejected.toString()}
          color="red"
        />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-4">
            Status Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-4">
            Interview / Offer Rates
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <Bar dataKey="value" fill="#34d399" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-1">
            <p className="text-sm">
              Interview Rate: {interviewRate}%
            </p>

            <p className="text-sm">
              Offer Rate: {offerRate}%
            </p>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-4">
          Recent Applications
        </h2>

        {jobs.length === 0 ? (
          <p className="text-gray-500">
            No applications yet.
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Company</th>
                <th className="text-left py-2">Role</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {jobs.slice(0, 5).map((job) => (
                <tr key={job.id} className="border-b">
                  <td className="py-3">{job.company}</td>
                  <td className="py-3">{job.role}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
        <AddApplicationModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onSuccess={fetchApplications}
            />
    </div>
  );
}