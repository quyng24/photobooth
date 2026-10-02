type Y2kWindowProps = {
  title: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  frameFromSm?: boolean;
};

export function Y2kWindow({
  title,
  badge,
  children,
  className = "",
  bodyClassName = "",
  frameFromSm = false,
}: Y2kWindowProps) {
  const frameClassName = frameFromSm
    ? "sm:bg-white sm:border-4 sm:border-black sm:rounded-2xl sm:shadow-[6px_6px_0px_0px_#000] sm:overflow-hidden"
    : "bg-white border-3 sm:border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_#000] overflow-hidden";

  return (
    <div
      className={`${frameClassName} flex flex-col min-h-0 ${className}`}
    >
      <div className={`${frameFromSm ? "hidden sm:flex" : "flex"} bg-black text-white px-3 py-1.5 items-center justify-between border-b-3 border-black shrink-0`}>
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="w-2.5 h-2.5 rounded-full bg-pink-500 border border-white shrink-0" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-white shrink-0" />
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 border border-white shrink-0" />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-gray-300 ml-1.5 truncate">
            {title}
          </span>
        </div>
        {badge ? <div className="shrink-0 ml-2">{badge}</div> : null}
      </div>
      <div className={`min-h-0 flex-1 ${bodyClassName}`}>{children}</div>
    </div>
  );
}
