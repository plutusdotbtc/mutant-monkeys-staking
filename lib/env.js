import { AppConfig, UserSession, showConnect } from '@stacks/connect'
import { StacksTestnet, StacksMainnet } from '@stacks/network';
import {
  FungibleConditionCode,
  makeStandardSTXPostCondition,
  bufferCVFromString,
  createAssetInfo,
  callReadOnlyFunction,
  contractPrincipalCV,
  standardPrincipalCV,
  uintCV,
  intCV,
  bufferCV,
  makeContractFungiblePostCondition,
  makeStandardNonFungiblePostCondition,
  cvToHex,
  tupleCV,
  makeContractNonFungiblePostCondition,
  NonFungibleConditionCode,
  cvToJSON,
  hexToCV,
  stringAsciiCV,
  makeContractSTXPostCondition
} from '@stacks/transactions';
import { toast } from 'react-toastify';
//

import { openContractCall } from '@stacks/connect'
import { fetch } from 'cross-fetch';
import { AccountsApi, FaucetsApi, Configuration, SmartContractsApi }from '@stacks/blockchain-api-client'
import axios from 'axios';
import useSWR, { useSWRConfig } from 'swr';
const fetcher = (url, params) => axios.post(url, params).then(res => res.data) 



export const env = {
  
  network: new StacksMainnet(),
  stacksApi: "https://stacks-node-api.mainnet.stacks.co",
  stacksExplorer: "https://explorer.stacks.co",
  stacksNet: 'mainnet',
  mint: {
    address: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
    name: 'non-fungies-v17',
    function: 'claim',
  },
  meta: {
    address: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
    name: 'get-metadata',
    function: 'get-map'
  },
  market: {
    address: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
    name: 'byzantion-market-v5'
  }
}

