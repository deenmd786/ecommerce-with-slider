import BannerSlider from "../components/BannerSlider";
import CategoryList from "../components/CategoryList";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div className=" min-w-full">
      <div>
      <CategoryList />
      </div>
      <div>
        <BannerSlider/>
      </div>
      
        <HorizontalCardProduct heading={"Top Airpods"} category={"airports"}/>
      
        <HorizontalCardProduct heading={"Popular Watches"} category={"watches"}/>
    
        <VerticalCardProduct heading={"Mobiles"} category={"mobiles"}/>
        <VerticalCardProduct heading={"Mouses"} category={"mouse"}/>
        <VerticalCardProduct heading={"Televisions"} category={"televisions"}/>
        <VerticalCardProduct heading={"Printers"} category={"printers"}/>
        <VerticalCardProduct heading={"Camera & PhotoGraphy"} category={"camera"}/>
        <VerticalCardProduct heading={"Refrigerator"} category={"refrigerator"}/>
        <VerticalCardProduct heading={"Trimmers"} category={"trimmers"}/>
        <VerticalCardProduct heading={"Wared Earphones"} category={"earphones"}/>
        <VerticalCardProduct heading={"Processor"} category={"processor"}/>
        <VerticalCardProduct heading={"Bluetooth Speakers"} category={"speakers"}/>
      
    </div>
  );
};

export default Home;
