import { useHome } from "./useHome";

const HomeView = () => {
  const { timeline } = useHome();

  return <div>{timeline.timeline.type}</div>;
};

export default HomeView;