export const listNft = async (nft, price, auth) => {
  let options = () => {
    switch(nft.contract_key){
      case 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.megapont-ape-club-nft':
        return {
          contractAddress: 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335',
          contractName: 'megapont-ape-club-nft',
          functionName: 'list-in-ustx',
          functionArgs: [uintCV(nft.token_id), uintCV(price*1000000), contractPrincipalCV('SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335', 'commission-megapont')],
          network: env.network,
          appDetails: {
            name: "Byzantion",
            icon: ''
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            
          ]
        }
        break;
      case 'SP176ZMV706NZGDDX8VSQRGMB7QN33BBDVZ6BMNHD.project-indigo-act1':
        return {
          contractAddress: 'SP176ZMV706NZGDDX8VSQRGMB7QN33BBDVZ6BMNHD',
          contractName: 'project-indigo-act1',
          functionName: 'list-in-ustx',
          functionArgs: [uintCV(nft.token_id), uintCV(price*1000000), contractPrincipalCV('SP176ZMV706NZGDDX8VSQRGMB7QN33BBDVZ6BMNHD', 'commission-byzantion-v4')],
          network: env.network,
          appDetails: {
            name: "Byzantion",
            icon: ''
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            
          ]
        }
        break;
      case 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.megapont-robot-nft':
        return {
          contractAddress: 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335',
          contractName: 'megapont-robot-nft',
          functionName: 'list-in-ustx',
          functionArgs: [uintCV(nft.token_id), uintCV(price*1000000), contractPrincipalCV('SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335', 'commission-robot-factory')],
          network: env.network,
          appDetails: {
            name: "Byzantion",
            icon: ''
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            
          ]
        }
        break;
        case 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.megapont-robot-expansion-nft':
          return {
            contractAddress: 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335',
            contractName: 'megapont-robot-expansion-nft',
            functionName: 'list-in-ustx',
            functionArgs: [uintCV(nft.token_id), uintCV(price*1000000), contractPrincipalCV('SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335', 'commission-robot-factory')],
            network: env.network,
            appDetails: {
              name: "Byzantion",
              icon: ''
            },
            onFinish: data => {
        
              const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
              console.log(data, data.txId)
              let msg = () => {
                return (
                  <>
                    <p>Successfully broadcasted transaction!</p>
                    <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                  </>
                )
              }
              toast.success(msg
              , {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
            },
            postConditions: [
              
            ]
          }
          break;
          case 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.wasteland-apes-nft':
            return {
              contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
              contractName: 'wasteland-apes-nft',
              functionName: 'list-in-ustx',
              functionArgs: [uintCV(nft.token_id), uintCV(price*1000000), contractPrincipalCV('SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C', 'wasteland-apes-commission')],
              network: env.network,
              appDetails: {
                name: "Byzantion",
                icon: ''
              },
              onFinish: data => {
          
                const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
                console.log(data, data.txId)
                let msg = () => {
                  return (
                    <>
                      <p>Successfully broadcasted transaction!</p>
                      <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                    </>
                  )
                }
                toast.success(msg
                , {
                  position: "top-right",
                  autoClose: false,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  })
              },
              postConditions: [
                
              ]
            }
            break;
          
        case 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.megapont-robot-component-nft':
        return {
          contractAddress: 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335',
          contractName: 'megapont-robot-component-nft',
          functionName: 'list-in-ustx',
          functionArgs: [uintCV(nft.token_id), uintCV(price*1000000), contractPrincipalCV('SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335', 'commission-robot-factory')],
          network: env.network,
          appDetails: {
            name: "Byzantion",
            icon: ''
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            
          ]
        }
        break;
        case 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.megapont-robot-component-expansion-nft':
          return {
            contractAddress: 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335',
            contractName: 'megapont-robot-component-expansion-nft',
            functionName: 'list-in-ustx',
            functionArgs: [uintCV(nft.token_id), uintCV(price*1000000), contractPrincipalCV('SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335', 'commission-robot-factory')],
            network: env.network,
            appDetails: {
              name: "Byzantion",
              icon: ''
            },
            onFinish: data => {
        
              const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
              console.log(data, data.txId)
              let msg = () => {
                return (
                  <>
                    <p>Successfully broadcasted transaction!</p>
                    <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                  </>
                )
              }
              toast.success(msg
              , {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
            },
            postConditions: [
              
            ]
          }
          break;
        
        case 'SP3QSAJQ4EA8WXEDSRRKMZZ29NH91VZ6C5X88FGZQ.crashpunks-v2':
        return {
          contractAddress: 'SP3QSAJQ4EA8WXEDSRRKMZZ29NH91VZ6C5X88FGZQ',
          contractName: 'crashpunks-v2',
          functionName: 'list-in-ustx',
          functionArgs: [uintCV(nft.token_id), uintCV(price*1000000), contractPrincipalCV('SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C', 'commission-crashpunks-byzantion')],
          network: env.network,
          appDetails: {
            name: "Byzantion",
            icon: ''
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            
          ]
        }
        break;
              
        default:
        return {
          contractAddress: env.market.address,
          contractName: env.market.name,
          functionName: 'list-item',
          functionArgs: [contractPrincipalCV(nft.contract_key.split('.')[0], nft.contract_key.split('.')[1]), stringAsciiCV(`${nft.contract_key}::${nft.collection_id.asset_name}`), uintCV(nft.token_id), uintCV(price*1000000)],
          network: env.network,
          appDetails: {
            name: "Byzantion",
            icon: ''
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            makeStandardNonFungiblePostCondition(auth.wallet_id, NonFungibleConditionCode.DoesNotOwn, createAssetInfo(nft.contract_key.split('.')[0], nft.contract_key.split('.')[1], nft.collection_id.asset_name), uintCV(nft.token_id) )
           ]
        }
        break;
    }
  }
  
  await openContractCall(options())
}

const getNftData = (nft) => {

  switch(nft){
    default:
  }
}

export const getMarket = async (auth, collection_id) => {
  try {
    const list = await callReadOnlyFunction(
      {
        contractAddress: env.market.address,
        contractName: env.market.name,
        functionName: 'get-listed-item-ids',
        functionArgs: [uintCV(collection_id)],
        network: env.network,
        senderAddress: env.market.address,
      }
    )
    if(list) {
      const newItemList = []
      for(let i of list.list) {
        const itemData = await callReadOnlyFunction(
          {
            contractAddress: env.market.address,
            contractName: env.market.name,
            functionName: 'get-item-for-sale',
            functionArgs: [uintCV(collection_id), uintCV(i.value)],
            network: env.network,
            senderAddress: env.market.address,
          }
        )
        //console.log(cvToJSON(itemData).value)
        newItemList.push({
          i,
          data: cvToJSON(itemData).value,
          image: getMetaInfo(collection_id, i.value).image,
          collection_id: collection_id
        })
        
      }
      
      return newItemList
    }
  } catch (error) {
    console.log(error)
  }
}

export const buyMarket = async (auth, item) => {
  let list_contract = item.list_contract.split('.')
  let commission
  console.log(item)
  let options = () => {
    switch(list_contract[1]){
      case 'byzantion-market-v2':
        return { 
          contractAddress: list_contract[0],
          contractName: list_contract[1],
          functionName: "buy-item",
          functionArgs: [contractPrincipalCV(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1]), uintCV(item.collection_map_id || 0), uintCV(Number(item.token_id))],
          network: env.network,
          appDetails: {
            name: 'Byzantion',
            icon: '',
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, item.list_price),
            makeContractNonFungiblePostCondition(
              list_contract[0], list_contract[1], NonFungibleConditionCode.DoesNotOwn, createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name), uintCV(Number(item.token_id))
            )
          ]
        }
        break;
      case 'byzantion-market-v5':
        return { 
          contractAddress: list_contract[0],
          contractName: list_contract[1],
          functionName: "buy-item",
          functionArgs: [contractPrincipalCV(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1]), stringAsciiCV(`${item.collection_id.contract_key.split('.')[0]}.${item.collection_id.contract_key.split('.')[1]}::${item.collection_id.asset_name}`), uintCV(Number(item.token_id))],
          network: env.network,
          appDetails: {
            name: 'Byzantion',
            icon: '',
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, item.list_price),
            makeContractNonFungiblePostCondition(
              env.market.address, env.market.name, NonFungibleConditionCode.DoesNotOwn, createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name), uintCV(Number(item.token_id))
            )
          ]
        }
        break;
      case 'megapont-ape-club-nft':
        commission = item.commission.split('.')
        
        let option = {
          contractAddress: 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335',
          contractName: 'megapont-ape-club-nft',
          functionName: 'buy-in-ustx',
          functionArgs: [uintCV(item.token_id), contractPrincipalCV(commission[0], commission[1])],
          network: env.network,
          appDetails: {
            name: "Byzantion",
            icon: ''
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            makeStandardNonFungiblePostCondition(
              item.list_seller,
              NonFungibleConditionCode.DoesNotOwn,
              createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name),
              uintCV(Number(item.token_id))
            ),
          ]
        }
        if(item.commission == 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.commission-megapont'){
          option.postConditions.push(
            makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, item.list_price + (item.list_price * 500 / 10000))
          )
          
        } else if (item.commission == 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.commission-robot-factory-stxnft'){
          option.postConditions.push(
            makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, item.list_price + (item.list_price * 400 / 10000))
          )
        }else {
          option.postConditions.push(
            makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, item.list_price + (item.list_price * 400 / 10000))
          )
        }
        return option
        break;
      case 'megapont-robot-nft':
        commission = item.commission.split('.')
        
        return {
          contractAddress: 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335',
          contractName: 'megapont-robot-nft',
          functionName: 'buy-in-ustx',
          functionArgs: [uintCV(item.token_id), contractPrincipalCV(commission[0], commission[1])],
          network: env.network,
          appDetails: {
            name: "Byzantion",
            icon: ''
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            makeStandardNonFungiblePostCondition(
              item.list_seller,
              NonFungibleConditionCode.DoesNotOwn,
              createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name),
              uintCV(Number(item.token_id))
            ),
            makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, item.list_price + (item.list_price * 400 / 10000))
          ]
        }
        
        break;
        case 'megapont-robot-expansion-nft':
          commission = item.commission.split('.')
          
          return {
            contractAddress: 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335',
            contractName: 'megapont-robot-expansion-nft',
            functionName: 'buy-in-ustx',
            functionArgs: [uintCV(item.token_id), contractPrincipalCV(commission[0], commission[1])],
            network: env.network,
            appDetails: {
              name: "Byzantion",
              icon: ''
            },
            onFinish: data => {
        
              const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
              console.log(data, data.txId)
              let msg = () => {
                return (
                  <>
                    <p>Successfully broadcasted transaction!</p>
                    <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                  </>
                )
              }
              toast.success(msg
              , {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
            },
            postConditions: [
              makeStandardNonFungiblePostCondition(
                item.list_seller,
                NonFungibleConditionCode.DoesNotOwn,
                createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name),
                uintCV(Number(item.token_id))
              ),
              makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, item.list_price + (item.list_price * 400 / 10000))
            ]
          }
          
          break;
        
        case 'megapont-robot-component-nft':
        commission = item.commission.split('.')
        
        return {
          contractAddress: 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335',
          contractName: 'megapont-robot-component-nft',
          functionName: 'buy-in-ustx',
          functionArgs: [uintCV(item.token_id), contractPrincipalCV(commission[0], commission[1])],
          network: env.network,
          appDetails: {
            name: "Byzantion",
            icon: ''
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            makeStandardNonFungiblePostCondition(
              item.list_seller,
              NonFungibleConditionCode.DoesNotOwn,
              createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name),
              uintCV(Number(item.token_id))
            ),
            makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, item.list_price + (item.list_price * 400 / 10000))
          ]
        }
        
        break;
        case 'megapont-robot-component-expansion-nft':
          commission = item.commission.split('.')
          
          return {
            contractAddress: 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335',
            contractName: 'megapont-robot-component-expansion-nft',
            functionName: 'buy-in-ustx',
            functionArgs: [uintCV(item.token_id), contractPrincipalCV(commission[0], commission[1])],
            network: env.network,
            appDetails: {
              name: "Byzantion",
              icon: ''
            },
            onFinish: data => {
        
              const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
              console.log(data, data.txId)
              let msg = () => {
                return (
                  <>
                    <p>Successfully broadcasted transaction!</p>
                    <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                  </>
                )
              }
              toast.success(msg
              , {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
            },
            postConditions: [
              makeStandardNonFungiblePostCondition(
                item.list_seller,
                NonFungibleConditionCode.DoesNotOwn,
                createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name),
                uintCV(Number(item.token_id))
              ),
              makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, item.list_price + (item.list_price * 400 / 10000))
            ]
          }
          
          break;
        case 'wasteland-apes-nft':
          commission = item.commission.split('.')
          
          let wasteOption = {
            contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
            contractName: 'wasteland-apes-nft',
            functionName: 'buy-in-ustx',
            functionArgs: [uintCV(item.token_id), contractPrincipalCV(commission[0], commission[1])],
            network: env.network,
            appDetails: {
              name: "Byzantion",
              icon: ''
            },
            onFinish: data => {
        
              const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
              console.log(data, data.txId)
              let msg = () => {
                return (
                  <>
                    <p>Successfully broadcasted transaction!</p>
                    <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                  </>
                )
              }
              toast.success(msg
              , {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
            },
            postConditions: [
              makeStandardNonFungiblePostCondition(
                item.list_seller,
                NonFungibleConditionCode.DoesNotOwn,
                createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name),
                uintCV(Number(item.token_id))
              ),
              
            ]
          }
          if(item.commission == 'SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.wasteland-apes-stxnft-commission'){
            wasteOption.postConditions.push(
              makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, item.list_price + (item.list_price * 400 / 10000))
            )
            
          } else if(item.commission == 'SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.wasteland-apes-stacks-art-commission'){
            wasteOption.postConditions.push(
              makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, item.list_price + (item.list_price * 0.105))
            )
            
          } else {
            wasteOption.postConditions.push(
              makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, item.list_price + (item.list_price * 300 / 10000))
            )
          }
          return wasteOption
          break;
            
      case 'crashpunks-v2':
        commission = item.commission.split('.')
        
        return {
          contractAddress: 'SP3QSAJQ4EA8WXEDSRRKMZZ29NH91VZ6C5X88FGZQ',
          contractName: 'crashpunks-v2',
          functionName: 'buy-in-ustx',
          functionArgs: [uintCV(item.token_id), contractPrincipalCV(commission[0], commission[1])],
          network: env.network,
          appDetails: {
            name: "Byzantion",
            icon: ''
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            makeStandardNonFungiblePostCondition(
              item.list_seller,
              NonFungibleConditionCode.DoesNotOwn,
              createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name),
              uintCV(Number(item.token_id))
            ),
            makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, item.list_price + (item.list_price * 1000 / 10000))
          ]
        }
        
        break;
        
      case 'project-indigo-act1':
        commission = item.commission.split('.')
        
        return {
          contractAddress: 'SP176ZMV706NZGDDX8VSQRGMB7QN33BBDVZ6BMNHD',
          contractName: 'project-indigo-act1',
          functionName: 'buy-in-ustx',
          functionArgs: [uintCV(item.token_id), contractPrincipalCV(commission[0], commission[1])],
          network: env.network,
          appDetails: {
            name: "Byzantion",
            icon: ''
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            makeStandardNonFungiblePostCondition(
              item.list_seller,
              NonFungibleConditionCode.DoesNotOwn,
              createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name),
              uintCV(Number(item.token_id))
            ),
            makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, item.list_price + (item.list_price * 600 / 10000))
          ]
        }
        
        
        break;
      case 'stacks-art-market-v2':
        return { 
          contractAddress: list_contract[0],
          contractName: list_contract[1],
          functionName: "buy-item",
          functionArgs: [contractPrincipalCV(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1]), uintCV(Number(item.collection_map_id)),uintCV(Number(item.token_id))],
          network: env.network,
          appDetails: {
            name: 'Byzantion',
            icon: '',
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, item.list_price),
            makeContractNonFungiblePostCondition(
              item.list_contract.split('.')[0], item.list_contract.split('.')[1], NonFungibleConditionCode.DoesNotOwn, createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name), uintCV(Number(item.token_id))
            )
          ]
        }
        break;
      break;
      case 'stacks-art-market':
        return { 
          contractAddress: list_contract[0],
          contractName: list_contract[1],
          functionName: "buy-item",
          functionArgs: [contractPrincipalCV(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1]), uintCV(Number(item.collection_map_id)),uintCV(Number(item.token_id))],
          network: env.network,
          appDetails: {
            name: 'Byzantion',
            icon: '',
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, item.list_price),
            makeContractNonFungiblePostCondition(
              item.list_contract.split('.')[0], item.list_contract.split('.')[1], NonFungibleConditionCode.DoesNotOwn, createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name), uintCV(Number(item.token_id))
            )
          ]
        }
        break;
      case 'stacks-punks-market':
        return { 
          contractAddress: list_contract[0],
          contractName: list_contract[1],
          functionName: "buy-punk",
          functionArgs: [uintCV(Number(item.token_id))],
          network: env.network,
          appDetails: {
            name: 'Byzantion',
            icon: '',
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, item.list_price),
            makeContractNonFungiblePostCondition(
              item.list_contract.split('.')[0], item.list_contract.split('.')[1], NonFungibleConditionCode.DoesNotOwn, createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name), uintCV(Number(item.token_id))
            )
          ]
        }
        break;
      case 'marketplace-v4':
        return { 
          contractAddress: list_contract[0],
          contractName: list_contract[1],
          functionName: "purchase-asset",
          functionArgs: [contractPrincipalCV(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1]), uintCV(Number(item.token_id))],
          network: env.network,
          appDetails: {
            name: 'Byzantion',
            icon: '',
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            
            makeStandardNonFungiblePostCondition(auth.wallet_id, NonFungibleConditionCode.Owns, createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name), uintCV(Number(item.token_id))),
            makeContractNonFungiblePostCondition(
              item.list_contract.split('.')[0], item.list_contract.split('.')[1], NonFungibleConditionCode.DoesNotOwn, createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name), uintCV(Number(item.token_id))
            ),
            makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, item.list_price),
          ]
        }
        break;
      case 'marketplace-v2':
        return { 
          contractAddress: list_contract[0],
          contractName: list_contract[1],
          functionName: "purchase-asset",
          functionArgs: [contractPrincipalCV(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1]), uintCV(Number(item.token_id))],
          network: env.network,
          appDetails: {
            name: 'Byzantion',
            icon: '',
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            
            makeStandardNonFungiblePostCondition(auth.wallet_id, NonFungibleConditionCode.Owns, createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name), uintCV(Number(item.token_id))),
            makeContractNonFungiblePostCondition(
              item.list_contract.split('.')[0], item.list_contract.split('.')[1], NonFungibleConditionCode.DoesNotOwn, createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name), uintCV(Number(item.token_id))
            ),
            makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, item.list_price),
          ]
        }
        break;
      case 'marketplace-v3':
        return { 
          contractAddress: list_contract[0],
          contractName: list_contract[1],
          functionName: "purchase-asset",
          functionArgs: [contractPrincipalCV(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1]), uintCV(Number(item.token_id))],
          network: env.network,
          appDetails: {
            name: 'Byzantion',
            icon: '',
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            
            makeStandardNonFungiblePostCondition(auth.wallet_id, NonFungibleConditionCode.Owns, createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name), uintCV(Number(item.token_id))),
            makeContractNonFungiblePostCondition(
              item.list_contract.split('.')[0], item.list_contract.split('.')[1], NonFungibleConditionCode.DoesNotOwn, createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name), uintCV(Number(item.token_id))
            ),
            makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, item.list_price),
          ]
        }
        break;
        
    }
  }
  
  

  await openContractCall(options())
}

