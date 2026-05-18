
import { prisma } from "@/lib/prisma";
import { CgMenu } from "react-icons/cg";




const Home = async () => {
  // await prisma.test.create({
  //   data: {
  //     name: "Its working  DB connected"
  //   },
  // })

  // const tests = await prisma.test.findMany();
  return(
    <div>


        {/* {JSON.stringify(tests , null, 2)} */}
        {/* <h1>hi</h1> */}
    </div>
  )
}

export default Home;

