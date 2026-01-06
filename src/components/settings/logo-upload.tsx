'use client';

import { useState } from 'react';
import { uploadLogo, deleteLogo } from '@/lib/actions/logo';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function LogoUpload({ currentLogoUrl }: { currentLogoUrl?: string | null }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentLogoUrl || null);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await uploadLogo(formData);
      setPreview(result.logoUrl);
      alert('Logo uploaded successfully!');
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete the logo?')) return;

    setUploading(true);
    try {
      await deleteLogo();
      setPreview(null);
      alert('Logo deleted successfully!');
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      {preview && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <p className="text-sm font-medium text-gray-700 mb-2">Current Logo:</p>
          <div className="relative w-48 h-48 bg-white border rounded-lg overflow-hidden">
            <Image
              src={preview}
              alt="Company Logo"
              fill
              className="object-contain p-4"
            />
          </div>
          <Button
            type="button"
            variant="danger"
            onClick={handleDelete}
            disabled={uploading}
            className="mt-4"
          >
            Delete Logo
          </Button>
        </div>
      )}

      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {preview ? 'Upload New Logo' : 'Upload Logo'}
          </label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            required
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          <p className="mt-1 text-sm text-gray-500">
            PNG, JPG, GIF up to 2MB. Recommended: 500x200px
          </p>
        </div>

        <Button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Logo'}
        </Button>
      </form>
    </div>
  );
}
