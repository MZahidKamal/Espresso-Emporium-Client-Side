import Banner from "../../Components/Banner/Banner.jsx";
import BannerBottom from "../../Components/BannerBottom/BannerBottom.jsx";
import PopularProducts from "../../Components/PopularProducts/PopularProducts.jsx";
import FollowUsNow from "../../Components/FollowUsNow/FollowUsNow.jsx";

const HomeLayout = () => {
    return (
        <div>
            <Banner></Banner>
            <BannerBottom></BannerBottom>
            <PopularProducts></PopularProducts>
            <FollowUsNow></FollowUsNow>
        </div>
    );
};

export default HomeLayout;
