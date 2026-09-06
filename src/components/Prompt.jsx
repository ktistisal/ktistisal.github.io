export default function Prompt({ name = "guest", path = "~", text = "" }) {
  return (
    <span>
      <span className="text-secondary">{name}</span>
      <span>@</span>
      <span className="text-primary">ktistisal.github.io</span>
      <span>:</span>
      <span className="text-highlight">{path}</span>
      <span>$ </span>
      <span>{text}</span>
    </span>
  );
}
