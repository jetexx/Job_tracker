import React from 'react';
import { Pen, Trash2 } from 'lucide-react';

interface Job {
  id: string;
  company: string;
  role: string;
  status: string;
  jobLink?: string;
  notes?: string;
  appliedDate?: string;
}

interface Props {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

export default function JobCard({ job, onEdit, onDelete }: Props) {
  const statusColors: Record<string, string> = {
    Applied: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    Interview: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    Offer: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    Rejected: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  };

  const badgeClass = statusColors[job.status] || 'bg-gray-100 text-gray-700';

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <div>
        <h3 className="font-medium text-gray-900 dark:text-white">{job.company}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{job.role}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeClass}`}>{job.status}</span>
        <button onClick={() => onEdit(job)} className="p-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
          <Pen className="h-4 w-4" />
        </button>
        <button onClick={() => onDelete(job.id)} className="p-1 text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
