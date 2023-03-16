//our-domain.com/
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPs = [
//   {
//     id: "m1",
//     title: "A FIRST MEETUP",
//     image: "https://picsum.photos/200/300",
//     address: "some address 5, 12345 city",
//     description: "This is our 1st meetup",
//   },
//   {
//     id: "m2",
//     title: "A Second MEETUP",
//     image: "https://picsum.photos/200/299",
//     address: "some address 12, 12345 city",
//     description: "This is our 2nd meetup",
//   },
// ];

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Next Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active react meetups!"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   //fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPs,
//     },
//   };
// }

export async function getStaticProps() {
  //fetch data from an API

  const client = await MongoClient.connect(
    "mongodb+srv://shahzadnoo:kYIfVF4lAE2xm4Hr@cluster0.liyedji.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
