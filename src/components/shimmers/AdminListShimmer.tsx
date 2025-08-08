import React from "react";

export default function AdminListShimmer() {
  return (
    <div className="mb-8 w-full p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-32 h-6 rounded bg-gray-200 animate-pulse" />
        <div className="w-24 h-8 rounded bg-gray-200 animate-pulse" />
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                  Admin Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4].map((i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse mr-3" />
                      <div>
                        <div className="w-32 h-4 rounded bg-gray-200 animate-pulse mb-1" />
                        <div className="w-24 h-3 rounded bg-gray-200 animate-pulse" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-20 h-4 rounded bg-gray-200 animate-pulse" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-16 h-6 rounded-full bg-gray-200 animate-pulse" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-20 h-8 rounded bg-gray-200 animate-pulse" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
