import { useParams } from "react-router-dom";

function MarketGraph()
{
    const coin = useParams().coin;
    return <p>{coin}</p>;
}

export default MarketGraph;