export const unlistItemMarket = async (auth, item) => {
  
  let list_contract = item.list_contract.split('.')
  console.log(item)

  let options = () => {
    switch(list_contract[1]){
      case 'byzantion-market-v2':
        return {
          contractAddress: list_contract[0],
          contractName: list_contract[1],
          functionName: "unlist-item",
          functionArgs: [contractPrincipalCV(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1]), uintCV(item.collection_map_id), uintCV(item.token_id)],
          network: env.network,
          appDetails: {
            name: 'Byzantion',
            icon: '',
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            makeContractNonFungiblePostCondition(
              list_contract[0], list_contract[1], NonFungibleConditionCode.DoesNotOwn, createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name), uintCV(Number(item.token_id))
            )
          ]
        }
        break;
      case 'byzantion-market-v5':
        return {
          contractAddress: list_contract[0],
          contractName: list_contract[1],
          functionName: "unlist-item",
          functionArgs: [contractPrincipalCV(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1]), stringAsciiCV(`${item.collection_id.contract_key.split('.')[0]}.${item.collection_id.contract_key.split('.')[1]}::${item.collection_id.asset_name}`), uintCV(item.token_id)],
          network: env.network,
          appDetails: {
            name: 'Byzantion',
            icon: '',
          },
          onFinish: data => {

            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            makeContractNonFungiblePostCondition(
              list_contract[0], list_contract[1], NonFungibleConditionCode.DoesNotOwn, createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name), uintCV(Number(item.token_id))
            )
          ]
        }
      case 'megapont-ape-club-nft':
        return {
          contractAddress: 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335',
          contractName: 'megapont-ape-club-nft',
          functionName: 'unlist-in-ustx',
          functionArgs: [uintCV(item.token_id)],
          network: env.network,
          appDetails: {
            name: "Byzantion",
            icon: ''
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            
          ]
        }
      case 'megapont-robot-component-nft':
        return {
          contractAddress: 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335',
          contractName: 'megapont-robot-component-nft',
          functionName: 'unlist-in-ustx',
          functionArgs: [uintCV(item.token_id)],
          network: env.network,
          appDetails: {
            name: "Byzantion",
            icon: ''
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            
          ]
        }
        break;
        case 'wasteland-apes-nft':
        return {
          contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
          contractName: 'wasteland-apes-nft',
          functionName: 'unlist-in-ustx',
          functionArgs: [uintCV(item.token_id)],
          network: env.network,
          appDetails: {
            name: "Byzantion",
            icon: ''
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            
          ]
        }
        break;
        
        case 'megapont-robot-component-expansion-nft':
          return {
            contractAddress: 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335',
            contractName: 'megapont-robot-component-expansion-nft',
            functionName: 'unlist-in-ustx',
            functionArgs: [uintCV(item.token_id)],
            network: env.network,
            appDetails: {
              name: "Byzantion",
              icon: ''
            },
            onFinish: data => {
        
              const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
              console.log(data, data.txId)
              let msg = () => {
                return (
                  <>
                    <p>Successfully broadcasted transaction!</p>
                    <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                  </>
                )
              }
              toast.success(msg
              , {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
            },
            postConditions: [
              
            ]
          }
          break;
        
        case 'megapont-robot-nft':
        return {
          contractAddress: 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335',
          contractName: 'megapont-robot-nft',
          functionName: 'unlist-in-ustx',
          functionArgs: [uintCV(item.token_id)],
          network: env.network,
          appDetails: {
            name: "Byzantion",
            icon: ''
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            
          ]
        }
        break;
      
        case 'megapont-robot-expansion-nft':
          return {
            contractAddress: 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335',
            contractName: 'megapont-robot-expansion-nft',
            functionName: 'unlist-in-ustx',
            functionArgs: [uintCV(item.token_id)],
            network: env.network,
            appDetails: {
              name: "Byzantion",
              icon: ''
            },
            onFinish: data => {
        
              const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
              console.log(data, data.txId)
              let msg = () => {
                return (
                  <>
                    <p>Successfully broadcasted transaction!</p>
                    <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                  </>
                )
              }
              toast.success(msg
              , {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
            },
            postConditions: [
              
            ]
          }
          break;
        
        case 'crashpunks-v2':
          return {
            contractAddress: 'SP3QSAJQ4EA8WXEDSRRKMZZ29NH91VZ6C5X88FGZQ',
            contractName: 'crashpunks-v2',
            functionName: 'unlist-in-ustx',
            functionArgs: [uintCV(item.token_id)],
            network: env.network,
            appDetails: {
              name: "Byzantion",
              icon: ''
            },
            onFinish: data => {
        
              const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
              console.log(data, data.txId)
              let msg = () => {
                return (
                  <>
                    <p>Successfully broadcasted transaction!</p>
                    <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                  </>
                )
              }
              toast.success(msg
              , {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
            },
            postConditions: [
              
            ]
          }
          break;
        
        case 'project-indigo-act1':
        return {
          contractAddress: 'SP176ZMV706NZGDDX8VSQRGMB7QN33BBDVZ6BMNHD',
          contractName: 'project-indigo-act1',
          functionName: 'unlist-in-ustx',
          functionArgs: [uintCV(item.token_id)],
          network: env.network,
          appDetails: {
            name: "Byzantion",
            icon: ''
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            
          ]
        }
      
      case 'stacks-art-market-v2':
          return {
            contractAddress: list_contract[0],
            contractName: list_contract[1],
            functionName: "unlist-item",
            functionArgs: [contractPrincipalCV(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1]), uintCV(item.collection_id), uintCV(item.token_id)],
            network: env.network,
            appDetails: {
              name: 'Byzantion',
              icon: '',
            },
            onFinish: data => {
        
              const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
              console.log(data, data.txId)
              let msg = () => {
                return (
                  <>
                    <p>Successfully broadcasted transaction!</p>
                    <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                  </>
                )
              }
              toast.success(msg
              , {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
            },
            postConditions: [
              makeContractNonFungiblePostCondition(
                list_contract[0], list_contract[1], NonFungibleConditionCode.DoesNotOwn, createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name), uintCV(Number(item.token_id))
              )
            ]
          }
          break;
      case 'stacks-art-market':
        return {
          contractAddress: list_contract[0],
          contractName: list_contract[1],
          functionName: "unlist-item",
          functionArgs: [
            contractPrincipalCV(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1]),
             uintCV(item.collection_id), 
             uintCV(item.token_id)],
          network: env.network,
          appDetails: {
            name: 'Byzantion',
            icon: '',
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
          ]
        }
        break;
      case 'stacks-punks-market':
        return {
          contractAddress: list_contract[0],
          contractName: list_contract[1],
          functionName: "unlist-punk",
          functionArgs: [uintCV(item.token_id)],
          network: env.network,
          appDetails: {
            name: 'Byzantion',
            icon: '',
          },
          onFinish: data => {
      
            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
          ]
        }
        break;
      case 'marketplace-v4':
        return {
          contractAddress: list_contract[0],
          contractName: list_contract[1],
          functionName: "unlist-asset",
          functionArgs: [contractPrincipalCV(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1]), uintCV(item.token_id)],
          network: env.network,
          appDetails: {
            name: 'Byzantion',
            icon: '',
          },
          onFinish: data => {

            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            makeContractNonFungiblePostCondition(
              list_contract[0], list_contract[1], NonFungibleConditionCode.DoesNotOwn, createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name), uintCV(Number(item.token_id))
            )
          ]
        }
        break;
      case 'marketplace-v2':
        return {
          contractAddress: list_contract[0],
          contractName: list_contract[1],
          functionName: "unlist-asset",
          functionArgs: [contractPrincipalCV(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1]), uintCV(item.token_id)],
          network: env.network,
          appDetails: {
            name: 'Byzantion',
            icon: '',
          },
          onFinish: data => {

            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            makeContractNonFungiblePostCondition(
              list_contract[0], list_contract[1], NonFungibleConditionCode.DoesNotOwn, createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name), uintCV(Number(item.token_id))
            )
          ]
        }
        break;
      case 'marketplace-v3':
        return {
          contractAddress: list_contract[0],
          contractName: list_contract[1],
          functionName: "unlist-asset",
          functionArgs: [contractPrincipalCV(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1]), uintCV(item.token_id)],
          network: env.network,
          appDetails: {
            name: 'Byzantion',
            icon: '',
          },
          onFinish: data => {

            const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
            console.log(data, data.txId)
            let msg = () => {
              return (
                <>
                  <p>Successfully broadcasted transaction!</p>
                  <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
                </>
              )
            }
            toast.success(msg
            , {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
          },
          postConditions: [
            makeContractNonFungiblePostCondition(
              list_contract[0], list_contract[1], NonFungibleConditionCode.DoesNotOwn, createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name), uintCV(Number(item.token_id))
            )
          ]
        }
        break;
        
    }
      
    }
  

  await openContractCall(options())
}

