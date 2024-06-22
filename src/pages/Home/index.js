import BarChart from "./components/BarChart";

const Home = () => {

    return <div>This is Home
        <br />
        <BarChart obj={{ title: '三大框架满意度', data: [10, 50, 80] }} />
        <BarChart obj={{ title: '三大框架使用度', data: [40, 60, 90] }} />
    </div >
}

export default Home;