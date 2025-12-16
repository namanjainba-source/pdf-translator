import React from 'react';
import Link from 'next/link';
export default function Terms() {
  return (
    <div className="p-10 max-w-3xl mx-auto bg-white shadow rounded">
        <Link href="/" className="text-blue-600 mb-4 block">&larr; Back</Link>
        <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
        <p>Service provided AS-IS. We are not responsible for translation accuracy.</p>
    </div>
  );
}
