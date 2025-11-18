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
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Edit2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockEducations = [
  {
    id: "1",
    userId: "1",
    userName: "Dipesh Shrestha",
    instituteName: "Everest College",
    degree: "Bachelor of Computer Application",
    startYear: 2021,
    endYear: 2025,
  },
  {
    id: "2",
    userId: "1",
    userName: "Dipesh Shrestha",
    instituteName: "Vsniketan College",
    degree: "SLC (+2)",
    startYear: 2019,
    endYear: 2021,
  },
  {
    id: "3",
    userId: "2",
    userName: "John Doe",
    instituteName: "State University",
    degree: "Bachelor of Science",
    startYear: 2020,
    endYear: null,
  },
];

export default function EducationsTable() {
  const [educations, setEducations] = useState(mockEducations);

  const handleDelete = (id: string) => {
    setEducations(educations.filter((edu) => edu.id !== id));
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>User</TableHead>
            <TableHead>Institute</TableHead>
            <TableHead>Degree</TableHead>
            <TableHead>Start Year</TableHead>
            <TableHead>End Year</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {educations.map((edu) => (
            <TableRow key={edu.id} className="hover:bg-muted/50">
              <TableCell className="font-medium text-sm">
                {edu.userName}
              </TableCell>
              <TableCell className="text-sm">{edu.instituteName}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {edu.degree}
              </TableCell>
              <TableCell className="text-sm">{edu.startYear}</TableCell>
              <TableCell className="text-sm">
                {edu.endYear || "Ongoing"}
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
                      onClick={() => handleDelete(edu.id)}
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
