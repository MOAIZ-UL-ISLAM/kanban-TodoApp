import MainContainer from "./components/MainContainer";

export default function Home() {
  return (

    <div className="px-28 my-10 bg-amber-300">
      <h1 className="font-bold text-3xl"> Kanban Board</h1>
      <div>
        <MainContainer />
      </div>
    </div>
  );
}
