import GameForm from "../components/usecases/GameForm";
import ExerciseStore from "../store/context/Exercise/store";

const Home = () => {
  return (
    <ExerciseStore>
      <GameForm />
    </ExerciseStore>
  );
};

export default Home;
