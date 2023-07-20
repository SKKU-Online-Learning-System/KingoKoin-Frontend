import SKKU_EMBLEM from "../assets/skku_emblem_kor.png";

function Loader({ className }) {
  return (
    <div className={className}>
      <div className="flex w-full h-full justify-center items-center">
        <img
          src={SKKU_EMBLEM}
          alt="Loader"
          className="animate-spin w-16 h-16"
        />
      </div>
    </div>
  );
}

export default Loader;
