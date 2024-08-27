import { forwardRef, useImperativeHandle, useRef } from 'react';
const ResultModal = forwardRef(
   ({ targetTime, remainingTime, onReset }, ref) => {
      const userLost = remainingTime <= 0;
      const formatedRemainingTime = (remainingTime / 1000).toFixed(2);
      const dialog = useRef();
      const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
      useImperativeHandle(ref, () => {
         return {
            open() {
               dialog.current.showModal();
            },
         };
      });
      return (
         <dialog className='result-modal' ref={dialog} onClose={onReset}>
            {userLost && <h2>You Lost!</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>
               The target Time was <strong>{targetTime} seconds.</strong>
            </p>
            <p>
               You stopped the Timer with{' '}
               <strong>{formatedRemainingTime} Seconds left.</strong>
            </p>
            <form method='dialog' onSubmit={onReset}>
               <button>Close</button>
            </form>
         </dialog>
      );
   }
);

export default ResultModal;
