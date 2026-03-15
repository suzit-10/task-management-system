import SummaryCard from "../common/SummaryCard";
import type { Task } from "../../hooks/useTasks";

interface SummarySectionProps {
  tasks: Task[];
}

const SummarySection = ({ tasks = [] }: SummarySectionProps) => {
  const newTasks = tasks?.filter((t) => t.status === "new").length;
  const inProgressTasks = tasks?.filter(
    (t) => t.status === "in-progress",
  ).length;
  const blockedTasks = tasks?.filter((t) => t.status === "blocked").length;
  const doneTasks = tasks?.filter((t) => t.status === "done").length;

  return (
    <div className="flex justify-around gap-4">
      <SummaryCard
        title="New Tasks"
        icon="fiber_new"
        count={newTasks}
        summaryCardClassName="bg-green-200"
      />
      <SummaryCard
        title="In Progress"
        icon="pending_actions"
        count={inProgressTasks}
        summaryCardClassName="bg-yellow-200"
      />
      <SummaryCard
        title="Blocked Tasks"
        icon="block"
        count={blockedTasks}
        summaryCardClassName="bg-red-200"
      />
      <SummaryCard
        title="Done Tasks"
        icon="check_circle"
        count={doneTasks}
        summaryCardClassName="bg-green-200"
      />
    </div>
  );
};

export default SummarySection;
