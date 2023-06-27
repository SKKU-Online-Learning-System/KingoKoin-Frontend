import SKKU_EMBLEM from "../assets/skku_emblem_kor.png";

function Loader() {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <img src={SKKU_EMBLEM} alt="Loader" className="animate-spin w-16 h-16" />
    </div>
  );
}

export default Loader;
