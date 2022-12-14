import { Participant } from "../components/types";

export function validParticipants(participants: Participant[]) {
  for (let i = 0; i < participants.length; i++) {
    if (!participants[i].email) {
      return false;
    }
  }
  
  return participants.length >= 3 ? true : false;
}
