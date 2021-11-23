import mpg_data from "./data/mpg_data.js";
import {getMedian, getStatistics} from "./medium_1.js";
import {getSum} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: {
        city: (getSum(mpg_data.map((car) => car.city_mpg))),
        highway: (getSum(mpg_data.map((car) => car.highway_mpg)))
    },
    allYearStats: getStatistics(mpg_data.map(car => car.year)),
    ratioHybrids: (getSum(mpg_data.map(car => car.hybrid)) / mpg_data.length),
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: mpg_data.reduce(function (array, car)
    {
        if(car["hybird"])
        {
            let key = car["make"];
            let i = array.findIndex(x => x["make"] == key);
            if(i == -1)
            {
                array.push({"make": car["make"], "hybrids": [car["id"]]});
            }
            else
            {
                array[i].hybrids.push(car["id"]);
            }
        }
        return array;
    }, []).sort((a,b) => (b.hybrids.length - a.hybrids.length)),
    avgMpgByYearAndHybrid: undefined //avgMpgByYearAndHybrid(mpg_data)
};

/*function avgMpgByYearAndHybrid(mpg)
{
    let yr_arr = mpg.reduce(function (array, car){
        let key = car["year"];
        if(!array[key])
        {
            array[key] = {
                "hybrid": {
                    "city": 0,
                    "highway": 0,
                    "count": 0
                },
                "notHybrid": {
                    "city": 0,
                    "highway": 0,
                    "count": 0
                }
            }
        }
        if(car["hybrid"])
        {
            array[key].hybrid.city += car.city_mpg;
            array[key].hybrid.highway += car.highway_mpg;
            array[key].hybrid.count += 1;
        }
        else
        {
            array[key].noHybrid.city += car.city_mpg;
            array[key].notHybrid.highway += car.highway_mpg;
            array[key].notHybrid.count += 1;
        }
        return array;
    }, {});

    for(let year in year_arr)
    {
        year_arr[year].hybrid.city = year_arr[year].hybrid.city / year_arr[year].hybrid.count;
        year_arr[year].hybrid.highway = year_arr[year].hybrid.highway / year_arr[year].hybrid.count;
        delete year_arr[year].hybrid.count;

        year_arr[year].notHybrid.city = year_arr[year].notHybrid.city / year_arr[year],notHybrid.count;
        year_arr[year].notHybrid.highway = year_arr[year].notHybrid.highway / year_arr[year].notHybrid.count;
        delete year_arr[year].notHybrid.count;
    }
    return year_arr;
}*/
