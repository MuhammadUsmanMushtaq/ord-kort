import { Week } from "../types/types.ts";

interface WeekSelectorProps {
  weeks: Week[];
  selectedWeek: Week;
  onWeekChange: (week: Week) => void;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({
  weeks,
  selectedWeek,
  onWeekChange,
}) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 mb-8 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Week</h3>
      <div className="flex  flex-wrap gap-3">
        {weeks.map((week) => (
          <button
            key={week.id}
            className={`px-5 py-3 rounded-lg font-medium transition-all duration-200 ${
              selectedWeek.id === week.id
                ? "bg-blue-600 text-white shadow-md transform -translate-y-1"
                : "bg-white text-gray-700 border border-gray-200 hover:border-blue-400 hover:shadow-sm"
            }`}
            onClick={() => onWeekChange(week)}
          >
            <div className="font-semibold">{week.title.split("-")[0]}</div>
            <div className="text-xs opacity-80">{week.words.length} words</div>
          </button>
        ))}
      </div>

      {selectedWeek && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h4 className="font-medium text-blue-800">{selectedWeek.title}</h4>
          <p className="text-sm text-blue-600 mt-1">
            {selectedWeek.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default WeekSelector;