export const bidMarket = async (auth, item, bid) => {
 
  //let bid = Number(price)
  
  // let options = {
  //   contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
  //   contractName: "byzantion-market-v5",
  //   functionName: "bid-item",
  //   functionArgs: [stringAsciiCV(`${item.collection_id.contract_key.split('.')[0]}.${item.collection_id.contract_key.split('.')[1]}::${item.collection_id.asset_name}`), uintCV(Number(item.token_id)), uintCV(bid*1000000)],
  //   network: env.network,
  //   appDetails: {
  //     name: 'Byzantion',
  //     icon: '',
  //   },
  //   onFinish: data => {

  //     const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
  //     console.log(data, data.txId)
  //     let msg = () => {
  //       return (
  //         <>
  //           <p>Successfully broadcasted transaction!</p>
  //           <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
  //         </>
  //       )
  //     }
  //     toast.success(msg
  //     , {
  //       position: "top-right",
  //       autoClose: false,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       })
  //   },
  //   postConditions: [
  //     makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, bid*1000000)
  //   ]
  // }
  // if(item.bid){
  //   options.postConditions.push(makeContractSTXPostCondition(env.market.address, env.market.name, FungibleConditionCode.LessEqual, item.bid_price))
  // }
  // await openContractCall(options)
  console.log('remove')
}

