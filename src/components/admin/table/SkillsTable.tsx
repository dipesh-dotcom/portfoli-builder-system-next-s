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

const mockSkills = [
  {
    id: "1",
    userId: "1",
    userName: "Dipesh Shrestha",
    skillName: "React.js",
    rating: 4.5,
  },
  {
    id: "2",
    userId: "1",
    userName: "Dipesh Shrestha",
    skillName: "Node.js",
    rating: 4.0,
  },
  {
    id: "3",
    userId: "1",
    userName: "Dipesh Shrestha",
    skillName: "PostgreSQL",
    rating: 3.8,
  },
];

export default function SkillsTable() {
  const [skills, setSkills] = useState(mockSkills);

  const handleDelete = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>User</TableHead>
            <TableHead>Skill Name</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills.map((skill) => (
            <TableRow key={skill.id} className="hover:bg-muted/50">
              <TableCell className="font-medium text-sm">
                {skill.userName}
              </TableCell>
              <TableCell className="text-sm">{skill.skillName}</TableCell>
              <TableCell className="text-sm">
                <div className="flex items-center gap-2">
                  <span>{skill.rating.toFixed(1)}</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 w-2 rounded-full ${
                          i < Math.floor(skill.rating)
                            ? "bg-accent"
                            : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
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
                      onClick={() => handleDelete(skill.id)}
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
