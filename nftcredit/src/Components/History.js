import { useEffect , useState} from "react";


export function History({walletAddress}){

    // const [nfts, setNfts] = useState([]);

    const fetchNFTs = () => {
        try{
        fetch(`https://api.covalenthq.com/v1/80001/address/${walletAddress}/balances_nft/?key=${process.env.NEXT_PUBLIC_COVALENT_APIKEY}`)
        .then(response => response.json())
        .then(data => console.log(data));
        } catch (err){
            console.log(err);
        }
    }

    fetchNFTs();

    // nfts.forEach(nft => {
    //     let htmlSegment = `<div class="nft">
    //     <img src="${user.profileURL}" />
    //     <h2>${user.firstName} ${user.lastName}</h2>
    //     <div class="email"><a href="email:${user.email}">${user.email}</a></div>
    // </div>`;

    // html += htmlSegment;
    // })

    // let container = document.querySelector('.container');
    // container.innerHTML = html;
}