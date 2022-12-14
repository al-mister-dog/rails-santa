import { Participant } from "../components/types";

// export function draw(participants: Participant[]) {
//   let selection = participants;
//   let recipients: string[] = [];
//   let result: any[] = [];

//   function findMutualSantas() {
//     for (let i = 0; i < result.length; i++) {
//       for (let j = 0; j < result.length; j++) {
//         if (
//           result[i].email === result[j].santa_for &&
//           result[j].email === result[i].santa_for
//         ) {
//           return [i, j];
//         }
//       }
//     }
//   }

//   selection.forEach((person) => {
//     const isntSelf = (p: any) => p.email !== person.email;
//     const hasntBeenChosen = (p: any) => recipients.includes(p.email) === false;
//     const available = selection.filter(isntSelf).filter(hasntBeenChosen);
//     const random = Math.floor(Math.random() * available.length);
//     const recipient = available[random];

//     if (recipient === undefined) {
//       const mutualSantas = findMutualSantas();

//       if (mutualSantas) {
//         result[mutualSantas[0]].santa_for = person.email;
//         result = [
//           ...result,
//           { ...person, santa_for: result[mutualSantas[1]].email },
//         ];
//       }
//     } else {
//       recipients = [...recipients, recipient.email];
//       result = [...result, { ...person, santa_for: recipient.email }];
//     }
//   });
//   return result;
// }

export function draw(participants: Participant[]) {
  function shuffleArray() {
    let deepCopy = JSON.parse(JSON.stringify(participants));
    return deepCopy.sort(() => Math.random() - 0.5);
  }

  const shuffledParticipants = shuffleArray();

  for (let i = 0; i < shuffledParticipants.length; i++) {
    if (i === shuffledParticipants.length - 1) {
      shuffledParticipants[i].santa_for = shuffledParticipants[0].email;
    } else {
      shuffledParticipants[i].santa_for = shuffledParticipants[i + 1].email;
    }
  }

  const reorderedParticipants: Participant[] = reOrderParticipants(
    participants,
    shuffledParticipants
  );

  return reorderedParticipants;
  // return shuffledParticipants;
}

function reOrderParticipants(
  originalParticipants: Participant[],
  shuffledParticipants: Participant[]
) {
  return originalParticipants.map((participant) => {
    const giver = shuffledParticipants.filter(
      (p: { email: string }) => p.email === participant.email
    );
    const receiver = giver[0].santa_for;
    return { ...participant, santa_for: receiver || "" };
  });
}
