import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  color: 'blue' | 'green' | 'purple' | 'red';
}

const colorClasses: Record<StatCardProps['color'], string> = {
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  green: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  red: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
};

export default function StatCard({ title, value, color }: StatCardProps) {
  return (
    <div className={`rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 ${colorClasses[color]}`}>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}
