import HeaderCompo from "../../components/main/header/HeaderCompo";

const Header = ({ getLogin }) => {
  return (
    <>
      <HeaderCompo getLogin={getLogin} />
    </>
  );
};

export default Header;
