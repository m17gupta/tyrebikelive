import PageTemplate, { generateMetadata } from "./[slug]/page";
import HomePage from "./home/page";

export const dynamic = "force-dynamic";

// export default PageTemplate;

// export { generateMetadata };


const Home=()=>{
return(
     <HomePage/>
)
 
}

export default Home