import { useState } from 'react';
import { Users, Star, AlertTriangle, TrendingUp, Database, Activity } from 'lucide-react';

export function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  const MOCK_STATS = {
    totalRatings: 347,
    totalUsers: 52,
    avgRatingsPerUser: 6.7,
    qcRejectionRate: 8.4,
    avgConfidence: 0.73,
    activeToday: 18,
  };

  const MOCK_QC_LOGS = [
    {
      id: 1,
      timestamp: '2025-11-14 09:23:15',
      user: 'user_abc123',
      item: 'Hill_FrenchToast_2025-11-14',
      status: 'Rejected',
      reason: 'Duplicate submission',
    },
    {
      id: 2,
      timestamp: '2025-11-14 09:18:42',
      user: 'user_xyz789',
      item: 'Kings_Pizza_2025-11-14',
      status: 'Rejected',
      reason: 'Profanity detected',
    },
    {
      id: 3,
      timestamp: '2025-11-14 09:12:08',
      user: 'user_def456',
      item: 'Hill_Pasta_2025-11-14',
      status: 'Approved',
      reason: 'Passed all checks',
    },
  ];

  const MOCK_POPULAR_ITEMS = [
    { name: 'Cheese Pizza', hall: 'Kings Court', ratings: 45, avgRating: 4.2 },
    { name: 'Penne Pasta', hall: 'Hill', ratings: 38, avgRating: 3.9 },
    { name: 'French Toast', hall: 'Hill', ratings: 32, avgRating: 4.5 },
    { name: 'Caesar Salad', hall: 'McClelland', ratings: 28, avgRating: 3.6 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Monitor system performance and data quality</p>
      </div>

      {/* Time Range Selector */}
      <div className="mb-6">
        <div className="flex gap-2">
          {['24h', '7d', '30d', 'all'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg ${
                timeRange === range ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range === '24h' && 'Last 24 Hours'}
              {range === '7d' && 'Last 7 Days'}
              {range === '30d' && 'Last 30 Days'}
              {range === 'all' && 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Ratings</p>
            <Star className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="mb-1">{MOCK_STATS.totalRatings}</h2>
          <p className="text-gray-500">+23 today</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Active Users</p>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="mb-1">{MOCK_STATS.totalUsers}</h2>
          <p className="text-gray-500">{MOCK_STATS.activeToday} active today</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Avg Ratings/User</p>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="mb-1">{MOCK_STATS.avgRatingsPerUser.toFixed(1)}</h2>
          <p className="text-gray-500">↑ 12% from last week</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">QC Rejection Rate</p>
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
          </div>
          <h2 className="mb-1">{MOCK_STATS.qcRejectionRate}%</h2>
          <p className="text-gray-500">29 rejected submissions</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Avg Confidence</p>
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="mb-1">{MOCK_STATS.avgConfidence.toFixed(2)}</h2>
          <p className="text-gray-500">Across all items</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Database Size</p>
            <Database className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="mb-1">2.4 MB</h2>
          <p className="text-gray-500">347 entries</p>
        </div>
      </div>

      {/* Popular Items */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="mb-6">Most Rated Items</h2>
        <div className="space-y-4">
          {MOCK_POPULAR_ITEMS.map((item, index) => (
            <div key={item.name} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="mb-1">{item.name}</p>
                <p className="text-gray-600">{item.hall}</p>
              </div>
              <div className="text-right">
                <p className="mb-1">{item.ratings} ratings</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-gray-600">{item.avgRating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QC Logs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2>Recent QC Activity</h2>
          <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">View All</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-gray-600">Timestamp</th>
                <th className="px-4 py-3 text-left text-gray-600">User ID</th>
                <th className="px-4 py-3 text-left text-gray-600">Item</th>
                <th className="px-4 py-3 text-left text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-gray-600">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {MOCK_QC_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">{log.timestamp}</td>
                  <td className="px-4 py-3 text-gray-600">{log.user}</td>
                  <td className="px-4 py-3 text-gray-900">{log.item}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        log.status === 'Approved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{log.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Export */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-blue-900 mb-4">Data Management</h3>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Export QC Logs
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Export Aggregated Data
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Export User Activity
          </button>
        </div>
      </div>
    </div>
  );
}
