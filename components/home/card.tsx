'use client';
function Card({
  title,
  children,
  large,
}: {
  title: string;
  children?: React.ReactNode;
  large?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md ${
        large ? "col-span-2" : "col-span-1"
      } min-w-[425px] h-full`}
    >
      <div className="flex flex-col h-full">
        <div className="mx-auto max-w-md text-center p-4">
          <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
            {title}
          </h2>
        </div>
        <div className="p-4">
        {children}
        </div>
      </div>
    </div>
  );
}

export default Card;
