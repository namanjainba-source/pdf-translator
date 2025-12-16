const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_BACKEND === 'true';

export class TranslationError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export async function translateDocument(file: File, targetLang: string): Promise<{ blob: Blob; filename: string }> {
  if (USE_MOCK) {
    console.warn("DEV PREVIEW: Using Mock Backend.");
    return new Promise((resolve) => {
      setTimeout(() => {
        const dummyContent = `[MOCK] Translated content for ${file.name}`;
        const blob = new Blob([dummyContent], { type: 'text/plain' });
        resolve({ blob, filename: `mock_${file.name}.txt` });
      }, 2000);
    });
  }

  if (!API_BASE_URL) throw new TranslationError("API Base URL not configured.", 0);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('target_lang', targetLang);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 300000);
    const response = await fetch(`${API_BASE_URL}/translate`, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
        if (response.status === 413) throw new TranslationError('File too large.', 413);
        throw new TranslationError(`Translation failed (Error ${response.status})`, response.status);
    }

    const disposition = response.headers.get('Content-Disposition');
    let filename = `translated_${file.name}`;
    if (disposition && disposition.indexOf('attachment') !== -1) {
      const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
      if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
    }

    const blob = await response.blob();
    return { blob, filename };
  } catch (error: any) {
    if (error.name === 'AbortError') throw new TranslationError('Request timed out.', 408);
    throw new TranslationError(error.message || 'Network error.', 0);
  }
}
