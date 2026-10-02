type Step = {
  n: string;
  label: string;
};

type Y2kStepsProps = {
  current: 1 | 2 | 3;
  steps?: Step[];
};

const DEFAULT_STEPS: Step[] = [
  { n: "01", label: "Khung" },
  { n: "02", label: "Chụp" },
  { n: "03", label: "Decor" },
];

export function Y2kSteps({ current, steps = DEFAULT_STEPS }: Y2kStepsProps) {
  return (
    <ol aria-label="Tiến trình" className="flex w-auto max-w-xl items-center justify-end gap-2 sm:gap-4">
      {steps.map((step, index) => {
        const num = (index + 1) as 1 | 2 | 3;
        const active = num === current;
        const done = num < current;

        return (
          <li
            key={step.n}
            aria-current={active ? "step" : undefined}
            className={`flex items-center gap-1 whitespace-nowrap text-[9px] font-bold uppercase sm:gap-1.5 sm:text-xs ${
              active
                ? "text-black"
                : done
                  ? "text-zinc-700"
                  : "text-zinc-400"
            }`}
          >
            <span className={`font-mono ${active ? "text-pink-600" : "text-zinc-500"}`}>
              {step.n}
            </span>
            <span className={active ? "underline decoration-2 underline-offset-2" : ""}>
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
