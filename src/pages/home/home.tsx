import HeaderCustom from "../../components/header/header";
import LapsInfo from "../../components/lapInfo/lapInfo";
import TrackConditions from "../../components/trackConditions/trackConditions";

const Home = () => {
  return (
    <div>
      <HeaderCustom />
      <LapsInfo />
      <TrackConditions />
    </div>
  );
};

export default Home;
