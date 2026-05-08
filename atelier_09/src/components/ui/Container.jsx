export default function Container({ as: As = "div", className = "", children, ...props }) {
  return (
    <As
      className={`mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-10 lg:px-16 ${className}`}
      {...props}
    >
      {children}
    </As>
  );
}
