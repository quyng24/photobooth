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
    <ol className="flex w-full max-w-xl items-stretch gap-1.5 sm:gap-2">
      {steps.map((step, index) => {
        const num = (index + 1) as 1 | 2 | 3;
        const active = num === current;
        const done = num < current;

        return (
          <li
            key={step.n}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg border-2 border-black px-2 py-1 font-black text-[10px] sm:text-xs uppercase shadow-[2px_2px_0px_0px_#000] ${
              active
                ? "bg-pink-400 text-white"
                : done
                  ? "bg-cyan-300 text-black"
                  : "bg-white text-zinc-500"
            }`}
          >
            <span className="font-mono">{step.n}</span>
            <span>{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
