/**
 * Triggers a file download in the browser given a Blob and a filename.
 * @param blob - The file content as a Blob object.
 * @param filename - The name to save the file as.
 */
export const triggerDownload = (blob: Blob, filename: string) => {
    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object to free memory
    // (A small timeout ensures the download starts before revoking)
    setTimeout(() => {
        window.URL.revokeObjectURL(url);
    }, 100);
};
