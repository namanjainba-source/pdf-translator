const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class TranslationError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = 'TranslationError';
    this.statusCode = statusCode;
  }
}

export async function translateDocument(file: File, targetLang: string): Promise<{ blob: Blob; filename: string }> {
  
  // 1. Validate Configuration
  if (!API_BASE_URL) {
      throw new TranslationError("API Base URL is missing. Please check your .env file.", 0);
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('target_lang', targetLang); 

  try {
    const controller = new AbortController();
    // 5-minute timeout for large PDF processing
    const timeoutId = setTimeout(() => controller.abort(), 300000); 

    // 2. Send Request to Real Backend
    const response = await fetch(`${API_BASE_URL}/translate`, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    // 3. Handle Errors
    if (!response.ok) {
        if (response.status === 413) {
            throw new TranslationError('File is too large. Server limit exceeded.', 413);
        }
        // Attempt to read JSON error message from backend
        const errorData = await response.json().catch(() => ({}));
        throw new TranslationError(errorData.error || `Server Error (${response.status})`, response.status);
    }

    // 4. Handle Success Response
    const data = await response.json();
    
    if (data.download_url) {
        // The backend returns a URL; fetch the file content from it
        // Note: Ensure your Backend CORS settings allow this fetch if the URL is different
        const fileResponse = await fetch(data.download_url);
        
        if (!fileResponse.ok) {
            throw new TranslationError("Could not download the processed file.", fileResponse.status);
        }
        
        const blob = await fileResponse.blob();
        const filename = data.original_name ? `translated_${data.original_name}` : 'translated_document';
        
        return { blob, filename };
    } 
    
    throw new TranslationError("Server responded, but provided no download link.", 500);

  } catch (error: any) {
    console.error("Translation API Error:", error);

    if (error.name === 'AbortError') {
        throw new TranslationError('Request timed out. The file might be taking too long to process.', 408);
    }
    if (error instanceof TranslationError) {
        throw error;
    }
    throw new TranslationError('Network error. Unable to reach the backend server.', 0);
  }
}
