import dbConnect from "../../lib/dbConnect";
import Meta from '../../models/Meta'
import Collection from '../../models/Collection'


import _ from 'lodash'
import axios from 'axios'
import Marketplace from "../../models/Marketplace";

export default async function handler(req, res) {
  console.log('GET: /api/get_unstaked_monkeys')
  const db = await dbConnect()
  const skip = 0
  console.log(req.query)

  try {
    let total = 50
    let dataArr = []
    
    let getData = async (offset) => {
        const nft = await axios.get(`https://stacks-node-api.mainnet.stacks.co/extended/v1/address/${req.query.principal}/nft_events?limit=50&offset=${offset}`)
      //console.log(nft.data)
      total = nft.data.total;
      dataArr = [...dataArr, ...nft.data.nft_events]
    }
      
    for(let i = 0; i <= total; i+=50){
        await getData(i)
    }

    let NewDataArr = await dataArr.filter(i => i.asset_identifier.endsWith("mutant-monkeys") == true)
    console.log("NewDataArr",NewDataArr)

    const pendingTransactions = await axios.get(`https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/mempool?sender_address=${req.query.principal}`)

    // console.log("pendingTransactions",pendingTransactions.data.results)

    // let pendingTrans = []

    // pendingTransactions.data.results.forEach((i)=>{
    //     if (i.tx_status == "pending") {
    //         pendingTrans.push({
    //             token_id: i.post_conditions[0].asset_value.repr,
    //             function: i.contract_call.function_name
    //         })
    //     }
    // })

    
    

    //console.log(dataArr)
    let newArr = NewDataArr.map(i => {
      
      let splits = i.asset_identifier.split(/[.:]/g)
      return {
        // contract_key: `${splits[0]}.${splits[1]}`,
        // for testing
        contract_key: 'SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7.mutant-monkeys',
        token_id: Number(i.value.repr.slice(1))
      }
    }).filter(i => {
        return i.token_id? true : false
    })
    let nftArr = []
    // console.log("newArr",newArr)
    
    if(newArr.length > 0){
      nftArr = await Meta.find({$or: newArr}).populate('collection_id')
    } 
    
    let market = await Meta.find({list_seller: req.query.principal}).populate('collection_id')
    
    let NewMarket = await market.filter(i => i.contract_key.endsWith("bitcoin-monkeys") == true)
    let nftList = _.uniqBy([...nftArr,...NewMarket], (i) => { 
        return `${i.contract_key}.${i.token_id}`
    })

    let bananaPerDay = 2
    let totalBGR = 0
    let nftListBGR = []

    nftList.forEach((m, idx)=>{
      let nftBGR = 0
      if (idx == 0) {
        console.log("First Monkey", m)
      }
      for(let a of m.attributes){
          if (a.trait_type == "Background") {
              if (a.value.includes("MM1")) nftBGR += 0;
              if (a.value.includes("MM2")) nftBGR += 150;
              if (a.value.includes("MM3")) nftBGR += 1900;
          }
      }
      nftListBGR.push({
          token_id: m.token_id,
          BGR: nftBGR + 100
      })
      totalBGR += nftBGR
  })

    // console.log("nftListBGR", nftListBGR)
  
    res.setHeader('cache-control', 's-maxage=60, stale-while-revalidate=120')
    res.json({
        nftList: nftList,
        nftListBGR: nftListBGR,
        totalBGR: totalBGR,
        bananaPerDay: bananaPerDay,
        pendingTransactions: pendingTransactions?.data?.results
    })
  } catch (error) {
    //console.log(error)
    res.status(400).json(error)
  }

}
