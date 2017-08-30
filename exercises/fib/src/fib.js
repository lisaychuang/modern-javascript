/**
 * Generate a sequence of fibonacci numbers, with a given length
 *
 * @export
 * @param {any} length length of sequence to generate
 * @returns {number[]} fibonacci sequence
 */

export function getFibSequence(length) {
  // TODO: replace this with your implementation
  if (typeof length === 'undefined' || length === null 
    || (typeof length === 'number' && length < 0)) 
    return undefined;
    
  if (length === 0) return [];
  if (length === 1) return [1];

  let fib = [1,1];

  for (let i =2; i< length; i++){
    fib.push(fib[i-1] + fib[i-2])
  }
  return fib;
}