export const acceptBidMarket = async (auth, item) => {
 
  // let bid_contract = item.bid_contract.split('.')
  // console.log(item)
  // let options = {
  //   contractAddress: bid_contract[0],
  //   contractName: bid_contract[1],
  //   functionName: "accept-bid",
  //   functionArgs: [contractPrincipalCV(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1]), stringAsciiCV(`${item.collection_id.contract_key.split('.')[0]}.${item.collection_id.contract_key.split('.')[1]}::${item.collection_id.asset_name}`), uintCV(Number(item.token_id))],
  //   network: env.network,
  //   appDetails: {
  //     name: 'Byzantion',
  //     icon: '',
  //   },
  //   onFinish: data => {

  //     const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
  //     console.log(data, data.txId)
  //     let msg = () => {
  //       return (
  //         <>
  //           <p>Successfully broadcasted transaction!</p>
  //           <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
  //         </>
  //       )
  //     }
  //     toast.success(msg
  //     , {
  //       position: "top-right",
  //       autoClose: false,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       })
  //   },
  //   postConditions: [
  //     makeContractSTXPostCondition('SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C', 'byzantion-market-v5', FungibleConditionCode.LessEqual, item.bid_price),
  //     makeStandardNonFungiblePostCondition(auth.wallet_id, NonFungibleConditionCode.DoesNotOwn, createAssetInfo(item.collection_id.contract_key.split('.')[0], item.collection_id.contract_key.split('.')[1], item.collection_id.asset_name), uintCV(Number(item.token_id)))
  //   ]
  // }
  // console.log(options)
  // await openContractCall(options)
  console.log('remove')
}


