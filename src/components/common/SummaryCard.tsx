interface SummaryCardProps {
  title: string;
  icon: string;
  count: number;
  iconBgColor?: string;
}

const SummaryCard = ({ title, icon, count, iconBgColor="gray" }: SummaryCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full flex items-center justify-between border border-gray-200">
      <div>
        <div className="flex items-center justify-content">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-3xl font-bold mt-2">{count}</p>
      </div>

      <div className={`text-2xl bg-${iconBgColor}-200 p-3 items-center justify-center flex rounded-lg`}>
        <i className="material-icons">{icon}</i>
      </div>
    </div>
  );
};

export default SummaryCard;
