import { selectProfileViewModel } from "./view/ProfileViewModel";
import { useAppSelector } from "../../../app/store/Store";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const param = useParams();
  const userId = param.userId as string;
  const timeline = useAppSelector(selectProfileViewModel(userId));

  console.log("timeline", timeline);
  return <div>profilePage</div>;
};

export default ProfilePage;
