import { Week } from "../types/types.ts";
import { useState, useRef, useEffect } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  //  click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleWeekSelect = (week: Week) => {
    onWeekChange(week);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-8 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Week</h3>

      {/* Dropdown Container with ref */}
      <div className="relative w-full" ref={dropdownRef}>
        {/* Dropdown Trigger/Selected Week Display */}
        <button
          onClick={toggleDropdown}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-between hover:border-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <div className="text-left flex-1 min-w-0">
            <div className="font-medium text-gray-900 truncate">
              {selectedWeek.title.split("-")[0]}
            </div>
            <div className="text-sm text-gray-500 truncate">
              {selectedWeek.words.length} words • {selectedWeek.title}
            </div>
          </div>
          {/* Custom CSS Arrow */}
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ml-3 shrink-0 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu when open */}
        {isOpen && (
          <div
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            role="listbox"
          >
            {weeks.map((week) => (
              <button
                key={week.id}
                onClick={() => handleWeekSelect(week)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0 ${
                  selectedWeek.id === week.id
                    ? "bg-blue-50 border-l-4 border-l-blue-600"
                    : ""
                }`}
                role="option"
                aria-selected={selectedWeek.id === week.id}
              >
                <div className="font-medium text-gray-900">
                  {week.title.split("-")[0]}
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-500">
                    {week.words.length} words
                  </span>
                  <span className="text-xs text-gray-400 truncate ml-2 max-w-30">
                    {week.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeekSelector;
