export function StatusBadge({ status }) {
  let bgColor = "";
  let textColor = "";
  let borderColor = "";

  switch (status.toLowerCase()) {
    case "pending":
      bgColor = "bg-yellow-500/15";
      textColor = "text-yellow-700";
      borderColor = "border-yellow-500/20";
      break;
    case "approved":
      bgColor = "bg-green-500/15";
      textColor = "text-green-700";
      borderColor = "border-green-500/20";
      break;
    case "rejected":
      bgColor = "bg-red-500/15";
      textColor = "text-red-700";
      borderColor = "border-red-500/20";
      break;
    default:
      bgColor = "bg-gray-500/15";
      textColor = "text-gray-700";
      borderColor = "border-gray-500/20";
      break;
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${bgColor} ${textColor} ${borderColor}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}