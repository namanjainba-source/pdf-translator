import os
import time
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename

# --- Configuration ---
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'docx', 'pptx', 'txt'}

app = Flask(__name__)

# Enable CORS (Cross-Origin Resource Sharing)
# This allows your Frontend (running on a different port) to talk to this Backend
CORS(app)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    """
    Check if the file has an allowed extension.
    """
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# --- Routes ---

@app.route('/health', methods=['GET'])
def health():
    """
    Simple health check endpoint to verify the backend is running.
    """
    return jsonify({"status": "ok", "service": "Document Translator API"})

@app.route('/translate', methods=['POST'])
def translate():
    """
    Handle file upload and translation request.
    """
    # 1. Validation: Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    # 2. Validation: Check if a file was actually selected
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # 3. Validation: Check file extension & Save
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # 4. Mock AI Processing
        # In a real app, you would send 'filepath' to a translation service here.
        # We simulate a delay to mimic processing time.
        time.sleep(2)

        # 5. Return Response
        # We return a download URL pointing to the *same* file (Mock behavior)
        return jsonify({
            "message": "Translation successful",
            "original_name": filename,
            "download_url": f"{request.host_url}download/{filename}"
        }), 200
    
    return jsonify({'error': 'Invalid file type. Only PDF, DOCX, PPTX, TXT allowed.'}), 400

@app.route('/download/<filename>', methods=['GET'])
def download(filename):
    """
    Serve the processed file for download.
    """
    try:
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)
    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404

if __name__ == '__main__':
    # Run the application
    # debug=True allows auto-reload on code changes
    app.run(debug=True, port=5000)
