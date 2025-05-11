export default function FormWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center bg-white px-4 py-6 md:py-12">
      <div className="w-full max-w-md bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
}
