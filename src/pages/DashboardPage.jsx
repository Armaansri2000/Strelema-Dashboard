import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchEmployees } from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import Table from "../components/Table";

export default function DashboardPage() {
  const { logout } = useAuth();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(null);
  const [token, setToken] = useState(null);
  const [query, setQuery] = useState("");

  // ✅ Load auth token from localStorage once
  useEffect(() => {
    const t = localStorage.getItem("strelema_token");
    if (t) setToken(t);
  }, []);

  // ✅ Fetch employee list when token or page changes
  useEffect(() => {
    if (!token) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetchEmployees(page, limit, token);
        console.log("📦 Employees API Response:", res);

        if (!cancelled) {
          const employees =
            res?.data?.employees ||
            res?.data?.data ||
            res?.data ||
            res?.employees ||
            [];

          // Try to extract total from API; fallback to data length
          const totalCount =
            res?.data?.total ||
            res?.data?.count ||
            res?.total ||
            res?.count ||
            (employees?.length > 0 ? employees.length : 0);

          setData(employees);
          setTotal(totalCount);
        }
      } catch (e) {
        console.error("❌ Employee fetch error:", e);
        if (!cancelled) {
          setError("Failed to load employees. Try again.");
          setData([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [page, limit, token]);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("strelema_token");
    logout();
  };

  // ✅ Client-side filter
  const filtered = data.filter((d) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      (d.name && d.name.toLowerCase().includes(q)) ||
      (d.email && d.email.toLowerCase().includes(q)) ||
      (d.department && d.department.toLowerCase().includes(q))
    );
  });

  // ✅ Derived pagination details
  const totalPages = total ? Math.ceil(total / limit) : 1;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-8 flex-1">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm border rounded hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>

        {/* Search & Total */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <input
            placeholder="Search by name or department"
            className="border px-3 py-2 rounded w-full md:w-1/3"
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="text-sm text-gray-600">
            {total !== null ? `${total} records` : ""}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white p-4 rounded shadow-sm min-h-[300px]">
          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="p-4 text-red-600 text-center">{error}</div>
          ) : (
            <>
              <Table data={filtered} />

              {filtered.length === 0 && !loading && (
                <div className="p-4 text-center text-gray-500">
                  No employees found.
                </div>
              )}

              {/* ✅ Pagination Controls */}
              <div className="mt-4 flex items-center justify-between text-sm">
                <div>
                  Page {page}
                  {total ? ` of ${totalPages}` : ""}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
                  >
                    Previous
                  </button>

                  <button
                    onClick={() => {
                      if (page < totalPages) setPage((p) => p + 1);
                    }}
                    disabled={total && page >= totalPages}
                    className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
