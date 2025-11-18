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

const mockAchievements = [
  {
    id: "1",
    userId: "1",
    userName: "Dipesh Shrestha",
    title: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    dateObtained: "2024-01-15",
  },
  {
    id: "2",
    userId: "1",
    userName: "Dipesh Shrestha",
    title: "React Advanced Certificate",
    issuer: "Udemy",
    dateObtained: "2023-11-20",
  },
];

export default function AchievementsTable() {
  const [achievements, setAchievements] = useState(mockAchievements);

  const handleDelete = (id: string) => {
    setAchievements(achievements.filter((ach) => ach.id !== id));
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>User</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Issuer</TableHead>
            <TableHead>Date Obtained</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {achievements.map((achievement) => (
            <TableRow key={achievement.id} className="hover:bg-muted/50">
              <TableCell className="font-medium text-sm">
                {achievement.userName}
              </TableCell>
              <TableCell className="text-sm">{achievement.title}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {achievement.issuer}
              </TableCell>
              <TableCell className="text-sm">
                {achievement.dateObtained}
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
                      onClick={() => handleDelete(achievement.id)}
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
