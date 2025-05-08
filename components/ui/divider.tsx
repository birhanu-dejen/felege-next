export default function DividerWithText({ text }: { text: string }) {
  return (
    <div className="flex items-center my-6">
      <div className="flex-grow h-px bg-gray-300"></div>
      <span className="px-3 text-gray-500 text-sm">{text}</span>
      <div className="flex-grow h-px bg-gray-300"></div>
    </div>
  );
}
