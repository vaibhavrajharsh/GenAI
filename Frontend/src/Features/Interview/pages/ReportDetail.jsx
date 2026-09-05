import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getReportById } from "../services/interview.api";
import { useAuth } from "../../Auth/hooks/useAuth";
import ReportView from "./ReportView";

const ReportDetail = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReport();
  }, [interviewId]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await getReportById(interviewId);
      setReport(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load report"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#171717] text-white flex flex-col items-center justify-center">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px]" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-500/8 rounded-full blur-[128px]" />
        </div>
        <svg className="animate-spin w-10 h-10 text-amber-400 mb-4 relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p className="text-gray-400 text-sm relative z-10">Loading report...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#171717] text-white flex flex-col items-center justify-center">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px]" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-500/8 rounded-full blur-[128px]" />
        </div>
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-rose-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Report not found</h2>
          <p className="text-gray-400 text-sm mb-6">{error}</p>
          <button
            onClick={() => navigate("/reports")}
            className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 hover:from-amber-300 hover:to-orange-400 transition-all duration-200"
          >
            Back to Reports
          </button>
        </div>
      </div>
    );
  }

  return (
    <ReportView
      report={report}
      onBack={() => navigate("/reports")}
      user={user}
      onLogout={handleLogout}
    />
  );
};

export default ReportDetail;
