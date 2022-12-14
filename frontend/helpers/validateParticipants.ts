import { Participant } from "../components/types";

function isValidEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function containsDuplicateEmails(participants: Participant[]) {
  const emails = participants.map((participant) => participant.email);
  const uniqueEmails = new Set(emails);
  if (emails.length !== uniqueEmails.size) {
    return true;
  }
  return false;
}
export function validParticipants(participants: Participant[]) {

  for (let i = 0; i < participants.length; i++) {
    if (!participants[i].email) {
      return {
        valid: false,
        message: "Oops! Someone's email is empty. Try again",
      };
    }

    if (!isValidEmail(participants[i].email)) {
      return {
        valid: false,
        message: "Oops! Someone's email is not valid. Try again",
      };
    }
  }

  if (containsDuplicateEmails(participants)) {
    return {
      valid: false,
      message: "Oops! Someone's email is duplicated. Try again",
    };
  }

  if (participants.length < 3) {
    return {
      valid: false,
      message: "Oops! You need at least 3 participants. Try again",
    };
  }

  return {valid: true, message: ""}
}
