import axios from "axios"

export const STXtoUSD = async () => {
    let USDpricePerStack = 0
    await axios({
        method: "GET",
        url: "https://www.binance.com/bapi/asset/v2/public/asset-service/product/get-product-by-symbol?symbol=STXUSDT",
    })
    .then((response) => {
        const {c} = response.data.data
        console.log("STXtoUSD Response - ", response.data.data.c)
        USDpricePerStack = c
    })
    .catch((error) => {
        console.log("STXtoUSD Error - ", error)
    })
    return USDpricePerStack
}