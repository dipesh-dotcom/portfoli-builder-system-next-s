"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Edit2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockLanguages = [
  {
    id: "1",
    userId: "1",
    userName: "Dipesh Shrestha",
    name: "Nepali",
    proficiency: "Native",
  },
  {
    id: "2",
    userId: "1",
    userName: "Dipesh Shrestha",
    name: "English",
    proficiency: "Fluent",
  },
  {
    id: "3",
    userId: "1",
    userName: "Dipesh Shrestha",
    name: "Hindi",
    proficiency: "Intermediate",
  },
];

const proficiencyColors: Record<string, string> = {
  Native: "default",
  Fluent: "secondary",
  Intermediate: "outline",
  Beginner: "secondary",
};

export default function LanguagesTable() {
  const [languages, setLanguages] = useState(mockLanguages);

  const handleDelete = (id: string) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>User</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Proficiency</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {languages.map((lang) => (
            <TableRow key={lang.id} className="hover:bg-muted/50">
              <TableCell className="font-medium text-sm">
                {lang.userName}
              </TableCell>
              <TableCell className="text-sm">{lang.name}</TableCell>
              <TableCell>
                <Badge variant={proficiencyColors[lang.proficiency] as any}>
                  {lang.proficiency}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer">
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-destructive"
                      onClick={() => handleDelete(lang.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
