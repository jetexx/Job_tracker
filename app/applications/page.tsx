'use client';

import { useEffect, useState } from 'react';
import JobCard from '@/components/JobCard';
import EditApplicationModal from '@/components/editapplicationmodal';
import AddApplicationModal from '@/components/Addapplicationmodal';

interface Job {
  id: string;
  company: string;
  role: string;
  status: string;
  jobLink?: string;
  notes?: string;
}

export default function ApplicationsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal,setShowModal] = useState(true);
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedJob, setSelectedJob] =
  useState<Job | null>(null);

const [showEditModal, setShowEditModal] =
  useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    try {
      const res = await fetch('/api/applications');
      const data = await res.json();

      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteApplication(id: string) {
    const confirmed = window.confirm(
      'Delete this application?'
    );

    if (!confirmed) return;

    try {
      await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
      });

      setJobs((prev) =>
        prev.filter((job) => job.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  }
   const fetchApplication=()=>{};
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' ||
      job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Applications
        </h1>

        <button
           onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Application
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">

        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg p-3"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="border rounded-lg p-3"
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

      </div>

      <p className="mb-4 text-gray-500">
        Showing {filteredJobs.length} of {jobs.length} applications
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6">
          No applications found.
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={() => {
  setSelectedJob(job);
  setShowEditModal(true);
}}
              onDelete={() =>
                deleteApplication(job.id)
              }
            />
          ))}
        </div>
      )}
        <EditApplicationModal
        job={selectedJob}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={fetchApplications}
      />
      <AddApplicationModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onSuccess={fetchApplication}
            />
    </div>
  );
}