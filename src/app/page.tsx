
import { prisma } from "@/lib/prisma";
import LoginComponent from "./components/LoginComp/LoginComponent";




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
        <LoginComponent/>
    </div>
  )
}

export default Home;

