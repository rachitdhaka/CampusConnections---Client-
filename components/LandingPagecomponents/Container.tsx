export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={
        className ||
        "max-w-5xl mx-auto my-10 md:my-20 min-h-screen px-4 md:px-0"
      }
    >
      {children}
    </div>
  );
};
