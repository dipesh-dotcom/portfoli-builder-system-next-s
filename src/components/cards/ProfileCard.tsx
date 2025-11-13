"use client";

import React from "react";
import { Mail, MapPin, Briefcase, Calendar, Camera } from "lucide-react";
import { UserProfile } from "@/types/user/userTypes";
import Image from "next/image";

type ProfileCardProps = {
  profile: UserProfile;
  onAvatarClick?: () => void;
};

export function ProfileCard({ profile, onAvatarClick }: ProfileCardProps) {
  return (
    <div className="relative bg-card border border-border rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <div className="shrink-0 relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-card">
          <Image
            src={profile?.avatar_url || "/placeholder.svg"}
            alt={profile?.name || "profile"}
            height={500}
            width={500}
            className="w-full h-full object-cover"
          />
          <div
            onClick={onAvatarClick}
            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer bg-black/30 rounded-full"
          >
            <Camera className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {profile?.name}
            </h2>
            <p className="text-muted-foreground mt-1">{profile?.bio}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ProfileField
              icon={<Mail className="w-4 h-4 text-primary" />}
              label={profile?.email}
            />
            <ProfileField
              icon={<MapPin className="w-4 h-4 text-secondary" />}
              label={profile?.location}
            />
            <ProfileField
              icon={<Briefcase className="w-4 h-4 text-primary" />}
              label={profile?.occupation}
            />
            <ProfileField
              icon={<Calendar className="w-4 h-4 text-secondary" />}
              label={`Joined ${new Date(
                profile?.joined_date
              ).toLocaleDateString()}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="p-1.5 bg-primary/10 rounded-lg">{icon}</div>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
