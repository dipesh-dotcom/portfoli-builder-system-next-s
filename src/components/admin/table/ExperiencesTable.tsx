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

const mockExperiences = [
  {
    id: "1",
    userId: "1",
    userName: "Dipesh Shrestha",
    companyName: "Tech Startup",
    position: "Full Stack Developer",
    startYear: 2023,
    endYear: null,
    description: "Building web applications with React and Node.js",
  },
  {
    id: "2",
    userId: "2",
    userName: "John Doe",
    companyName: "Software Company",
    position: "Junior Developer",
    startYear: 2022,
    endYear: 2023,
    description: "Frontend development with React",
  },
];

export default function ExperiencesTable() {
  const [experiences, setExperiences] = useState(mockExperiences);

  const handleDelete = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>User</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Start Year</TableHead>
            <TableHead>End Year</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {experiences.map((exp) => (
            <TableRow key={exp.id} className="hover:bg-muted/50">
              <TableCell className="font-medium text-sm">
                {exp.userName}
              </TableCell>
              <TableCell className="text-sm">{exp.companyName}</TableCell>
              <TableCell className="text-sm">{exp.position}</TableCell>
              <TableCell className="text-sm">{exp.startYear}</TableCell>
              <TableCell className="text-sm">
                {exp.endYear || "Current"}
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
                      onClick={() => handleDelete(exp.id)}
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
