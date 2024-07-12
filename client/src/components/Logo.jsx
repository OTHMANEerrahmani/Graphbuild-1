import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();
  return (
    <div
      className="flex  w-full justify-center"
      onClick={() => {
        navigate(`/`);
      }}
    >
      <img src="/Logo.svg" alt="Graphbuild" className="w-44 " />
    </div>
  );
}

export default Logo;
