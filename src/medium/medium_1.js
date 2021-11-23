import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) 
{
	//No idea what format output should be in...
	var total = 0;
	for (var i in array) 
	{
		total += array[i];
	}
	return total;
}

export function getAvg(array)
{
	return getSum(array) / array.length;
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) 
{
	const middle = Math.floor(array.length / 2);
	const nums = [...array].sort((a,b) => a-b);
	return array.length % 2 !== 0 ? nums[middle] : (nums[middle -1] + nums[middle]) /2;
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array)
{
	var len = array.length;
	var sum = getSum(array);
	var mean = sum / len;
	var median = getMedian(array);
	var min = Math.min(...array);
	var max = Math.max(...array);
	var vari = variance(array, mean);
	var std = Math.sqrt(vari);
	return {length: len, sum: sum, mean: mean, median: median, min: min, max: max, variance: vari, standard_deviation: std}
}

