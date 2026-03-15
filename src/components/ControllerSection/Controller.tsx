import { sortOptions, statusOptions } from "../../constants/common";
import Button from "../common/Button";
import FilterTabs from "../common/FilterTabs";
import { SingleSelect } from "../common/SingleSelect";
import { MultiSelect } from "../common/MultiSelect";
import type { FilterStatus, SortOption } from "../../hooks/useTaskFilters";

interface ControllerSectionProps {
  onAddClick: () => void;
  filterStatus: FilterStatus;
  onFilterStatusChange: (status: FilterStatus) => void;
  sortBy: SortOption;
  onSortByChange: (sortBy: SortOption) => void;
  filterAssignees: string[];
  onFilterAssigneesChange: (assignees: string[]) => void;
  assigneeOptions: { label: string; value: string }[];
}

const ControllerSection = ({
  onAddClick,
  filterStatus,
  onFilterStatusChange,
  sortBy,
  onSortByChange,
  filterAssignees,
  onFilterAssigneesChange,
  assigneeOptions,
}: ControllerSectionProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <FilterTabs
        value={filterStatus}
        onChange={(val) => onFilterStatusChange(val as FilterStatus)}
        options={statusOptions}
      />
      <div className="flex gap-4">
        <div className="flex gap-4 z-[40]">
          <SingleSelect
            options={sortOptions}
            value={sortBy}
            onChange={(val) => onSortByChange(val as SortOption)}
            placeholder="Sort by..."
          />
          <div className="min-w-[200px]">
            <MultiSelect
              options={assigneeOptions}
              value={filterAssignees}
              onChange={(val) => onFilterAssigneesChange(val as string[])}
              placeholder="Filter Assignees..."
            />
          </div>
        </div>
        <Button
          variant="filled"
          icon={<i className="material-icons">add</i>}
          onClick={onAddClick}
        >
          Add New
        </Button>
      </div>
    </div>
  );
};

export default ControllerSection;
