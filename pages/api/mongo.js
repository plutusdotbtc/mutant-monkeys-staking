import dbConnect from "../../lib/dbConnect";
import Meta from '../../models/Meta'
import Action from '../../models/Action'
import Collection from '../../models/Collection'
import Marketplace from '../../models/Marketplace'
import queryString from 'query-string'
import _ from 'lodash'
//
export default async function handler(req, res) {
  console.log('GET: /mongo')
  const db = await dbConnect()
  console.log("____________________")
  console.log("MONGO HIT")
  console.log("____________________")
  // console.log(req.url)
  // console.log(req.query)
  res.setHeader('cache-control', 's-maxage=300, stale-while-revalidate=600')
  try{
    let query = req.query.query || 'name'
    let sort = Number(req.query.sort) || 1
    const listed = JSON.parse(req.query.listed) || [true, false]
    let attributes = req.query.attributes? JSON.parse(req.query.attributes) : []
    const contractKeyIsArray = /^\[.*\]$/.test(req.query.contract_key);
    const contract_key = contractKeyIsArray
      ? JSON.parse(req.query.contract_key)
      : [].concat(req.query.contract_key);

    switch(contract_key[0]){
      case 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.megapont-robot-expansion-nft':
        contract_key.push('SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.megapont-robot-nft')
        break;
      case 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.megapont-robot-component-expansion-nft':
        contract_key.push('SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.megapont-robot-component-nft')
        break;
      case 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.megapont-robot-nft':
        contract_key.push('SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.megapont-robot-expansion-nft')
        break;
      case 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.megapont-robot-component-nft':
        contract_key.push('SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.megapont-robot-component-expansion-nft')
        break;
      default:
        break;
    }
    
    //attributes =  attributes: '{"Hat":[{"trait_type":"Hat","value":"Sunshine Fedora","rarity":0.0088},{"trait_type":"Hat","value":"Wreath","rarity":0.0036}],"Clothing":[{"trait_type":"Clothing","value":"100","rarity":0.008}]}'

    // reformat to: 
    // [
    //   {$or: [
    //     {attributes: {$elemMatch: {"trait_type":"Eyes","value":"Punk","rarity":0.0108}}},
    //     {attributes: {$elemMatch: {"trait_type":"Eyes","value":"Ski on Snow","rarity":0.012}}},
    
    //   ]},
    //   {$or: [
    //     {"attributes":{"$elemMatch":{"trait_type":"Hat","value":"Ooo Wavy","rarity":0.0068}}}
    //   ]}
    // ]
    let attr_obj = []
    for(let i in attributes){
      let obj = {
        $or: []
      }
      if(req.query.query == 'buys'){
        for(let a of attributes[i]){
          obj['$or'].push({
            "meta_id.attributes": {
              $elemMatch: a
            }
          })
        }
      } else {
        for(let a of attributes[i]){
          obj['$or'].push({
            attributes: {
              $elemMatch: a
            }
          })
        }
      }
      
      attr_obj.push(obj)
    }
    //console.log(attr_obj[0]['$or'])
    if(req.query.query == 'buys'){
      console.log('---buys')
      let buys_atr = () => {
        if(contract_key[0] == 'all' && attr_obj.length == 0){
          return {$match: {action: 'buy'  }}
        } else  return {$match: {action: 'buy', contract_key: {$in: contract_key}}}
      }
      let buys_fiter = () => {
        if(attr_obj.length == 0){
          return {$match: {}}
        } else {
          return {$match: {$and: attr_obj}}
        }
      }
      
      const action_aggregate =  Action.aggregate([
        buys_atr(),
        {$sort: {block_height: -1, tx_index: -1}},
        { $lookup:{
          from: 'collections',
          localField: "collection_id",
          foreignField: "_id",
          as: "collection_id"
        }},
        {
          $unwind: {
            path: "$collection_id"
          }
        },
        { $lookup:{
          from: 'metas',
          localField: "meta_id",
          foreignField: "_id",
          as: "meta_id"
        }},
        {
          $unwind: {
            path: "$meta_id"
          }
        },
        buys_fiter(),
      ], {allowDiskUse: true})
      Action.aggregatePaginate(action_aggregate, {
        offset: Number(req.query.skip),
        limit: Number(req.query.limit)
      }).then((results) => {
        //console.log(results)
        res.json(results)
      }).catch((err) => {
        console.error(err)
        res.json({msg: 'failed'})
      })
    }
    else {
      let atr = () => {
        if(contract_key[0] == 'all' && attr_obj.length == 0){
          return {$match: { minted: true,  listed: {$in: listed}}}
        } 
        else if (contract_key[0] == 'all' && attr_obj.length > 0){
          return {$match: { minted: true,  listed: {$in: listed}, $and: attr_obj}}
        }
        else if(attr_obj.length > 0){
          return {$match: {contract_key: {$in: contract_key}, minted: true, listed: {$in: listed}, $and: attr_obj}}
        } 
        else  return {$match: {contract_key: {$in: contract_key}, minted: true, listed: {$in: listed}}}
      }
      const uniq_name =  Meta.aggregate([
        atr(),
        { $lookup:{
          from: 'collections',
          localField: "collection_id",
          foreignField: "_id",
          as: "collection_id"
        }},
        {
          $unwind: {
            path: "$collection_id"
          }
        },
        {$sort: {[query]: sort}},
      ], {allowDiskUse: true})
      Meta.aggregatePaginate(uniq_name, {
        offset: Number(req.query.skip),
        limit: Number(req.query.limit)
      }).then((results) => {
        //console.log(results)
        res.json(results)
      }).catch((err) => {
        console.error(err)
        res.json({msg: 'failed'})
      })
    } 
    
    
  } catch(err){
    console.error(err);
    res.json({msg: 'failed'})
  }
  
}