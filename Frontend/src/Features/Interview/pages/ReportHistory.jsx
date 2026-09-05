import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getAllReports } from "../services/interview.api";
import { useAuth } from "../../Auth/hooks/useAuth";

const ReportHistory = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await getAllReports();
      setReports(response.data.interviewReports || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load reports"
      );
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (score >= 60) return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    return "text-rose-400 bg-rose-500/10 border-rose-500/20";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Work";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#171717] text-white overflow-auto">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-500/8 rounded-full blur-[128px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Interview<span className="text-amber-400">AI</span>
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 hover:from-amber-300 hover:to-orange-400 transition-all duration-200"
          >
            + New Report
          </button>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-gray-900">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-gray-300">{user?.username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            Your{" "}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              Reports
            </span>
          </h1>
          <p className="text-gray-400">
            View all your past interview preparation reports
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <svg className="animate-spin w-10 h-10 text-amber-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-gray-400 text-sm">Loading your reports...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && reports.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-white/5 bg-white/[0.02]">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-300 mb-1">No reports yet</h3>
            <p className="text-gray-500 text-sm mb-6">Generate your first interview preparation report</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 hover:from-amber-300 hover:to-orange-400 transition-all duration-200"
            >
              Create Report
            </button>
          </div>
        )}

        {/* Reports Grid */}
        {!loading && reports.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((report) => (
              <button
                key={report._id}
                onClick={() => navigate(`/reports/${report._id}`)}
                className="group text-left rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-base truncate group-hover:text-amber-400 transition-colors duration-200">
                      {report.title || "Interview Report"}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">
                      {formatDate(report.createdAt)} • {formatTime(report.createdAt)}
                    </p>
                  </div>
                  <div className={`shrink-0 px-3 py-1.5 rounded-xl text-sm font-bold border ${getScoreColor(report.matchScore)}`}>
                    {report.matchScore}%
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getScoreColor(report.matchScore)}`}>
                      {getScoreLabel(report.matchScore)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {report.jobDescription?.substring(0, 60)}
                      {report.jobDescription?.length > 60 ? "..." : ""}
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-gray-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all duration-200"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportHistory;
