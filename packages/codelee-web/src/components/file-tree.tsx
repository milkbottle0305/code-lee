"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileIcon, FolderIcon } from "lucide-react";

interface File {
  id: string;
  name: string;
  path: string;
}

interface FileTreeProps {
  files: File[];
  selectedFile: File | null;
  onSelectFile: (file: File) => void;
}

export default function FileTree({
  files,
  selectedFile,
  onSelectFile,
}: FileTreeProps) {
  // Group files by directory
  const filesByDirectory: Record<string, File[]> = {};

  files.forEach((file) => {
    const pathParts = file.path.split("/");
    const directory = pathParts.slice(0, -1).join("/");

    if (!filesByDirectory[directory]) {
      filesByDirectory[directory] = [];
    }

    filesByDirectory[directory].push(file);
  });

  return (
    <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
      <div className="p-3 border-b font-medium">파일 트리</div>
      <ScrollArea className="h-[600px]">
        <div className="p-2">
          {Object.entries(filesByDirectory).map(
            ([directory, directoryFiles]) => (
              <div key={directory} className="mb-2">
                <div className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  <FolderIcon className="h-4 w-4" />
                  {directory}
                </div>
                <div className="pl-4">
                  {directoryFiles.map((file) => (
                    <Button
                      key={file.id}
                      variant="ghost"
                      className={`w-full justify-start text-sm px-2 py-1 h-auto ${
                        selectedFile?.id === file.id
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100"
                          : ""
                      }`}
                      onClick={() => onSelectFile(file)}
                    >
                      <FileIcon className="h-4 w-4 mr-2" />
                      {file.name}
                    </Button>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
