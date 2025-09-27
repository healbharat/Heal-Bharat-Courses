import type { CodingProblem } from '../types';

export const codingProblems: CodingProblem[] = [
  { 
    id: 1, 
    title: 'Two Sum', 
    difficulty: 'Easy', 
    category: 'Arrays',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
    
};`,
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]'
      },
      {
        input: 'nums = [3, 3], target = 6',
        output: '[0, 1]'
      }
    ]
  },
  { 
    id: 2, 
    title: 'Reverse a String', 
    difficulty: 'Easy', 
    category: 'Strings',
    description: `Write a function that reverses a string. The input string is given as an array of characters \`s\`.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    starterCode: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    
};`,
    examples: [
        {
            input: 's = ["h","e","l","l","o"]',
            output: '["o","l","l","e","h"]'
        },
        {
            input: 's = ["H","a","n","n","a","h"]',
            output: '["h","a","n","n","a","H"]'
        }
    ]
  },
  { 
    id: 4, 
    title: 'Validate Palindrome', 
    difficulty: 'Medium', 
    category: 'Strings',
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.`,
    starterCode: `/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    
};`,
    examples: [
        {
            input: 's = "A man, a plan, a canal: Panama"',
            output: 'true',
            explanation: '"amanaplanacanalpanama" is a palindrome.'
        },
        {
            input: 's = "race a car"',
            output: 'false',
            explanation: '"raceacar" is not a palindrome.'
        }
    ]
  },
  {
    id: 6,
    title: 'Merge Two Sorted Lists',
    difficulty: 'Hard',
    category: 'Linked Lists',
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

*(Note: For this frontend-only exercise, you can simulate the ListNode object as needed in your solution code.)*`,
    starterCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    
};`,
    examples: [
        {
            input: 'list1 = [1,2,4], list2 = [1,3,4]',
            output: '[1,1,2,3,4,4]'
        },
        {
            input: 'list1 = [], list2 = [0]',
            output: '[0]'
        }
    ]
  }
];
