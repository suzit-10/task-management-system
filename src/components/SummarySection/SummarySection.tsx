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
        iconBgColor="green"
      />
      <SummaryCard
        title="In Progress"
        icon="pending_actions"
        count={inProgressTasks}
        iconBgColor="yellow"
      />
      <SummaryCard
        title="Blocked Tasks"
        icon="block"
        count={blockedTasks}
        iconBgColor="red"
      />
      <SummaryCard
        title="Done Tasks"
        icon="check_circle"
        count={doneTasks}
        iconBgColor="green"
      />
    </div>
  );
};

export default SummarySection;
