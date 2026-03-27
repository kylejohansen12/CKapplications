import { trpc } from "@/lib/trpc";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function AnalyticsSection() {
  const { data: analytics, isLoading } = trpc.quotes.analytics.useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin" size={24} />
      </div>
    );
  }

  if (!analytics) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Prepare data for charts
  const statusData = [
    { name: "New", value: analytics.statusCounts.new, fill: "#0066CC" },
    { name: "Contacted", value: analytics.statusCounts.contacted, fill: "#4DA6FF" },
    { name: "Completed", value: analytics.statusCounts.completed, fill: "#D4AF37" },
  ];

  const serviceData = Object.entries(analytics.serviceCounts).map(([service, count]) => ({
    name: service,
    value: count,
  }));

  const propertyData = Object.entries(analytics.propertyTypeCounts).map(([type, count]) => ({
    name: type === "residential" ? "Residential" : "Commercial",
    value: count,
    fill: type === "residential" ? "#0066CC" : "#003D7A",
  }));

  const dateData = Object.entries(analytics.quotesByDate)
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, count]) => ({
      date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      quotes: count,
    }));

  const COLORS = ["#0066CC", "#4DA6FF", "#D4AF37", "#003D7A", "#65B741"];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.totalQuotes}</div>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">New Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{analytics.statusCounts.new}</div>
            <p className="text-xs text-gray-500 mt-1">Awaiting follow-up</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Contacted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-sky-600">{analytics.statusCounts.contacted}</div>
            <p className="text-xs text-gray-500 mt-1">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">{analytics.conversionRate}%</div>
            <p className="text-xs text-gray-500 mt-1">Completed / Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Quote Status Distribution</CardTitle>
            <CardDescription>Current status of all quotes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Property Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Quotes by Property Type</CardTitle>
            <CardDescription>Residential vs Commercial</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={propertyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0066CC" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Top Services Requested</CardTitle>
            <CardDescription>Most popular services</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="value" fill="#D4AF37" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quotes Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Quotes Over Time</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="quotes" stroke="#0066CC" strokeWidth={2} dot={{ fill: "#D4AF37" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Quotes */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Quote Requests</CardTitle>
          <CardDescription>Latest 5 submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.recentQuotes && analytics.recentQuotes.length > 0 ? (
              analytics.recentQuotes.map((quote) => (
                <div key={quote.id} className="flex items-start justify-between border-b pb-4 last:border-b-0">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{quote.customerName}</p>
                    <p className="text-sm text-gray-600">{quote.serviceType} • {quote.propertyType}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(quote.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
                      quote.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      quote.status === 'contacted' ? 'bg-sky-100 text-sky-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent quotes</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
