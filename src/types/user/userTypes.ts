export type UserProfile = {
  name: string;
  email: string;
  bio: string;
  location: string;
  occupation: string;
  joined_date: string;
  avatar_url: string;
};

export type ProfileUpdateData = {
  name: string;
  email: string;
  bio?: string;
  location?: string;
  occupation?: string;
};
