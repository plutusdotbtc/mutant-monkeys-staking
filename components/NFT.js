import Link from 'next/link';
import { useState } from 'react';
import { formatSTX } from '../utils/formatSTX';
import { unlistItemMarket } from '../lib/env'


export const NFT = ({item, auth, onclickFunction, onclickSecondFunction, staked, BGR}) => {

    
    let assetName,name,image,list_price,rarity,listed,list_seller,ranking,buyer,buyer_price,seller,bid_price,bid,bid_buyer,token_id
    if (item.meta_id) {
        assetName = item.meta_id.assetName
        name = item.meta_id.name
        image = item.meta_id.image
        list_price = item.meta_id.list_price
        rarity = item.meta_id.rarity
        listed = item.meta_id.listed
        list_seller = item.meta_id.list_seller
        ranking = item.meta_id.ranking
        token_id = item.meta_id.token_id
        buyer = item.list_buyer
        buyer_price = item.list_price
        seller = item.list_seller
    } else {
        assetName = item.collection_id?.asset_name
        name = item.name
        image = item.image
        list_price = item.list_price
        rarity = item.rarity
        listed = item.listed
        list_seller = item.list_seller
        ranking = item.ranking
        bid_price = item.bid_price
        bid = item.bid
        bid_buyer = item.bid_buyer
        token_id = item.token_id
    } 
    
    const slug = `https://byzantion.xyz/collection/bitcoin-monkeys/${token_id}`

    const [optimizedImage, setOptimizedImage] = useState(image+"?img-width=274&img-height=300&img-fit=cover&img-quality=85&img-onerror=redirect&img-fit=pad")
    const [imageLoaded, setImageLoaded] = useState(false)
    const loadErrorImg = (img) => {
        if (img == "optimizedImage") {
            setOptimizedImage(image.replace("https://byzantion.mypinata.cloud/ipfs/","https://ipfs.io/ipfs/"))
        }
    }


    // This make sure if the marketplace is updated with the NFT image.
    if (!optimizedImage.includes(image) && !optimizedImage.includes("https://ipfs.io/ipfs/")) {
        setOptimizedImage(image+"?img-width=274&img-height=300&img-fit=cover&img-quality=85&img-onerror=redirect&img-fit=pad")
        setImageLoaded(false)
    }

    const quickUnlistFunction = () => {
        unlistItemMarket(auth, item)
        window.analytics.identify(auth.wallet_id)
        window.analytics.track("Clicked Unlist (NFT Card)", {
            "name": item.name,
            "token_id": item.token_id,
            "asset_name": item.asset_name,
            "artist": item.collection_id.artist,
            "url": `https://byzantion.xyz/collection/${item.slug}/${item.token_id}`,
            "userid": auth.wallet_id
        })
    }
    
    return (
        <div className="nftCard" key={item._id} id={`${item.contract_key.split('.')[1]}_${token_id}`}>
            <div className="nftCard--image">
                <div className="nftCard--image--padding">
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 274 300"><image width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xlinkHref={optimizedImage} mask="url(#image-mask)" onLoad={()=> setImageLoaded(true)} onError={()=>loadErrorImg("optimizedImage")}></image></svg>
                {(!imageLoaded) &&
                    <div className="loading-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                }
            </div>
            <div className="nftCard--text">
                <div className="nftCard--text--header">
                    <h4>{name}</h4>
                </div>
                <div className="nftCard--text--details">
                    <div className="nftCard--text--details--detail">
                        <span>BGR</span>
                        <span>{BGR}%</span>
                    </div>
                </div>
            </div>
            <div className="nftCard--quick-actions">

                {(staked) &&
                     <a onClick={(e) => {
                         e.stopPropagation();
                         onclickFunction(item)
                     }} className="button--secondary">Unstake</a>
                }

                {(!staked) &&
                <>
                    {(!listed) &&
                         <a onClick={(e) => {
                             e.stopPropagation();
                             onclickFunction(item)
                         }} className="button--primary" id={`stake_${item.contract_key.split('.')[1]}_${token_id}`}>Stake</a>
                    }
                    {(listed) &&
                        <a onClick={(e) => {
                            e.stopPropagation();
                            quickUnlistFunction()
                        }} className="button--primary">Unlist</a>
                    }
                </>
                }

                <a href={slug} className="viewnft">View on Byzantion</a>
            </div>
            <div className="nftCard--shadow">
                <span className="nftCard--shadow--edge"></span>
            </div>
        </div>
            
    )
}
