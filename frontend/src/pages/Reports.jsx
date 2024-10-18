const Reports = () => {
    // Sample data
    const reportData = [
      { id: 1, title: "Monthly Sales", value: "$5,000", date: "2024-09" },
      { id: 2, title: "User Registrations", value: "150", date: "2024-09" },
      { id: 3, title: "Feedback Received", value: "75", date: "2024-09" },
    ];
  
    return (
      <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Reports Overview</h2>
        <ul className="space-y-4">
          {reportData.map((report) => (
            <li key={report.id} className="flex justify-between p-4 border-b">
              <span className="font-semibold">{report.title}</span>
              <span>{report.value}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Reports;
  