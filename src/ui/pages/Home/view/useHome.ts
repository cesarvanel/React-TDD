import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store/Store";
import { selectHomeViewModel } from "./HomeViewModel";
import { GetAuthUserTimeLine } from "../../../../timeline/usecase/GetAuthUserTimeLine";

export const useHome = () => {
  const timeline = useAppSelector(selectHomeViewModel);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetAuthUserTimeLine());
  }, []);

  return {
    timeline,
  };
};
