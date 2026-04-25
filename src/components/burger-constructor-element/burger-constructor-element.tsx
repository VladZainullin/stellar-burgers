import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import burgerSlice from '../../services/slices/burger';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(
        burgerSlice.actions.moveDown({
          index: index
        })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        burgerSlice.actions.moveUp({
          index: index
        })
      );
    };

    const handleClose = () => {
      dispatch(burgerSlice.actions.remove(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
