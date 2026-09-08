export const DashboardCard = ({
  title,
  value,
  icon: Icon,
  
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center hover:shadow-lg transition">

      <div>

        <p className="text-gray-500">
          {title}
        </p>

        <h1 className="text-3xl font-bold mt-2">
          {value}
        </h1>

      </div>

      <div
        className={`h-16 w-16 rounded-full flex items-center justify-center`}
      >
        <Icon className="text-blue-600" size={30} />
      </div>

    </div>
  );
};