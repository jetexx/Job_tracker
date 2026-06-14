'use client';

import { useState } from 'react';

interface AddApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddApplicationModal({
  isOpen,
  onClose,
  onSuccess,
}: AddApplicationModalProps) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    jobLink: '',
    notes: '',
  });

  if (!isOpen) return null;

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        '/api/applications',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create application');
      }

      setFormData({
        company: '',
        role: '',
        status: 'Applied',
        jobLink: '',
        notes: '',
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to create application');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-lg shadow-xl">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            Add Application
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium">
              Company
            </label>

            <input
              required
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  company: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
              placeholder="Google"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Role
            </label>

            <input
              required
              type="text"
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
              placeholder="Software Engineer Intern"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Status
            </label>

            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            >
              <option value="Applied">
                Applied
              </option>

              <option value="Interview">
                Interview
              </option>

              <option value="Offer">
                Offer
              </option>

              <option value="Rejected">
                Rejected
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Job Link
            </label>

            <input
              type="url"
              value={formData.jobLink}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  jobLink: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Notes
            </label>

            <textarea
              rows={4}
              value={formData.notes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notes: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
              placeholder="Any notes..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {loading
                ? 'Creating...'
                : 'Create Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}