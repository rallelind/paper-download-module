import { getResearchPaperPdf } from '../getResearchPaperPdf';
import { GetResearchPaperPdfInput } from '../../index';
import * as fs from 'fs';
import * as path from 'path';

describe('getResearchPaperPdf', () => {
  // Set longer timeout for network requests
  jest.setTimeout(30000);
  
  // Save original console.error
  const originalConsoleError = console.error;
  
  beforeEach(() => {
    // Silence console.error during tests
    console.error = jest.fn();
  });
  
  afterEach(() => {
    // Restore console.error after each test
    console.error = originalConsoleError;
  });

  it('should download a PDF from arXiv with /abs/ format', async () => {
    const input: GetResearchPaperPdfInput = {
      link: 'https://arxiv.org/abs/1706.03762' 
    };

    const referencePdfPath = path.join(__dirname, 'attention-is-all-you-need.pdf');
    const referencePdfBuffer = fs.readFileSync(referencePdfPath);
    const referencePdfBase64 = referencePdfBuffer.toString('base64');
    
    const result = await getResearchPaperPdf(input);
    
    expect(result.pdfContent).toBeTruthy();

    const fetchedBase64 = result.pdfContent;
    const fetchedSize = fetchedBase64.length;
    const referenceSize = referencePdfBase64.length;
    const sizeDifferencePercentage = Math.abs(fetchedSize - referenceSize) / referenceSize * 100;
    
    expect(sizeDifferencePercentage).toBeLessThan(5);
    
    // Optional: Save the fetched PDF for manual inspection
    // const fetchedBuffer = Buffer.from(fetchedBase64, 'base64');
    // const fetchedPdfPath = path.join(__dirname, 'fetched-attention-is-all-you-need.pdf');
    // fs.writeFileSync(fetchedPdfPath, fetchedBuffer);
    // console.log(`Saved fetched PDF to: ${fetchedPdfPath}`);
  });
}); 