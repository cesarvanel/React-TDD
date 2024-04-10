import { useHome } from "./useHome";

const HomeView = () => {
  const { timeline } = useHome();

  console.log(timeline);
  return <div>{timeline.timeline.type}</div>;
};

export default HomeView;
