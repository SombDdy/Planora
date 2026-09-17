import {
  ChevronDown,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type DropdownOption = {
  value: string;
  label: string;
  indicatorClass?: string;
  icon?: ReactNode;
};

type DropdownProps = {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  onClose?: () => void;
};

export function Dropdown({
  value,
  options,
  onChange,
  onClose,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (option) => option.value === value,
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, [onClose]);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative w-fit"
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex min-w-32 items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      >
        <div className="flex items-center gap-2">
          {selectedOption?.icon}

          {selectedOption?.indicatorClass && (
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${selectedOption.indicatorClass}`}
            />
          )}

          <span>{selectedOption?.label}</span>
        </div>

        <ChevronDown
          size={16}
          className={`shrink-0 text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-full overflow-hidden rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className="flex w-full items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
            >
              {option.icon}

              {option.indicatorClass && (
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${option.indicatorClass}`}
                />
              )}

              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
