/** Divider whose pattern changes with the culture (see .culture-strip in globals.css). */
export default function CultureStrip({ className = '' }: { className?: string }) {
    return <div className={`culture-strip ${className}`} aria-hidden="true" />;
}
