import Lottie from 'lottie-react';
import loader from '../lotties/loader.json';
import circleLoader from '../lotties/circleLoader.json';

const Loader = ({ type }) => {
  return (
    <div>
      {type === "square" && <Lottie animationData={loader} loop={true} />}
      {type === "circle" && <Lottie animationData={circleLoader} loop={true} style={{ width: 40, height: 20 }} />}
    </div>
  )
}

export default Loader
