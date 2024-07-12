import ModelCanvas from "../../../canvas/Model";
import { styles } from "../../../styles";

const Hero = () => {
  return (
    <section
      id="Hero"
      className={`  py-8 flex flex-col items-center justify-center text-center my-4 space-y-8 h-screen snap-start`}
    >
      <div
        className={`h-full max-w-7xl mx-auto ${styles.paddingY} flex md:flex-row flex-col justify-center items-center md:space-x-8 md:space-y-0 space-y-4 `}
      >
        <div className="md:w-2/4 md:text-start px-4 ">
          <div className={`${styles.heroHeadText}  `}>
            Making Commerce Better for Everyone
          </div>
          <p className={`${styles.heroSubText}   `}>
            GraphBuild is supporting the next generation of entrepreneurs, the
            world’s biggest brands, and everyone in between
          </p>
        </div>
        <div className="md:w-2/4 md:h-full h-[350px]  flex justify-center items-center">
          <ModelCanvas />
        </div>
      </div>
    </section>
  );
};

export default Hero;