export const withdrawBidMarket = async (auth, item) => {
 
  // let bid_contract = item.bid_contract.split('.')
  // console.log(item)
  // let options = {
  //   contractAddress: bid_contract[0],
  //   contractName: bid_contract[1],
  //   functionName: "withdraw-bid",
  //   functionArgs: [stringAsciiCV(`${item.collection_id.contract_key.split('.')[0]}.${item.collection_id.contract_key.split('.')[1]}::${item.collection_id.asset_name}`), uintCV(Number(item.token_id))],
  //   network: env.network,
  //   appDetails: {
  //     name: 'Byzantion',
  //     icon: '',
  //   },
  //   onFinish: data => {

  //     const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
  //     console.log(data, data.txId)
  //     let msg = () => {
  //       return (
  //         <>
  //           <p>Successfully broadcasted transaction!</p>
  //           <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
  //         </>
  //       )
  //     }
  //     toast.success(msg
  //     , {
  //       position: "top-right",
  //       autoClose: false,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       })
  //   },
  //   postConditions: [
  //     makeContractSTXPostCondition(bid_contract[0], bid_contract[1], FungibleConditionCode.LessEqual, item.bid_price)
  //   ]
  // }
  // console.log(options)
  // await openContractCall(options)
  console.log('nope')
}



