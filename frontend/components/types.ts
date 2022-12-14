export interface Participant {
  id: string;
  santa_for: string;
  email: string;
  role: "Organizer" | "Participant";
  exclusions: string;
}
