import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportReportPdf(
  elementId: string,
  fileName: string
) {
  const element =
    document.getElementById(elementId);

  if (!element) return;

  const canvas =
    await html2canvas(element, {
      scale: 2,
      backgroundColor: "#020617",
    });

  const image =
    canvas.toDataURL("image/png");

  const pdf = new jsPDF(
    "p",
    "mm",
    "a4"
  );

  const width =
    pdf.internal.pageSize.getWidth();

  const height =
    (canvas.height * width) /
    canvas.width;

  pdf.addImage(
    image,
    "PNG",
    0,
    0,
    width,
    height
  );

  pdf.save(
    `${fileName}-report.pdf`
  );
}