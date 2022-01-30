import HeaderCompo from "../../components/main/header/HeaderCompo";

const Header = ({ login, getLogin }) => {
  return (
    <>
      <HeaderCompo getLogin={getLogin} login={login} />
    </>
  );
};

export default Header;
