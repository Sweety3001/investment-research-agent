"use client";

interface ExportPdfButtonProps {
  onExport: () => void;
}

export default function ExportPdfButton({
  onExport,
}: ExportPdfButtonProps) {
  return (
    <button
      onClick={onExport}
      className="
        rounded-2xl
        bg-indigo-600
        px-6
        py-3
        text-white
        font-semibold
        hover:bg-indigo-500
        transition-all
      "
    >
      Export Report PDF
    </button>
  );
}