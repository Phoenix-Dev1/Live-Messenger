import MeetingClient from "./components/MeetingClient";

interface IParams {
  roomId: string;
}

const MeetingPage = async ({ params }: { params: IParams }) => {
  const { roomId } = params;

  return (
    <div className="h-full">
      <MeetingClient roomId={roomId} />
    </div>
  );
};

export default MeetingPage;
