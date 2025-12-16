import React from 'react';
import Link from 'next/link';
export default function Privacy() {
  return (
    <div className="p-10 max-w-3xl mx-auto bg-white shadow rounded">
        <Link href="/" className="text-blue-600 mb-4 block">&larr; Back</Link>
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p>Files are uploaded securely, processed for translation, and automatically deleted.</p>
    </div>
  );
}
