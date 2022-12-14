import { Participant } from "../components/types";

export function setBody(participants: Participant[], budget: number) {
  const newParticipants = participants.map((p) => ({
    email: p.email,
  }));
  
  const santas = participants.map((p) => ({
    giver_id: p.email,
    receiver_id: p.santa_for,
  }));

  const params = {
    participants: newParticipants,
    santas: santas,
    budget: budget,
  };
  return params;
}
