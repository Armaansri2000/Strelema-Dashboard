import React from 'react'

export default function Table({ data = [] }) {
  if (!data.length) {
    return <div className="text-center py-8 text-gray-500">No employees found.</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2 border-b">ID</th>
            <th className="text-left p-2 border-b">Name</th>
            <th className="text-left p-2 border-b">Department</th>
            <th className="text-left p-2 border-b">Designation</th>
            <th className="text-left p-2 border-b">Status</th>
            <th className="text-left p-2 border-b">Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((emp, idx) => (
            <tr key={emp._id || idx} className="hover:bg-gray-50">
              <td className="p-2 border-b text-sm text-gray-700">{emp._id}</td>
              <td className="p-2 border-b text-sm text-gray-700">{emp.name}</td>
              <td className="p-2 border-b text-sm text-gray-700">{emp.department || '—'}</td>
              <td className="p-2 border-b text-sm text-gray-700">{emp.designation || '—'}</td>
              <td className="p-2 border-b text-sm text-gray-700">{emp.status || '—'}</td>
              <td className="p-2 border-b text-sm text-gray-700">
                {new Date(emp.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
