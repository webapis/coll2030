
import { deepEqual } from 'object-agent'
export default function mergePrevAndNewData({ gender, marka, data, prevData }) {
    debugger
    // const prevDataRaw = fs.readFileSync(`single-content/${gender}/${marka}.json`, { encoding: 'utf8' })
    // const prevData = JSON.parse(prevDataRaw)
    const filterDataToBeDeleted = (arr1, arr2) => {
        let res = [];
        res = arr1.filter(el => {
            return !arr2.find(element => {
                return element.imageUrl === el.imageUrl;
            });
        });
        return res;
    }
    const filterDataToBeUpdated = (arr1, arr2) => {
        let res = [];
        res = arr1.filter(el => {
            return arr2.find(element => {
                return element.imageUrl === el.imageUrl;
            });
        });
        return res;
    }
    const dataToBeDeleted = filterDataToBeDeleted(prevData, data).map((m) => { return { ...m, delete: true } })
    const dataToBeUpdated = filterDataToBeUpdated(prevData, data)
    debugger
    let mergedData = []
    mergedData = dataToBeUpdated.map((p) => {
        const matchC = data.find(c => c.imageUrl === p.imageUrl)
        delete matchC.timestamp
        const prevData = p
        delete prevData.timestamp
        if (matchC) {
            debugger
            if (deepEqual(matchC, prevData)) {
                debugger
                return {
                    ...matchC, update: false
                }
                // uptodate data
            } else {
                debugger
                //slate data
                return { ...matchC, update: true }

            }
        } else {
            //new data
            return p
        }
    })
    debugger
    return [...mergedData, ...dataToBeDeleted]



}