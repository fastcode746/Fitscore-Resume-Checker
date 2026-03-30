import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useExtract } from '../../hooks/usePdfExtract';

const MAX_CHARS = 12000;

const ResumeUpload = React.memo(function ResumeUpload({ resumeText, onResumeTextChange, error }) {
  const [activeTab, setActiveTab] = useState('upload');
  const [pdfFile, setPdfFile] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { extracting, error: extractError, extractText } = useExtract();

  const isOver = resumeText.length > MAX_CHARS;

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors.some((e) => e.code === 'file-too-large')) {
        return;
      }
      return;
    }
    const file = acceptedFiles[0];
    if (!file) return;
    setPdfFile(file);
    const text = await extractText(file);
    if (text) {
      onResumeTextChange(text);
    }
  }, [extractText, onResumeTextChange]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: 5 * 1024 * 1024,
    maxFiles: 1,
  });

  const removePdf = useCallback((e) => {
    e.stopPropagation();
    setPdfFile(null);
    onResumeTextChange('');
    setPreviewOpen(false);
  }, [onResumeTextChange]);

  const fileTooLarge = fileRejections.some((r) =>
    r.errors.some((e) => e.code === 'file-too-large')
  );

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <section aria-label="Resume input" className="mt-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-3">
        {['upload', 'paste'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2 text-sm font-medium cursor-pointer transition-colors border-b-2 -mb-px"
            style={{
              borderColor: activeTab === tab ? '#0F6E56' : 'transparent',
              color: activeTab === tab ? '#0F6E56' : '#6B7280',
            }}
          >
            {tab === 'upload' ? 'Upload PDF' : 'Paste Text'}
          </button>
        ))}
      </div>

      {activeTab === 'upload' ? (
        <div>
          {!pdfFile ? (
            <div
              {...getRootProps()}
              className="rounded-lg border-2 border-dashed p-6 text-center cursor-pointer transition-colors"
              style={{
                borderColor: isDragActive ? '#0F6E56' : '#D1D5DB',
                backgroundColor: isDragActive ? '#F0FBF7' : '#FAFAFA',
              }}
            >
              <input {...getInputProps()} aria-label="Upload resume PDF" />
              <svg
                aria-hidden="true"
                className="mx-auto mb-3"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <rect x="8" y="4" width="24" height="32" rx="3" stroke="#9CA3AF" strokeWidth="2" />
                <path d="M14 14h12M14 20h12M14 26h7" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="30" cy="30" r="8" fill="#0F6E56" />
                <path d="M30 26v8M26 30h8" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <p className="text-sm text-gray-600">
                {isDragActive ? 'Drop your PDF here' : 'Drop your resume PDF here or click to browse'}
              </p>
              <p className="text-xs text-gray-400 mt-1">PDF only · Max 5 MB</p>
            </div>
          ) : extracting ? (
            <div className="rounded-lg border border-gray-200 p-4 flex items-center gap-3">
              <svg className="animate-spin" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="#E5E7EB" strokeWidth="2" />
                <path d="M10 2a8 8 0 018 8" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-sm text-gray-600">Extracting text...</span>
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="2" width="14" height="16" rx="2" stroke="#6B7280" strokeWidth="1.5" />
                    <path d="M7 7h6M7 10h6M7 13h3" stroke="#6B7280" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  <span className="text-sm text-gray-700 truncate">{pdfFile.name}</span>
                  <span className="text-xs text-gray-400 shrink-0">{formatSize(pdfFile.size)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" fill="#1D9E75" />
                    <path d="M5 8.5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <button
                    onClick={removePdf}
                    aria-label="Remove PDF"
                    className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {resumeText && (
                <div>
                  <button
                    onClick={() => setPreviewOpen((o) => !o)}
                    className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer underline underline-offset-2"
                  >
                    {previewOpen ? 'Hide preview' : 'Show text preview'}
                  </button>
                  {previewOpen && (
                    <p className="mt-1 text-xs text-gray-500 bg-gray-50 rounded p-2 leading-relaxed">
                      {resumeText.slice(0, 200)}…
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {(fileTooLarge || extractError) && (
            <p className="mt-2 text-xs" style={{ color: '#E24B4A' }}>
              {fileTooLarge ? 'File too large. Max size is 5 MB.' : extractError}
            </p>
          )}
        </div>
      ) : (
        <div className="relative">
          <textarea
            value={resumeText}
            onChange={(e) => onResumeTextChange(e.target.value)}
            rows={8}
            placeholder="Paste your resume as plain text..."
            aria-label="Resume text"
            aria-invalid={!!error || isOver}
            className="w-full resize-none rounded-lg border text-sm p-3 transition-colors outline-none"
            style={{
              borderColor: error || isOver ? '#E24B4A' : '#D1D5DB',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = error || isOver ? '#E24B4A' : '#0F6E56';
              e.target.style.boxShadow = `0 0 0 2px ${error || isOver ? 'rgba(226,75,74,0.2)' : 'rgba(15,110,86,0.2)'}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = error || isOver ? '#E24B4A' : '#D1D5DB';
              e.target.style.boxShadow = 'none';
            }}
          />
          <div
            className="absolute bottom-2 right-2 text-xs pointer-events-none"
            style={{ color: isOver ? '#E24B4A' : '#9CA3AF' }}
          >
            {resumeText.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
          </div>
        </div>
      )}

      {error && activeTab === 'paste' && (
        <p className="mt-1 text-xs" style={{ color: '#E24B4A' }}>
          {error}
        </p>
      )}
    </section>
  );
});

export default ResumeUpload;
