import CurtainReveal from '../components/ui/atoms/CurtainReveal'
import GameLayout from '../components/usecases/GameLayout'
import ExerciseStore from '../store/context/Exercise/store'

const Home = () => {
  return (
    <ExerciseStore>
      <CurtainReveal revealCheck={() => true} isRevealed={false}>
        <GameLayout />
      </CurtainReveal>
    </ExerciseStore>
  )
}

export default Home
