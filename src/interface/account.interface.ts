export interface registerMockInterface {
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
  setting: { avatar: string; statusMessage: string };
}

export interface accountAddInterface {
  userName: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  avatar?: string;
  statusMessage?: string;
}
