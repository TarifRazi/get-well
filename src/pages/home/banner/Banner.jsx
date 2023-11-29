import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import img1 from '../../../assets/adhy-savala-zbpgmGe27p8-unsplash.jpg'
import img2 from '../../../assets/arseny-togulev-DE6rYp1nAho-unsplash.jpg'
import img3 from '../../../assets/jonathan-borba-v_2FRXEba94-unsplash.jpg'

const Banner = () => {


  const [sliderRef] = useKeenSlider()

  return (
    <div ref={sliderRef} className="keen-slider ">
      <div className="keen-slider__slide"><img className='' src={img1} alt="" /></div>
      <div className="keen-slider__slide"><img className='' src={img2} alt="" /></div>
      <div className="keen-slider__slide"><img className='' src={img3} alt="" /></div>
      <div className="keen-slider__slide"><img className='' src={img1} alt="" /></div>
    </div>
  );
};

export default Banner;