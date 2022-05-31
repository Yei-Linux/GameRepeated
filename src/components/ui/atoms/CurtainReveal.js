import CurtainRevealBox from 'react-curtain-reveal'

const CurtainReveal = ({
  isRevealed = false,
  revealCheck = () => {},
  onReveal = () => {},
  onHide = () => {},
  children,
}) => {
  return (
    <CurtainRevealBox
      revealCheck={revealCheck}
      isRevealed={isRevealed}
      onReveal={onReveal}
      onHide={onHide}
      styleConfig={{
        curtain: {
          borderRadius: 0,
        },
        leftPanel: {
          background:
            'linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
        },
        rightPanel: {
          background:
            'linear-gradient(270deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
        },
        content: {
          backgroundColor: 'white',
        },
      }}
      animationConfig={{
        variant: 'linear',
        speed: 5,
      }}
    >
      {children}
    </CurtainRevealBox>
  )
}

export default CurtainReveal
