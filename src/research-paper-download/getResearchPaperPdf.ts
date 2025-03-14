import { GetResearchPaperPdfInput, GetResearchPaperPdfOutput } from "../index";

export async function getResearchPaperPdf(
  input: GetResearchPaperPdfInput
): Promise<GetResearchPaperPdfOutput> {
  if (input.link.includes("arxiv.org")) {
    return downloadArxivPdf(input);
  }
  throw new Error("Unsupported link");
}

async function downloadArxivPdf(
  input: GetResearchPaperPdfInput
): Promise<GetResearchPaperPdfOutput> {
  try {
    const { link } = input;
    const pdfLink = link.includes(".pdf")
      ? link
      : `${link.replace("/abs/", "/pdf/")}.pdf`;

    const response = await fetch(pdfLink);

    if (!response.ok) {
      throw new Error(
        `Failed to download PDF: ${response.status} ${response.statusText}`
      );
    }

    const pdfBuffer = await response.arrayBuffer();
    const pdfBase64 = Buffer.from(pdfBuffer).toString("base64");

    return {
      pdfContent: pdfBase64,
      filename: `${link.split("/").pop()}.pdf`,
    };
  } catch (error) {
    console.error("Error downloading arXiv PDF:", error);
    throw new Error(
      `Failed to download arXiv PDF: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
