export function getStatusBadge(adAccountStatus) {
  let statusColor = "";
  let statusName = "";

  switch (adAccountStatus) {
    case 1:
      statusColor = "bg-green-300";
      statusName = "Active";
      break;
    case 2:
      statusColor = "bg-red-300";
      statusName = "Disabled";
      break;
    case 3:
      statusColor = "bg-yellow-300";
      statusName = "Unsettled";
      break;
    case 7:
      statusColor = "bg-blue-300";
      statusName = "Pending Review";
      break;
    case 9:
      statusColor = "bg-purple-300";
      statusName = "In Grace Period";
      break;
    case 100:
      statusColor = "bg-indigo-300";
      statusName = "Pending Closure";
      break;
    case 101:
      statusColor = "bg-gray-300";
      statusName = "Closed";
      break;
    default:
      statusColor = "bg-gray-300";
      statusName = "Any";
  }

  return (
    <div
      className={`px-4 py-1 text-center rounded-xl absolute top-2 right-4 text-black ${statusColor}`}
    >
      {statusName}
    </div>
  );
}
