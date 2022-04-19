import dbConnect from "../../lib/dbConnect";
import Meta from '../../models/Meta'
import Collection from '../../models/Collection'


import _ from 'lodash'
import axios from 'axios'
import Marketplace from "../../models/Marketplace";

export default async function handler(req, res) {
  console.log('POST: /api/get_unstaked_monkeys')
  const db = await dbConnect()
  console.log(req.query)
  console.log(req.body)

  try {
    let array = req.body.monkeys

    let nftList = await Meta.find({
        contract_key: 'SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7.mutant-monkeys',
        token_id:{$in: array}
    }).populate('collection_id')


    let totalBGR = 0
    let nftListBGR = []

    nftList.forEach((m)=>{
        let nftBGR = 0
        for(let a of m.attributes){
            if (a.trait_type == "Hat") {
                if (a.value == "Crown") nftBGR += 100;
                if (a.value == "Banana Skin") nftBGR += 50;
                if (a.value == "Viking Helmet") nftBGR += 10;
                if (a.value == "Pirate Hat") nftBGR += 10;
                if (a.value == "Sailor Hat") nftBGR += 10;
                if (a.value == "Army Helmet") nftBGR += 10;
                if (a.value == "Bitcoin Cap") nftBGR += 5;
                if (a.value == "Magician Hat") nftBGR += 12;
                if (a.value == "Party Hat") nftBGR += 14;
            }
            else if (a.trait_type == "Mouth") {
                if (a.value == "Banana") nftBGR += 30;
                if (a.value == "Money") nftBGR += 15;
                if (a.value == "Gold Teeth") nftBGR += 14;
                if (a.value == "Diamond Teeth") nftBGR += 14;
            }
            else if (a.trait_type == "Clothes") {
                if (a.value == "Army Vest") nftBGR += 10;
                if (a.value == "Bitcoin Tshirt") nftBGR += 6;
                if (a.value == "Labcoat") nftBGR += 25;
                if (a.value == "Space Suit") nftBGR += 14;
            }
            else if (a.trait_type == "Eyes") {
                if (a.value == "Bitcoin Eyes") nftBGR += 7;
                if (a.value == "Bloodshot") nftBGR += 5;
                if (a.value == "Cyborg") nftBGR += 10;
                if (a.value == "Blind") nftBGR += 5;
                if (a.value == "Laser Eyes Red") nftBGR += 14;
                if (a.value == "Laser Eyes Green") nftBGR += 14;
            }
            else if (a.trait_type == "Fur") {
                if (a.value == "Leopard") nftBGR += 16;
                if (a.value == "Galaxy") nftBGR += 12;
                if (a.value == "Gold") nftBGR += 14;
                if (a.value == "Rainbow") nftBGR += 14;
            }
            else if (a.trait_type == "Background") {
                if (a.value == "Rainbow") nftBGR += 14;
                if (a.value == "Space") nftBGR += 14;
            }
        }
        nftListBGR.push({
            token_id: m.token_id,
            BGR: nftBGR + 100
        })
        totalBGR += nftBGR
    })

    console.log("nftListBGR")
  
    res.setHeader('cache-control', 's-maxage=60, stale-while-revalidate=120')
    res.json({
        nftList: nftList,
        nftListBGR: nftListBGR,
        totalBGR: totalBGR,
    })
  } catch (error) {
    //console.log(error)
    res.status(400).json(error)
  }

}
