import { ComputeModule } from "@palantir/compute-module";
import { Type } from "@sinclair/typebox";
import { getResearchPaperPdf } from "./research-paper-download/getResearchPaperPdf";

export interface GetResearchPaperPdfInput {
  link: string;
}

export interface GetResearchPaperPdfOutput {
  pdfContent: string;
  filename: string;
}

const myModule = new ComputeModule({
  logger: console,
  definitions: {
    getResearchPaperPdf: {
      input: Type.Object({
        link: Type.String(),
      }),
      output: Type.Object({
        pdfContent: Type.String(),
        filename: Type.String(),
      }),
    },
  },
});

myModule.register("getResearchPaperPdf", getResearchPaperPdf);
