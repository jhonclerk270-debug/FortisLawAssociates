import React from 'react';

export const FloatingWhatsApp: React.FC = () => {
  const handleClick = () => {
    const text = encodeURIComponent(
      "Hello Fortis Law Associates. I would like to inquire about a legal consultation."
    );
    window.open(`https://wa.me/923080291021?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      aria-label="Contact Fortis Law Associates on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl shadow-emerald-950/50 hover:scale-110 active:scale-95 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-emerald-400/50 animate-bounce-short"
      title="Direct WhatsApp: 03080291021"
    >
      <svg className="w-8 h-8 fill-current group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
        <path d="M12.031 2c-5.417 0-9.829 4.411-9.829 9.829 0 1.73.452 3.414 1.309 4.902l-1.391 5.083 5.201-1.364c1.439.785 3.063 1.208 4.71 1.208 5.418 0 9.829-4.411 9.829-9.829 0-2.625-1.022-5.093-2.879-6.95-1.856-1.857-4.326-2.879-6.95-2.879zm5.952 14.126c-.252.712-1.253 1.306-1.724 1.388-.471.082-1.08.116-3.08-.687-2.399-.963-3.939-3.411-4.06-3.571-.121-.16-.972-1.295-.972-2.47 0-1.175.614-1.753.832-1.99.218-.237.476-.297.635-.297.159 0 .318.002.457.008.147.006.345-.056.54.412.198.476.675 1.644.735 1.764.06.12.1.26.02.418-.08.158-.12.257-.238.396-.119.139-.25.311-.357.418-.119.119-.244.248-.105.486.139.238.618 1.021 1.328 1.654.913.814 1.684 1.066 1.922 1.185.238.119.377.099.516-.06.139-.158.595-.694.753-.932.158-.238.318-.198.536-.119.218.079 1.388.654 1.626.773.238.119.397.178.456.277.059.1.059.575-.193 1.287z"/>
      </svg>
      <span className="sr-only">Contact via WhatsApp</span>
    </button>
  );
};
