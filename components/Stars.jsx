export default function Stars() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <span
          key={i}
          className={`star star-${i + 1}`}
        />
      ))}
    </div>
  );
}