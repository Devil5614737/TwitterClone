interface FollowersI {
  displayName: string;
  photoURL: string;
  uid: string;
}
interface UnFollowersI {
  displayName: string;
  photoURL: string;
  uid: string;
}

export interface UserI {
  bio: string;
  cover: "";
  displayName: string;
  followers: FollowersI[];
  followings: UnFollowersI[];
  photoURL: string;
  uid: string;
  verified: boolean;
}

export interface DataI {
  bio: string;
  cover: "";
  displayName: string;
  followers: [];
  followings: [];
  photoURL: string;
  uid: string;
  verified: boolean;
}

export interface UsersI {
  id: string;
  data: DataI;
}
