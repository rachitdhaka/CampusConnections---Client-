export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div>
      <div
        className={
          className || " w-5xl   h-fit px-4  md:px-10 md:gap-10"
        }
      >
        {children}
      </div>
      
    </div>
  );
};
