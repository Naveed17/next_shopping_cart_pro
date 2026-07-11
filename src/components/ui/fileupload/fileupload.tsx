import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Upload, Check, AlertCircle, X } from 'lucide-react';

interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  onFileSelect: (files: File | File[]) => void;
  onFileRemove?: (index?: number) => void;
  previews?: string[];
  fileNames?: string[];
  fileSizes?: string[];
  className?: string;
  placeholder?: string;
  description?: string;
  error?: string;
  loading?: boolean;
  success?: boolean;
}

export default function FileUpload({
  accept = '.png,.jpg,.jpeg',
  maxSize = 1024 * 1024,
  multiple = false,
  onFileSelect,
  onFileRemove,
  previews = [],
  fileNames = [],
  fileSizes = [],
  className = '',
  placeholder = 'Click to upload or drag & drop',
  description = 'PNG/JPG format, max 1MB',
  error,
  loading,
  success,
}: FileUploadProps) {
  const [uploadProgress, setUploadProgress] = useState(0);

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      return `File size must be less than ${maxSizeMB}MB`;
    }

    const allowedTypes = accept.split(',').map(type => {
      if (type.startsWith('.')) {
        return `image/${type.slice(1)}`;
      }
      return type;
    });

    if (!allowedTypes.some(type => file.type.includes(type.replace('image/', '')))) {
      return `Please upload a ${accept.replace(/\./g, '').toUpperCase()} file`;
    }

    return null;
  };

  const onDrop = (acceptedFiles: File[]) => {
    const validFiles: File[] = [];

    for (const file of acceptedFiles) {
      const validationError = validateFile(file);
      if (!validationError) {
        validFiles.push(file);
      }
    }

    if (validFiles.length > 0) {
      if (previews.length === 0) {
        setUploadProgress(0);
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + Math.random() * 30;
          });
        }, 100);
      }

      onFileSelect(multiple ? validFiles : validFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: accept.split(',').reduce((acc, type) => {
      if (type.startsWith('.')) {
        acc[`image/${type.slice(1)}`] = [type];
      } else {
        acc[type] = [];
      }
      return acc;
    }, {} as Record<string, string[]>),
    maxSize,
    multiple,
  });



  const getUploadAreaClasses = (): string => {
    let classes = 'border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all duration-200 bg-gray-50/50 dark:bg-gray-800/50 ';

    if (isDragActive) {
      classes += 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 scale-[1.02] ';
    } else if (isDragReject || error) {
      classes += 'border-red-500 bg-red-50/50 dark:bg-red-900/20 ';
    } else if (previews.length > 0) {
      classes += 'border-green-500 bg-green-50/50 dark:bg-green-900/20 ';
    } else {
      classes += 'border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50/20 dark:hover:bg-blue-900/20 ';
    }

    return classes + className;
  };

  return (
    <div className="space-y-4">
      <div {...getRootProps()} className={getUploadAreaClasses()}>
        <input {...getInputProps()} />
        <div className="flex space-x-3 items-center justify-center text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{placeholder}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{description}</p>
            {multiple && (
              <p className="text-xs text-blue-600 dark:text-blue-400">You can select multiple files</p>
            )}
          </div>
        </div>

        {loading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
              <div
                className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {success && (
          <div className="flex items-center justify-center text-green-600 dark:text-green-400 text-sm mt-2">
            <Check size={16} className="mr-2" />
            Upload successful!
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center text-red-600 dark:text-red-400 text-sm mt-2">
            <AlertCircle size={16} className="mr-2" />
            {error}
          </div>
        )}
      </div>

      {previews.length > 0 && (
        <div className="space-y-3">
          <div className={`grid gap-3 ${multiple ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 max-w-xs'}`}>
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />

                </div>
                {fileNames[index] && (
                  <div className="mt-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 flex items-center justify-between">
                    <div className="text-left flex-1 min-w-0 me-6">
                      <div
                        className="font-medium text-gray-900 dark:text-white text-xs truncate"
                        title={fileNames[index]}
                      >
                        {fileNames[index]}
                      </div>
                      {fileSizes[index] && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {fileSizes[index]}
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2 flex-shrink-0">

                      {onFileRemove && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onFileRemove(multiple ? index : undefined);
                          }}
                          className="px-3 py-1 text-xs bg-red-100 dark:bg-red-900/50 hover:bg-red-200 dark:hover:bg-red-900/70 text-red-700 dark:text-red-400 rounded-md transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}