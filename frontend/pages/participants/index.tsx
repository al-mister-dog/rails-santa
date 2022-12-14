import Link from "next/link";

export default function ParticipantsIndexPage({ data }: { data: any }) {
  return (
    <div>
      <h1>Participants Index Page</h1>
      <ul>
        {data.map((participant: any) => (
          <Link key={participant.id} href={`participants/${participant.id}`}>
            <li>{participant.email}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/participants");
  const data = await response.json();
  if (data) {
    return {
      props: {
        data,
      },
    };
  } else {
    return {
      props: {
        data: null,
      },
    };
  }
}
