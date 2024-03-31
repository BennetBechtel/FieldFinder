import GymContainer from "../components/GymContainer";

const Home = () => {
  return (
    <div className="flex grow flex-row p-2 gap-2">
      <div className="w-[250px] bg-zinc-50 rounded-md hidden xl:inline">Sidebar</div>
      <div className="flex grow bg-zinc-50 rounded-md hidden xl:inline">
        <GymContainer />
      </div>
    </div>
  );
};

export default Home;
