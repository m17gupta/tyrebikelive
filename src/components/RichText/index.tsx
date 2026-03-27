import React from "react";
import { cn } from "@/utilities/cn";

// RichText now renders serialized Lexical JSON using a simple traversal,
// without requiring @payloadcms/richtext-lexical.
type NodeType = {
  type: string;
  text?: string;
  children?: NodeType[];
  tag?: string;
  format?: number;
  url?: string;
};

function renderNode(node: NodeType, index: number): React.ReactNode {
  switch (node.type) {
    case "root":
      return <>{node.children?.map((child, i) => renderNode(child, i))}</>;
    case "paragraph":
      return (
        <p key={index}>
          {node.children?.map((child, i) => renderNode(child, i))}
        </p>
      );
    case "heading":
      const Tag = (node.tag as "h1" | "h2" | "h3" | "h4" | "h5" | "h6") || "h2";
      return (
        <Tag key={index}>
          {node.children?.map((child, i) => renderNode(child, i))}
        </Tag>
      );
    case "text":
      let content: React.ReactNode = node.text;
      // format bitmask: 1=bold, 2=italic, 4=strikethrough, 8=underline, 16=code
      if (node.format) {
        if (node.format & 1) content = <strong>{content}</strong>;
        if (node.format & 2) content = <em>{content}</em>;
        if (node.format & 16) content = <code>{content}</code>;
      }
      return <React.Fragment key={index}>{content}</React.Fragment>;
    case "link":
      return (
        <a key={index} href={node.url}>
          {node.children?.map((child, i) => renderNode(child, i))}
        </a>
      );
    case "listitem":
      return <li key={index}>{node.children?.map((child, i) => renderNode(child, i))}</li>;
    case "list":
      return node.tag === "ol" ? (
        <ol key={index}>{node.children?.map((child, i) => renderNode(child, i))}</ol>
      ) : (
        <ul key={index}>{node.children?.map((child, i) => renderNode(child, i))}</ul>
      );
    default:
      return node.children ? (
        <React.Fragment key={index}>
          {node.children.map((child, i) => renderNode(child, i))}
        </React.Fragment>
      ) : null;
  }
}

type Props = {
  data?: { root?: NodeType } | NodeType;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = false, data, ...rest } = props;

  if (!data) return null;

  const rootNode = (data as { root?: NodeType }).root ?? (data as NodeType);

  return (
    <div
      className={cn(
        {
          container: enableGutter,
          "max-w-none": !enableGutter,
          "prose md:prose-md dark:prose-invert mx-auto": enableProse,
        },
        className,
      )}
      {...rest}
    >
      {renderNode(rootNode, 0)}
    </div>
  );
}

