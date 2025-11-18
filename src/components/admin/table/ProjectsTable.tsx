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
import { MoreHorizontal, Trash2, Edit2, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockProjects = [
  {
    id: "1",
    userId: "1",
    userName: "Dipesh Shrestha",
    title: "Blood Bank Management System",
    description: "Web app using HTML, CSS, Bootstrap, PHP, MySQL",
    github_url: "https://github.com/blood-bank-project/blood-bank-project",
    demo_url: null,
  },
  {
    id: "2",
    userId: "1",
    userName: "Dipesh Shrestha",
    title: "Portfolio Builder System",
    description: "React (frontend) + Django REST Framework (backend)",
    github_url: "https://github.com/dipesh-dotcom/portfolio-builder",
    demo_url: "https://portfolio-builder.demo.com",
  },
];

export default function ProjectsTable() {
  const [projects, setProjects] = useState(mockProjects);

  const handleDelete = (id: string) => {
    setProjects(projects.filter((proj) => proj.id !== id));
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>User</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Links</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id} className="hover:bg-muted/50">
              <TableCell className="font-medium text-sm">
                {project.userName}
              </TableCell>
              <TableCell className="text-sm font-medium">
                {project.title}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                {project.description}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 hover:text-green-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
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
                      onClick={() => handleDelete(project.id)}
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