export const getCollection = (collection_id) => {
  switch(collection_id){
    case 0: 
      return {
        contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
        contractName: 'mandelbrots-v1',
        assetName: 'stacks-mandelbrots'
      }
      break;
    case 1: 
      return {
        contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
        contractName: 'deruptars',
        assetName: 'deruptars'
      }
      break;
    case 2: 
    return {
      contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
      contractName: 'byzantion-genesis',
      assetName: 'genesis'
    }
    case 3: 
    return {
      contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
      contractName: 'byzantion-matryoshka-dolls',
      assetName: 'matryoshka-dolls'
    }
    break;
    case 4: 
    return {
      contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
      contractName: 'byzantion-english-hat-club',
      assetName: 'english-hat-club'
    }
    break;
    case 5:
      return {
        contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
        contractName: 'byzantion-stacks-dragons',
        assetName: 'stacks-dragons'
      }
      break;
    case 6:
      return {
        contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
        contractName: 'byzantion-animal-stacks',
        assetName: 'animal-stacks'
      }
      break;
    case 8:
      return {
        contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
        contractName: 'byzantion-stacks-foxes-community',
        assetName: 'stacks-foxes-community'
      }
      break;
    case 9:
      return {
        contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
        contractName: 'byzantion-bitcoin-tulips',
        assetName: 'bitcoin-tulips'
      }
      break;
    case 10:
      return {
        contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
        contractName: 'byzantion-blurred-museum',
        assetName: 'blurred-museum'
      }
      break;
    case 11:
      return {
        contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
        contractName: 'byzantion-the-himalayan-trinity',
        assetName: 'the-himalayan-trinity'
      }
    break;
    case 12:
      return {
        contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
        contractName: 'byzantion-bitcoin-kittens',
        assetName: 'bitcoin-kittens'
      }
    break;
    case 13:
      return {
        contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
        contractName: 'byzantion-satoshi-knights',
        assetName: 'satoshi-knights'
      }
    break;
    case 14:
      return {
        contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
        contractName: 'byzantion-shroomies',
        assetName: 'shroomies'
      }
    break;
    case 15:
      return {
        contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
        contractName: 'byzantion-fruitmen',
        assetName: 'fruitmen'
      }
    break;
    case 16:
      return {
        contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
        contractName: 'byzantion-sadoughshis-bitcoin-pizza',
        assetName: 'sadoughshis-bitcoin-pizza'
      }
    break;
    case 17:
      return {
        contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
        contractName: 'byzantion-vampire-slayers',
        assetName: 'vampire-slayers'
      }
    break;
    case 18:
      return {
        contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
        contractName: 'byzantion-homagic',
        assetName: 'homagic'
      }
    break;
    case 19:
      return {
        contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
        contractName: 'byzantion-vague-art-paintings',
        assetName: 'vague-art-paintings'
      }
    break;
    case 20:
      return {
        contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
        contractName: 'byzantion-cyborg',
        assetName: 'cyborg'
      }
    break;
    case 21:
      return {
        contractAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C',
        contractName: 'byzantion-bitcoin-pixel-world-v1',
        assetName: 'bitcoin-pixel-world'
      }
    break;
    case 24:
      return {
        contractAddress: 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335',
        contractName: 'megapont-ape-club-nft',
        assetName: 'Megapont-Ape-Club'
      }
    break;
    case 27:
      return {
        contractAddress: 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335',
        contractName: 'byzantion-stacks-samurai',
        assetName: 'stacks-samurai'
      }
    break;
    case 28:
      return {
        contractAddress: 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335',
        contractName: 'byzantion-proof-of-puf',
        assetName: 'proof-of-puf'
      }
    break;
  }
}



const apiConfig = new Configuration({
  fetchApi: fetch,
  basePath: env.stacksApi,
});

const accounts = new AccountsApi(apiConfig)
export const getBalance = async (auth) => {
  
    const balances = await accounts.getAccountBalance({
      principal: auth.wallet_id,
    });
  
    return balances;
  
}

