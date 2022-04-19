import styles from '../styles/pages/Home.module.css'
import { useState, useEffect,useCallback } from 'react'
import Link from 'next/link';
import { AppConfig, UserSession, showConnect, authenticate } from '@stacks/connect'
import {NFT} from '../components/NFT'
import {
  FungibleConditionCode,
  makeStandardSTXPostCondition,
  makeContractSTXPostCondition,
  callReadOnlyFunction,
} from '@stacks/transactions';

import axios from 'axios'
import moment from 'moment'
import { bananasEarned, stakeMonkey, unStakeMonkey, harvestMonkey, getStaked, getHarvest } from '../lib/env'
import { forEach } from 'lodash';

const appConfig = new AppConfig(['publish_data']);
const userSession = new UserSession({ appConfig });

const stacksNet = 'mainnet';


export default function Home({imgArr}) {
    const [auth, setAuth] = useState({
        login: false,
        wallet_id: "",
    })
    const [totalMonkeysStaked, setTotalMonkeysStaked] = useState(0)
    const [totalMonkeys, setTotalMonkeys] = useState(5000)
    const [percentageStaked, setPercentageStaked] = useState(0)
    const [bananas, setBananas] = useState(0)
    const [bananasWallet, setBananasWallet] = useState(0)
    const [bananasHarvestPool, setBananasHarvestPool] = useState(0)
    const [bananasEarning, setBananasEarning] = useState(0)
    const [notStakedMonkeys, setNotStakedMonkeys] = useState([])
    const [stakedMonkeys, setStakedMonkeys] = useState([])
    const [harvestPool, setHarvestPool] = useState([])
    const [BGRs, setBGRs] = useState([])
    const [stakedBGRs, setStakedBGRs] = useState([])

    
    useEffect( async () => {
        if (userSession.isSignInPending()) {
            userSession.handlePendingSignIn().then(userData => {
                // Save or otherwise utilize userData post-authentication
                userData = userSession.loadUserData();
                setAuth({
                login: true,
                wallet_id: userData.profile.stxAddress[stacksNet]
                })
                GetDetails(userData.profile.stxAddress[stacksNet])
            });
        } else if (userSession.isUserSignedIn()) {
            // Handle case in which user is already authenticated
            let userData = userSession.loadUserData();
            setAuth({
                login: true,
                wallet_id: userData.profile.stxAddress[stacksNet],
            })
            GetDetails(userData.profile.stxAddress[stacksNet])
        }

        // Load in % of monkeys staked
        //replace with stake contract
        const monkeysStaked = await axios({
            // url: "https://stacks-node-api.mainnet.stacks.co/extended/v1/address/SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.byzantion-market-v5/balances",
            url: "https://stacks-node-api.mainnet.stacks.co/extended/v1/address/SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7.mutant-staking/balances",
            method: "GET"
        }).then(res => {
            // console.log("checking for contract balance ",res.data)
            // const {count} = res.data.non_fungible_tokens['SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.bitcoin-monkeys::bitcoin-monkeys']
            const {count} = res.data.non_fungible_tokens['SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7.mutant-monkeys::mutant-monkeys']
            setTotalMonkeysStaked(count)
            const percentage = ((count / totalMonkeys) * 100).toFixed(0)
            setPercentageStaked(percentage)
            let processBar = document.getElementById("processBar");
            processBar.style.width = percentage+"%"
        }).catch(error => {
            console.log(error)
        })
        
    }, [])


    const authenticated = () => {
        
        showConnect({
        appDetails: {
            name: 'Byzantion',
            icon: "https://cdn.discordapp.com/attachments/798985555546341376/884824197866618880/melbrot_12.png"
        },
        redirectTo: '/',
        onFinish: async () => {
            let userData = userSession.loadUserData();
            setAuth({
                login: true,
                wallet_id: userData.profile.stxAddress[stacksNet]
            })
            GetDetails(userData.profile.stxAddress[stacksNet])
        },
        userSession: userSession,
        })        
    }

    const logout = () => {
        userSession.signUserOut()
        setAuth({
            login: false,
            wallet_id: "",
        })
    }

    const GetDetails = async (principal) => {

            // Get monkeys not staked
            const get_unstaked_monkeys = axios({
                url: `/api/get_unstaked_monkeys?principal=${principal}`,
                method: "GET"
            }).then(res => {
                // console.log("get_unstaked_monkeys", res.data)
                setNotStakedMonkeys(res.data.nftList)
                setBGRs(res.data.nftListBGR)
                //test comment
                res.data.pendingTransactions.map((t)=>{
                    let token
                    let contractName
                    // console.log("Transaction", t)
                    if (t.tx_status == "pending") {
                        if (t.contract_call.function_name == "stake") {
                            // console.log("t.post_condition[0].asset_value",t.post_conditions[0].asset_value.repr)
                            token = t.post_conditions[0].asset_value.repr
                            contractName = t.post_conditions[0].asset.contract_name
                        }
                        if (t.contract_call.function_name == "unstake") {
                            // console.log("t.contract_call.function_args[2].repr",t.contract_call.function_args[2].repr)
                            token = t.contract_call.function_args[2].repr
                            contractName = t.contract_call.function_args[1].repr.split('.')[1]
                            
                        }

                        contractName = contractName.replace("fluttering-beige-panda","mutant-monkeys")
                        token = token.replace("u","")

                        if (token !== "" && contractName != "") {
                            let nftCard = document.getElementById(`${contractName}_${token}`);
                            let nftCard_button = document.getElementById(`stake_${contractName}_${token}`);
                            if(nftCard) {
                                nftCard.classList.add("currently-staking");
                            }
                            if(nftCard_button) {
                                nftCard_button.innerHTML = "Stake pending"
                                nftCard_button.disabled = true;
                            }
                        }
                    }
                })

            })
            
            
            const staked = await getStaked(principal)
            // console.log("Staked Data", staked)
            if (staked !== undefined && staked.list.length > 0) {
                let monkeys = []
                staked.list.forEach((i)=> monkeys.push(Number(i.value)))
                // console.log("staked from owner ",monkeys)
                axios({
                    url: `/api/get_staked_monkeys`,
                    method: "POST",
                    data: {
                        monkeys: monkeys
                    }
                }).then(res => {
                    setStakedMonkeys(res.data.nftList)
                    // console.log("res.data.nftListBGR",res.data.nftListBGR)
                    setStakedBGRs(res.data.nftListBGR)
                }).catch(error => {
                    console.log(error)
                })
                
            }
            
            // Go Get Bananas Earned
            const bananas = await bananasEarned(principal)
            // console.log("bananas", bananas)
            if (bananas != undefined && 'value' in bananas.value) {
                setBananas((Number(bananas.value.value.data['lifetime-points'].value) / 1000000).toFixed(3))
                setBananasEarning((Number(bananas.value.value.data['total-bgr'].value) / 10000).toFixed(3))
            }

            // Go Get Harvest Pool dfj
            const harv = await getHarvest(principal)
            // console.log("harvest pool", harv)
            if (harv != undefined) {
                setBananasHarvestPool((Number(harv.value) / 1000000).toFixed(3))
            }
            

            await axios({
                // url: "https://stacks-node-api.mainnet.stacks.co/extended/v1/address/SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.byzantion-market-v5/balances",
                url: `https://stacks-node-api.mainnet.stacks.co/extended/v1/address/${principal}/balances`,
                method: "GET"
            }).then(res => {
                // console.log("checking for USers balance ",res.data)
                if (res.data.fungible_tokens['SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7.slime::SLIME'] != undefined) {
                    setBananasWallet((Number(res.data.fungible_tokens['SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7.slime::SLIME'].balance) / 1000000).toFixed(3))
                }
            })

            // Go get Amount of Monkeys staked and Monkeys

            // setPercentageStaked(75)
            
    }

    const claimBananas = () => {
        // console.log("Claim Bananas", auth.wallet_id)
    }

    const stakeNFT = async (item) => {
        const monkeystaked = await stakeMonkey(auth, item)

        // console.log("monkeystaked",monkeystaked)
    }

    const unStakeNFT = (item) => {
        unStakeMonkey(auth, item)
    }

    const harvestNFTs = () => {
        // getStaked(auth, item)
        harvestMonkey()
    }

    const [scoring, setScoring] = useState([
        {
            img: "https://byzantion.mypinata.cloud/ipfs/QmaELQUAgrcjvokrKmH6ns5QvbipfWGNEWPV57GbSS3N34?img-width=800&img-height=800&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp",
            type: "MM1",
            BGR: "100"
        },
        {
            img: "https://byzantion.mypinata.cloud/ipfs/Qmd5b6m7N9FQatcLBipDXd1b2E2tBwTY7z9fWBirry4KSJ?img-width=800&img-height=800&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp",
            type: "MM2",
            BGR: "250"
        },
        {
            img: "https://byzantion.mypinata.cloud/ipfs/QmTSsnSZFMDmnbNz23yamkA9rERtz9FTVVHPjCZbf3R971?img-width=800&img-height=800&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp",
            type: "MM3",
            BGR: "2000"
        },
    ])


    return (
        // Each monkey earns 2 monkey per day.
        <div className="bm-stacking">
            <div className="bm-stacking--hero">
                <div className="container">
                    <div className="bm-stacking--hero--left">
                        <div className="bm-stacking--hero--left--intro">
                            <img src="https://bitcoin-monkey-mutation-chamber-2ruok1tkp-plutus-exchange.vercel.app/assets/bitcoin-monkeys/MM-LOGO-768x384.png" alt="Bitcoin Monkeys" className="logo" />
                            <img src="/assets/bitcoin-monkeys/hero-images/3.png" alt="Bitcoin Monkey" className="bm-monkey" />
                        </div>
                        <h3>SLIME is part of the Mutant Monkey ecosystem. As the ecosystem grows, more utility will be added – increasing the utility of SLIME. However, there will only be a supply of 4,000,000 SLIME. Each mutant earns a base rate of 2 SLIME per day.</h3>
                        <span>Stake to earn SLIME tokens <a href="#whatIsStaking">What is Staking?</a></span>
                        <span className="disclaimer">*SLIME is a utility token used in the Bitcoin Monkeys ecosystem. It is NOT an investment and has NO economic value.</span>
                        <div className="social">
                            <ul>
                                <li><a href="https://discord.gg/CbsScbyCxs" target="_blank" rel="noreferrer"><img src="/assets/bitcoin-monkeys/discord.svg" alt="Discprd" /></a></li>
                                <li><a href="https://twitter.com/btcmonkeys" target="_blank" rel="noreferrer"><img src="/assets/bitcoin-monkeys/twitter.svg" alt="Twiiter" /></a></li>
                                <li><a href="https://instagram.com/BTCMonkeys" target="_blank" rel="noreferrer"><img src="/assets/bitcoin-monkeys/instagram.svg" alt="Instgram" /></a></li>
                                <li><a href="https://bitcoinmonkeys.io/" target="_blank" rel="noreferrer"><img src="/assets/bitcoin-monkeys/website.svg" alt="website" /></a></li>
                            </ul>
                            <a href="https://byzantion.xyz/marketplace/bitcoin-monkeys">Buy and Sell Bitcoin Monkeys on Byzantion</a>
                        </div>

                    </div>
                    <div className="bm-stacking--hero--right">
                        <ul>
                            <li><img src="https://byzantion.mypinata.cloud/ipfs/QmWAYP9LJD15mgrnapfpJhBArG6T3J4XKTM77tzqggvP7w?img-width=800&img-height=800&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp" alt="Bitcoin Monkey 3" /></li>
                            <li><img src="https://byzantion.mypinata.cloud/ipfs/Qmc56xchmRvxTenZ3bXNkzkhkbxmdHAx2gZCaHRmU3Dtsv?img-width=800&img-height=800&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp" alt="Bitcoin Monkey 1" /></li>
                            <li><img src="https://byzantion.mypinata.cloud/ipfs/QmSLsPfZTevanGBEMmqxMYkSwrR5A2tf9yjH9en9grjqrw?img-width=800&img-height=800&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp" alt="Bitcoin Monkey 2" /></li>    
                            <li><img src="https://byzantion.mypinata.cloud/ipfs/QmQJ5pCwbqtpuEqpS62mbEcSudCwW9p6JsCGu2R2k9xt5b?img-width=800&img-height=800&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp" alt="Bitcoin Monkey 13" /></li>
                            <li><img src="https://byzantion.mypinata.cloud/ipfs/QmX1USyAXYMECmLihzZKDyahZVK9jtNG9Ps87TFmj2dbRc?img-width=800&img-height=800&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp" alt="Bitcoin Monkey 5" /></li>
                            <li><img src="https://byzantion.mypinata.cloud/ipfs/QmR26DpNqzyht1VFg8dwd1McCoEQ3PLfVg2DQ6f9WFVvHt?img-width=800&img-height=800&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp" alt="Bitcoin Monkey 6" /></li>
                            <li><img src="https://byzantion.mypinata.cloud/ipfs/Qmdo4mrSoJWxhsePaUKcjL1aYXJjVFDkda4xguJHL83ZVy?img-width=800&img-height=800&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp" alt="Bitcoin Monkey 7" /></li>
                            <li><img src="https://byzantion.mypinata.cloud/ipfs/QmcqLVYJAMC2hrx5x54xzveCBgxmZmsHBk4JPqCKbw5qF6?img-width=800&img-height=800&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp" alt="Bitcoin Monkey 8" /></li>
                            <li><img src="https://byzantion.mypinata.cloud/ipfs/QmY9h5DvzeQPk5x2fP1sMuesnVrbtftvJezgfrDAtt4XkQ?img-width=800&img-height=800&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp" alt="Bitcoin Monkey 9" /></li>
                            <li><img src="https://byzantion.mypinata.cloud/ipfs/QmasH2C7T2WSoPdwWykZiLFfj8PKaGbdYgni31SYSagXh7?img-width=800&img-height=800&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp" alt="Bitcoin Monkey 11" /></li>
                            <li><img src="https://byzantion.mypinata.cloud/ipfs/QmegR47cbC3yqYgdA97mG7H6iHVXPtomBN4DXjr54uRhTj?img-width=800&img-height=800&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp" alt="Bitcoin Monkey 10" /></li>
                            <li><img src="https://byzantion.mypinata.cloud/ipfs/QmW9WPuoRfecfUqQT8p43xMdZbSAq6rRhuKcchukyykKm9?img-width=800&img-height=800&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp" alt="Bitcoin Monkey 12" /></li>
                            <li><img src="https://byzantion.mypinata.cloud/ipfs/QmYAuyqeYhRcgu4UC43BgoHqkTgC6ZN6BqwT91dyRLjQxV?img-width=800&img-height=800&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp" alt="Bitcoin Monkey 4" /></li>
                            <li><img src="https://byzantion.mypinata.cloud/ipfs/QmYqNwFBcSgEdBKWPXGChHVAWfCBTuqfhBnupGouMbW48g?img-width=800&img-height=800&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp" alt="Bitcoin Monkey 14" /></li>
                            <li><img src="https://byzantion.mypinata.cloud/ipfs/QmNvypmDzBUCQMPF8iYw81NqMzPN9f2TPp2GUE4ja9Nqa3?img-width=800&img-height=800&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp" alt="Bitcoin Monkey 15" /></li>
                        </ul>
                        <span className="disclaimer">*SLIME is a utility token used in the Bitcoin Monkeys ecosystem. It is NOT an investment and has NO economic value.</span>
                        {(auth.login) &&
                            <div className="wallet">
                                <h3>{auth.wallet_id.slice(0,4)}...{auth.wallet_id.slice(-4)}</h3>
                                <a onClick={() => logout()} className="button--secondary">Disconnect</a>
                            </div>
                        }
                    </div>
                </div>


                <div className="bm-stacking--monkeys-staked container">
                    <h2>{percentageStaked}% Bitcoin Monkeys Staked</h2>
                    <span className="bm-stacking--monkeys-staked--count h2">{totalMonkeysStaked}/{totalMonkeys}</span>

                    <div className="bm-stacking--monkeys-staked--bar">
                        <div className="bar">
                            <span></span>
                            <span></span>
                        </div>
                        <div className="process" id="processBar"></div>
                    </div>
                </div>


                {(!auth.login) &&

                    <div className="container">
                        <div className="bm-stacking--hero--actions">
                            <a className="button--primary" onClick={() => authenticated()}>Connect to Stake</a>
                            <a className="button--secondary" href="https://byzantion.xyz/marketplace/bitcoin-monkeys">Buy on Byzantion</a>
                        </div>
                    </div>
                }
                {(auth.login) &&
                    <div className="bm-stacking--wallet container">
                        <div className="bm-stacking--wallet--card">
                            <h3>Lifetime $SLIME earned</h3>
                            <div className="bm-stacking--wallet--card--bananas">
                                <span>{bananas}</span>
                                <img src="https://images.ctfassets.net/frwmwlognk87/2V50JwTfywuU2liZlWYdqg/4b9bd5306dad78ab5b044f000d863794/Untitled.png" alt="Bananas Earned"/>
                            </div>
                        </div>
                        <div className="bm-stacking--wallet--card">
                            <h3>$SLIME held in wallet</h3>
                            <div className="bm-stacking--wallet--card--bananas">
                                <span>{bananasWallet}</span>
                                <img src="https://images.ctfassets.net/frwmwlognk87/2V50JwTfywuU2liZlWYdqg/4b9bd5306dad78ab5b044f000d863794/Untitled.png" alt="Bananas Earned"/>
                            </div>
                        </div>
                        <div className="bm-stacking--wallet--card harvest-pool">
                            <h3>Current Harvest Pool</h3>
                            <div className="bm-stacking--wallet--card--bananas">
                                <span>{bananasHarvestPool}</span>
                                <img src="https://images.ctfassets.net/frwmwlognk87/2V50JwTfywuU2liZlWYdqg/4b9bd5306dad78ab5b044f000d863794/Untitled.png" alt="Bananas Earned"/>
                                <a 
                                    onClick={()=> harvestNFTs()} 
                                    className="button--primary harvest-button">Collect</a>
                            </div>
                            <h4>Earning {2 * bananasEarning } $SLIME / Day</h4>
                        </div>
                        <div className="bm-stacking--wallet--card nfts">
                            <h3>{notStakedMonkeys.length > 0? "Monkeys you can stake":"No Monkeys to stake"}</h3>
                            <div className="nftList--contents">
                                {notStakedMonkeys.map((i,idx) => (
                                    <NFT key={i._id} item={i} onclickFunction={()=> stakeNFT(i)} staked={false} BGR={BGRs[idx]?.BGR} auth={auth} />
                                ))}
                            </div>
                            <a className="button--secondary" href="https://byzantion.xyz/marketplace/bitcoin-monkeys" target="">Buy on Byzantion</a>
                        </div>
                        <div className="bm-stacking--wallet--card nfts">
                            <h3>{stakedMonkeys.length} Monkeys staked</h3>
                            <div className="nftList--contents">
                                {stakedMonkeys.map((i,idx) => (
                                    <NFT key={i._id} item={i} onclickFunction={()=> unStakeNFT(i)} staked={true} BGR={stakedBGRs[idx]?.BGR} auth={auth} />
                                ))}
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="bm-stacking--info" id="whatIsStaking">
                <div className="container">
                    <div className="bm-stacking--info--text">
                        <h2>What is Bitcoin Monkey Staking?</h2>
                        <p>To earn SLIME, Monkeys will need to be Staked. Each of the 5000 Monkey’s will earn SLIME at a certain SLIME Generation Rate (BGR). This will be based on the total of the following:</p>
                        <p><b>Baseline BGR:</b> 2 SLIME gained every 24 hours, assuming 144 blocks per day (all Monkeys have the baseline BGR rate)</p>
                        <p><b>Bonus BGR:</b> A bonus percentage on top of the baseline BGR will be applicable to certain Monkey traits. With SLIME as our backbone utility token for the ecosystem, there are still plenty of treasures in The Jungle to uncover with Bitcoin Monkeys! And so, the legend of the Monkeys continues…</p>
                        <h3>How much does Staking cost?</h3>
                        <p>Staking/unstaking will cost a small fee of <b>5 STX</b> per Monkey. This is for a number of reasons:</p>
                        <ul>
                            <li>2 STX will be used to fund the continuous building, development and maintenance of the Staking & SLIME ecosystem.</li>
                            <li>2 STX will be used to help fund the SLIME ecosystem, Monkey Store and other rewards.</li>
                            <li>1 STX will be used to fund the endeavors of the community Jungle Club proposals.</li>
                        </ul>
                        <br></br>
                        <p>However there will be no fee for unstaking your Monkeys if they are staked until all 1 million SLIME&apos;s have been depleted! Hence, rewarding you for holding and staking your Monkeys!</p>
                    </div>
                    <div className="bm-stacking--info--bgr">
                        <h2>SLIME Generation Rate (BGR)</h2>
                        <div className="bm-stacking--info--bgr--items">
                            {scoring.map((i, idx) => {
                                return (
                                    <div key={idx} className="bm-stacking--info--bgr--item">
                                        <img src={i.img} alt={i.type} />
                                        <span>{i.BGR}%</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>
            <div className="poweredBy">
                <div className="container">
                <a href="https://byzantion.xyz/">Powered by Byzantion</a></div>
            </div>

        </div>
  )
}
