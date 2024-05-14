export interface IEvent {
  _id: string;
  title: string;
  description: string;
  date: string;
  organizer: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFormData {
  fullName: string;
  email: string;
  birthDate: string;
  whereHear: string;
  event: string;
}

export interface IParticipant {
  _id: string;
  fullName: string;
  email: string;
  birthDate: string;
  whereHear: string;
  event: {
    _id: string;
    title: string;
  };
  createdAt: string;
  updatedAt: string;
}
