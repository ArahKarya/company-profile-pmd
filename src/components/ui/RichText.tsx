import { Fragment, type ReactNode } from "react";

/**
 * Renders `**bold**` spans inside a content string as <b>, leaving everything else as text.
 *
 * Content files are plain data, so this is the one place where a marker is interpreted.
 * Deliberately limited to bold: headlines need emphasis, and anything richer belongs in a
 * component rather than in a copy string.
 */
export function RichText({ children }: { readonly children: string }): ReactNode {
  return children.split(/\*\*(.+?)\*\*/g).map((part, index) =>
    // Odd indices are the captured groups, i.e. the emphasised fragments.
    index % 2 === 1 ? <b key={index}>{part}</b> : <Fragment key={index}>{part}</Fragment>,
  );
}

/** A multi-line headline: one array entry per visual line. */
export function Headline({
  lines,
  as: Tag = "h1",
  className,
}: {
  readonly lines: readonly string[];
  readonly as?: "h1" | "h2" | "h3" | "h4";
  readonly className?: string;
}) {
  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <Fragment key={line}>
          {index > 0 && <br />}
          <RichText>{line}</RichText>
        </Fragment>
      ))}
    </Tag>
  );
}
