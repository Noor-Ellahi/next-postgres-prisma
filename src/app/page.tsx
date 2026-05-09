
import { prisma } from "@/lib/prisma";

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
    </div>
  )
}

export default Home;

