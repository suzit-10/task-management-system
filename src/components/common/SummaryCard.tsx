interface SummaryCardProps {
  title: string;
  icon: string;
  count: number;
  iconBgColor?: string;
  summaryCardClassName?: string;
}

const SummaryCard = ({
  title,
  icon,
  count,
  summaryCardClassName = "",
}: SummaryCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full flex items-center justify-between border border-gray-200">
      <div>
        <div className="flex items-center justify-content">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-3xl font-bold mt-2">{count}</p>
      </div>

      <div
        className={`text-2xl  p-3 items-center justify-center flex rounded-lg ${summaryCardClassName}`}
      >
        <i className="material-icons">{icon}</i>
      </div>
    </div>
  );
};

export default SummaryCard;
