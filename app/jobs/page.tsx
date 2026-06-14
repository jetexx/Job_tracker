'use client';

import { useEffect, useState } from 'react';
import JobCard from '../../components/JobCard';
import JobForm from '../../components/JobForm';
import { Plus } from 'lucide-react';

interface Job {
  id: string;
  company: string;
  role: string;
  status: string;
  jobLink?: string;
  notes?: string;
  appliedDate?: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editJob, setEditJob] = useState<Job | null>(null);

  const fetchJobs = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/jobs');

      if (!res.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete job');
      }

      await fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleEdit = (job: Job) => {
    setEditJob(job);
    setShowForm(true);
  };

  const handleSubmit = async (job: Omit<Job, 'id'>, id?: string) => {
    try {
      if (id) {
        const res = await fetch(`/api/jobs/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(job),
        });

        if (!res.ok) {
          throw new Error('Failed to update job');
        }
      } else {
        const res = await fetch('/api/jobs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(job),
        });

        if (!res.ok) {
          throw new Error('Failed to create job');
        }
      }

      setShowForm(false);
      setEditJob(null);

      await fetchJobs();
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        My Job Applications
      </h1>

      <button
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mb-4"
        onClick={() => {
          setEditJob(null);
          setShowForm(true);
        }}
      >
        <Plus className="h-5 w-5" />
        Add Job
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-gray-500">No job applications found.</p>
          )}
        </div>
      )}

      {showForm && (
        <JobForm
          initialData={editJob}
          onClose={() => {
            setShowForm(false);
            setEditJob(null);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}