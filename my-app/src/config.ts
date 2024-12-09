// @ts-ignore
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

export default {
  REPORT_API: `${API_BASE_URL}/api/report`,
  DOWNLOAD_CSV_API: `${API_BASE_URL}/api/download-csv`,
};