export const getMetaInfo = async () => {
  console.log('test')
}
export const getSwrMarket = async (auth, collection_id) => {
  console.log('pending...')
  try {
    const list = await callReadOnlyFunction(
      {
        contractAddress: env.market.address,
        contractName: env.market.name,
        functionName: 'get-listed-item-ids',
        functionArgs: [uintCV(collection_id)],
        network: env.network,
        senderAddress: env.market.address,
      }
    )
    const listAx = await axios.post(`${env.stacksApi}/v2/contracts/call-read/${env.market.address}/${env.market.name}/get-listed-item-ids`, {
      sender: env.market.address,
      arguments: [cvToHex(uintCV(collection_id))]
    })
    if(listAx){
      console.log('test', listAx)
    }
    
    if(list) {
      const newItemList = []
      for(let i of list.list) {
        const itemData = await callReadOnlyFunction(
          {
            contractAddress: env.market.address,
            contractName: env.market.name,
            functionName: 'get-item-for-sale',
            functionArgs: [uintCV(collection_id), uintCV(i.value)],
            network: env.network,
            senderAddress: env.market.address,
          }
        )
        //console.log(cvToJSON(itemData).value)
        newItemList.push({
          i,
          data: cvToJSON(itemData).value,
          image: getMetaInfo(collection_id, i.value).image,
          collection_id: collection_id
        })
        
      }
      
      console.log(newItemList)
    }
  } catch (error) {
    console.log(error)
  }
}



export const bananasEarned = async (auth) => {
  try {
    const getbananas = await callReadOnlyFunction({
      contractAddress: "SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7",
      contractName: "mutant-monkeys",
      functionName: "check-staker",
      functionArgs: [standardPrincipalCV(auth)],
      network: env.network,
      senderAddress: env.market.address
    })
    console.log(getbananas)
    return getbananas
  } catch (error) {
    console.log(error)
  }
}

export const getHarvest = async (auth) => {
  try {
    const getharvest = await callReadOnlyFunction({
      contractAddress: "SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7",
      contractName: "mutant-staking",
      functionName: "check-collect",
      functionArgs: [standardPrincipalCV(auth)],
      network: env.network,
      senderAddress: env.market.address
    })
    console.log(getharvest)
    return getharvest
  } catch (error) {
    console.log(error)
  }
}

export const getStaked = async (auth, nft) => {
  try {
    const getStaked = await callReadOnlyFunction({
      contractAddress: "SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7",
      contractName: "mutant-staking",
      functionName: "get-staked-nfts",
      functionArgs: [standardPrincipalCV(auth),contractPrincipalCV("SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7","mutant-monkeys")],
      network: env.network,
      senderAddress: env.market.address
    })
    return getStaked
  } catch (error) {
    console.log(error)
  }
}

export const stakeMonkey = async (auth, nft) => {
  try {
    const stake = await openContractCall({
        contractAddress: "SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7",
        contractName: "mutant-staking",
        functionName: 'stake',
        functionArgs: [contractPrincipalCV("SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7","mutant-monkeys"),contractPrincipalCV("SP194TKVC1QE8PQ8J97A7DSPFPQJTQVN7JDH8HHC6","multipliers"),uintCV(nft.token_id)],
        network: env.network,
        appDetails: {
          name: "Byzantion",
          icon: ''
        },
        onFinish: data => {
          const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
          console.log(data, data.txId)
          let msg = () => {
            return (
              <>
                <p>Successfully broadcasted transaction!</p>
                <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
              </>
            )
          }
          toast.success(msg
          , {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          let element = document.getElementById(`${nft.contract_key.split('.')[1]}_${nft.token_id}`);
          console.log("element",element)
          console.log("element ID",`${nft.contract_key.split('.')[1]}_${nft.token_id}`)
          let element_button = document.getElementById(`stake_${nft.contract_key.split('.')[1]}_${nft.token_id}`);
          element.classList.add("currently-staking");
          element_button.innerHTML = "stake Pending"
        },
        postConditions: [
          makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, 5000000),
        ]
    })
    return stake
  } catch (error) {
    console.log(error)
    response = {
      status: "error",
      message: "Error while Staking Monkey."
    }
  }
}

export const unStakeMonkey = async (auth, nft) => {
  try {
    const stake = await openContractCall({
        contractAddress: "SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7",
        contractName: "mutant-staking",
        functionName: 'unstake',
        functionArgs: [contractPrincipalCV("SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7","mutant-monkeys"),contractPrincipalCV("SP194TKVC1QE8PQ8J97A7DSPFPQJTQVN7JDH8HHC6","multipliers"),uintCV(nft.token_id)],
        network: env.network,
        senderAddress: env.market.address,
        appDetails: {
          name: "Byzantion",
          icon: ''
        },
        onFinish: data => {

          const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
          console.log(data, data.txId)
          let msg = () => {
            return (
              <>
                <p>Successfully broadcasted transaction!</p>
                <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
              </>
            )
          }
          toast.success(msg
          , {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
        },
        postConditions: [
          makeStandardSTXPostCondition(auth.wallet_id, FungibleConditionCode.LessEqual, 5000000),
        ]
    })
    return stake
  } catch (error) {
    console.log(error)
  }
}


export const harvestMonkey = async () => {
  try {
    const stake = await openContractCall({
        contractAddress: 'SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7',
        contractName: 'mutant-staking',
        functionName: 'collect',
        functionArgs: [contractPrincipalCV('SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7','slime')],
        network: env.network,
        senderAddress: env.market.address,
        appDetails: {
          name: "Byzantion",
          icon: ''
        },
        onFinish: data => {

          const explorerTransactionUrl = `${env.stacksExplorer}/txid/${data.txId}`;
          console.log(data, data.txId)
          let msg = () => {
            return (
              <>
                <p>Successfully broadcasted transaction!</p>
                <a target="_blank" rel="noreferrer" href={explorerTransactionUrl}>View transaction in explorer</a>
              </>
            )
          }
          toast.success(msg
          , {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
        },
        postConditions: [
        ]
    })
    return stake
  } catch (error) {
    console.log(error)
  }
}
