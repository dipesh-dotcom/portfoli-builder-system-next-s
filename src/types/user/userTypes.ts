export type ProfileFormValues = {
  name: string;
  email: string;
  bio: string;
  location: string;
  occupation: string;
  avatar_url?: string;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  bio: string;
  location: string;
  occupation: string;
  joined_date: string;
  avatar_url: string;
};
