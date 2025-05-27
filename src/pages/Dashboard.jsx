import Barchart from "../components/Barchart";
import DonutChart from "../components/DonutChart"

const Dashboard = () => {
  return (
    <>
      <section className="px-4 animate-slideRight">
        <h1 className="text-2xl font-bold pt-6 ">Welcome to the Dashboard</h1>
       <Barchart/>
       <DonutChart/>
      </section>
    </>
  );
};

export default Dashboard;
