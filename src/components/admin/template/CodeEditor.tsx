"use client";

import type React from "react";

import { useState } from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CodeEditor({ value, onChange, placeholder }: CodeEditorProps) {
  const [lineCount, setLineCount] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    setLineCount(e.target.value.split("\n").length);
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-muted/50">
      <div className="flex">
        {/* Line numbers */}
        <div className="bg-muted px-4 py-3 text-muted-foreground text-sm font-mono select-none border-r border-border">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i + 1} className="h-6">
              {i + 1}
            </div>
          ))}
        </div>
        {/* Editor */}
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 bg-background text-foreground font-mono text-sm border-0 outline-0 resize-none"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
