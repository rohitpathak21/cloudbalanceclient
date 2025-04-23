import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'react-toastify';

const CopyBlock = ({ content, height = '200px', width = '100%', buttonPosition = 'top-right' }) => {
  const [copied, setCopied] = useState(false);
  const [toastShown, setToastShown] = useState(false); // ⬅️ to prevent spamming toast

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);

      if (!toastShown) {
        toast.success('Copied to clipboard!');
        setToastShown(true);
        setTimeout(() => setToastShown(false), 2000); // prevents spam within 2 seconds
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const positionClasses = {
    'right' : 'top-3 right-4',
    'top-right': 'top-2 right-2',
    'top-left': 'top-2 left-2',
    'bottom-right': 'bottom-2 right-2',
    'bottom-left': 'bottom-2 left-2',
  };

  return (
    <div
      className="relative bg-gray-900 text-white rounded-lg overflow-auto p-4"
      style={{ height, width }}
    >
      <pre className="whitespace-pre-wrap break-words">{content}</pre>
      <button
        onClick={handleCopy}
        className={`absolute ${positionClasses[buttonPosition]} bg-gray-700 hover:bg-gray-600 p-2 rounded transition-all`}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
};

export default CopyBlock;
