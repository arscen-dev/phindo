export type User = {
  sid: string;
  createdAt: Date;
  updatedAt: Date;
  email: string | null;
  name: string | null;
  phoneNumber: string | null;
  imageUrl: string | null;
};

export type UserDataInput = {
  email: string | null;
  name: string | null;
  phoneNumber: string | null;
  imageUrl: string | null;
};

export type UserDeleteInput = {
  sid: string;
};
