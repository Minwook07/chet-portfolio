import React from 'react';
export default function GlobalStyles() {
    return (
        <style jsx global>{`
      @keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0); } }
      .animate-float { animation: float 6s ease-in-out infinite; }
    `}</style>
    );
}