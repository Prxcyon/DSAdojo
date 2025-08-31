import { Lesson, Challenge, LeaderboardUser, DataStructureCategory } from '../types';

// Import fundamentals for basics
import fundamentalsQuestions from './dsa_fundamentals_questions.json';
// Import Python questions
import pythonArray from './python/array_questions.json';
import pythonStack from './python/stack_questions.json';
import pythonQueue from './python/queue_questions.json';
import pythonLinkedList from './python/linkedlist_questions.json';
import pythonString from './python/string_questions.json';
import pythonBitManipulation from './python/bit_manipulation_questions.json';
import pythonSlidingWindow from './python/sliding_window_questions.json';
import pythonDP from './python/dynamic_programming_questions.json';
import pythonBinaryTree from './python/binary_trees_questions.json';
import pythonGraph from './python/graph_questions_python.json';
// Import Java questions
import javaArray from './java/java_array_questions.json';
import javaStack from './java/stack_java_questions.json';
import javaQueue from './java/queue_java_questions.json';
import javaLinkedList from './java/linkedlist_java_questions.json';
import javaString from './java/java_string_questions.json';
import javaBitManipulation from './java/bit_manipulation_java.json';
import javaSlidingWindow from './java/sliding_window_java_questions.json';
import javaDP from './java/java_dp_questions.json';
import javaBinaryTree from './java/java_binary_tree_questions.json';
import javaGraph from './java/graph_questions_java.json';
// Import C++ questions
import cppArray from './cpp/array_questions_cpp.json';
import cppStack from './cpp/stack_cpp_questions.json';
import cppQueue from './cpp/queue_cpp_questions.json';
import cppLinkedList from './cpp/linkedlist_cpp_questions.json';
import cppString from './cpp/string_cpp_questions.json';
import cppBitManipulation from './cpp/bit_manipulation_cpp.json';
import cppSlidingWindow from './cpp/sliding_window_cpp.json';
import cppDP from './cpp/dp_questions_cpp.json';
import cppGraph from './cpp/graph_questions_cpp.json';

// Helper to get questions by language
const getQuestionsByLanguage = (lang: string) => {
  if (lang === 'python') {
    return {
      array: pythonArray,
      stack: pythonStack,
      queue: pythonQueue,
      linkedlist: pythonLinkedList,
      string: pythonString,
      'bit-manipulation': pythonBitManipulation,
      'sliding-window': pythonSlidingWindow,
      dp: pythonDP,
      'binary-tree': pythonBinaryTree,
      graphs: pythonGraph
    };
  } else if (lang === 'java') {
    return {
      array: javaArray,
      stack: javaStack,
      queue: javaQueue,
      linkedlist: javaLinkedList,
      string: javaString,
      'bit-manipulation': javaBitManipulation,
      'sliding-window': javaSlidingWindow,
      dp: javaDP,
      'binary-tree': javaBinaryTree,
      graphs: javaGraph
    };
  } else if (lang === 'cpp') {
    return {
      array: cppArray,
      stack: cppStack,
      queue: cppQueue,
      linkedlist: cppLinkedList,
      string: cppString,
      'bit-manipulation': cppBitManipulation,
      'sliding-window': cppSlidingWindow,
      dp: cppDP,
      graphs: cppGraph
    };
  }
  return {};
};

// Combine all questions with explicit language assignment based on import
const allQuestions = [
  // Python
  ...pythonArray.map(q => ({ ...q, _importLang: 'python' })),
  ...pythonStack.map(q => ({ ...q, _importLang: 'python' })),
  ...pythonQueue.map(q => ({ ...q, _importLang: 'python' })),
  ...pythonLinkedList.map(q => ({ ...q, _importLang: 'python' })),
  ...pythonString.map(q => ({ ...q, _importLang: 'python' })),
  ...pythonBitManipulation.map(q => ({ ...q, _importLang: 'python' })),
  ...pythonSlidingWindow.map(q => ({ ...q, _importLang: 'python' })),
  ...pythonDP.map(q => ({ ...q, _importLang: 'python' })),
  ...pythonBinaryTree.map(q => ({ ...q, _importLang: 'python' })),
  ...pythonGraph.map(q => ({ ...q, _importLang: 'python' })),
  // Java
  ...javaArray.map(q => ({ ...q, _importLang: 'java' })),
  ...javaStack.map(q => ({ ...q, _importLang: 'java' })),
  ...javaQueue.map(q => ({ ...q, _importLang: 'java' })),
  ...javaLinkedList.map(q => ({ ...q, _importLang: 'java' })),
  ...javaString.map(q => ({ ...q, _importLang: 'java' })),
  ...javaBitManipulation.map(q => ({ ...q, _importLang: 'java' })),
  ...javaSlidingWindow.map(q => ({ ...q, _importLang: 'java' })),
  ...javaDP.map(q => ({ ...q, _importLang: 'java' })),
  ...javaBinaryTree.map(q => ({ ...q, _importLang: 'java' })),
  ...javaGraph.map(q => ({ ...q, _importLang: 'java' })),
  // C++
  ...cppArray.map(q => ({ ...q, _importLang: 'cpp' })),
  ...cppStack.map(q => ({ ...q, _importLang: 'cpp' })),
  ...cppQueue.map(q => ({ ...q, _importLang: 'cpp' })),
  ...cppLinkedList.map(q => ({ ...q, _importLang: 'cpp' })),
  ...cppString.map(q => ({ ...q, _importLang: 'cpp' })),
  ...cppBitManipulation.map(q => ({ ...q, _importLang: 'cpp' })),
  ...cppSlidingWindow.map(q => ({ ...q, _importLang: 'cpp' })),
  ...cppDP.map(q => ({ ...q, _importLang: 'cpp' })),
  ...cppGraph.map(q => ({ ...q, _importLang: 'cpp' })),
];

// Helper function to parse question ID and extract category, difficulty, and language
const parseQuestionId = (id: string, fallbackLang?: string) => {
  const parts = id.split('-');
  let category = 'unknown';
  let difficulty = 'easy';
  let language = fallbackLang || 'python';

  if (parts.length >= 3) {
    const difficultyIndex = parts.findIndex(part => ['easy', 'medium', 'hard'].includes(part));
    if (parts.includes('cpp')) {
      language = 'cpp';
    } else if (parts.includes('java')) {
      language = 'java';
    }
    let baseCategory = parts.slice(0, difficultyIndex);
    if (baseCategory[0] === 'java' || baseCategory[0] === 'cpp') {
      baseCategory = baseCategory.slice(1);
    }
    if (baseCategory[baseCategory.length - 1] === 'java' || baseCategory[baseCategory.length - 1] === 'cpp') {
      baseCategory = baseCategory.slice(0, -1);
    }
    category = baseCategory.join('-');
    difficulty = parts[difficultyIndex];
  } else {
    category = parts[0];
    difficulty = parts[1];
  }
  return { category, difficulty, language };
};

// Group questions by category, difficulty, and language (use _importLang if present)
const groupedQuestions = allQuestions.reduce((acc, question) => {
  const { category, difficulty, language } = parseQuestionId(question.id, question._importLang);
  if (!acc[category]) {
    acc[category] = {};
  }
  if (!acc[category][difficulty]) {
    acc[category][difficulty] = {};
  }
  if (!acc[category][difficulty][language]) {
    acc[category][difficulty][language] = [];
  }
  acc[category][difficulty][language].push(question);
  return acc;
}, {} as Record<string, Record<string, Record<string, any[]>>>);

// Generate lessons dynamically from questions
const generateLessons = (): Lesson[] => {
  const lessons: Lesson[] = [];
  let lessonId = 1;

  // Helper to map difficulty
  const mapDifficulty = (diff: string): 'beginner' | 'intermediate' | 'advanced' => {
    if (diff === 'easy') return 'beginner';
    if (diff === 'medium') return 'intermediate';
    return 'advanced';
  };

  // Process each category
  Object.entries(groupedQuestions).forEach(([category, difficulties]) => {
    // Process each difficulty level
    Object.entries(difficulties).forEach(([difficulty, languages]) => {
      // Process each language
      Object.entries(languages).forEach(([language, questions]) => {
        if (questions.length > 0) {
          const languageDisplay = language === 'cpp' ? 'C++' : language === 'java' ? 'Java' : 'Python';
          
          const lesson: Lesson = {
            id: lessonId.toString(),
            title: `${category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')} - ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} (${languageDisplay})`,
            description: `Learn ${category.replace(/-/g, ' ')} concepts at ${difficulty} level using ${languageDisplay}`,
            type: 'practice',
            difficulty: mapDifficulty(difficulty),
            xpReward: difficulty === 'easy' ? 50 : difficulty === 'medium' ? 75 : 100,
            language: language as 'python' | 'cpp' | 'java',
            unit: category, // This now matches the category ID exactly
            content: {
              explanation: `This lesson covers ${category.replace(/-/g, ' ')} concepts at ${difficulty} level using ${languageDisplay}.`,
              codeExample: getCodeExample(category, language),
              questions: questions
            },
            isCompleted: Math.random() > 0.7, // Randomly mark some as completed
            isLocked: false,
            crownLevel: Math.random() > 0.8 ? Math.floor(Math.random() * 3) + 1 : 0
          };
          
          lessons.push(lesson);
          lessonId++;
        }
      });
    });
  });

  return lessons;
};

// Helper function to get code examples for different categories and languages
const getCodeExample = (category: string, language: string = 'python'): string => {
  const examples: Record<string, Record<string, string>> = {
    // Python examples
    python: {
      array: `# Array example
arr = [1, 2, 3, 4, 5]
print(arr[0])  # Output: 1
print(len(arr))  # Output: 5`,
      
      stack: `# Stack example
class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        self.items.append(item)
    
    def pop(self):
        return self.items.pop()`,
      
      queue: `# Queue example
from collections import deque
queue = deque()
queue.append(1)  # enqueue
first = queue.popleft()  # dequeue`,
      
      linkedlist: `# Linked List example
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Create a simple linked list
head = ListNode(1)
head.next = ListNode(2)`,
      
      string: `# String example
s = "Hello World"
print(s.lower())  # hello world
print(s.split())  # ['Hello', 'World']
print(s[::-1])   # dlroW olleH`,

      'bit-manipulation': `# Bit Manipulation example
n = 5  # Binary: 101
print(n & 1)    # Check if odd: 1
print(n << 1)   # Left shift: 10 (decimal)
print(n | 2)    # Set bit: 7`,

      'sliding-window': `# Sliding Window example
def max_sum_subarray(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum`,

      dp: `# Dynamic Programming example
def fibonacci(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]`,

      'binary-tree': `# Binary Tree example
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder_traversal(root):
    if not root:
        return []
    return inorder_traversal(root.left) + [root.val] + inorder_traversal(root.right)`
    },
    
    // JavaScript examples
    javascript: {
      array: `// Array example
const arr = [1, 2, 3, 4, 5];
console.log(arr[0]);  // Output: 1
console.log(arr.length);  // Output: 5`,
      
      stack: `// Stack example using array
class Stack {
  constructor() {
    this.items = [];
  }
  
  push(item) {
    this.items.push(item);
  }
  
  pop() {
    return this.items.pop();
  }
}`,
      
      queue: `// Queue example using array
class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(item) {
    this.items.push(item);
  }
  
  dequeue() {
    return this.items.shift();
  }
}`,
      
      linkedlist: `// Linked List example
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Create a simple linked list
const head = new ListNode(1);
head.next = new ListNode(2);`,
      
      string: `// String example
const s = "Hello World";
console.log(s.toLowerCase());  // hello world
console.log(s.split(' '));  // ['Hello', 'World']
console.log(s.split('').reverse().join(''));  // dlroW olleH`,

      'bit-manipulation': `// Bit Manipulation example
const n = 5;  // Binary: 101
console.log(n & 1);    // Check if odd: 1
console.log(n << 1);   // Left shift: 10 (decimal)
console.log(n | 2);    // Set bit: 7`,

      'sliding-window': `// Sliding Window example
function maxSumSubarray(arr, k) {
  let windowSum = 0;
  
  // Calculate first window sum
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  
  let maxSum = windowSum;
  
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i-k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}`,

      dp: `// Dynamic Programming example
function fibonacci(n) {
  if (n <= 1) return n;
  
  const dp = new Array(n+1).fill(0);
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  
  return dp[n];
}`,

      'binary-tree': `// Binary Tree example
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function inorderTraversal(root) {
  if (!root) return [];
  return [
    ...inorderTraversal(root.left),
    root.val,
    ...inorderTraversal(root.right)
  ];
}`
    },
    
    // C++ examples
    cpp: {
      array: `// Array example in C++
#include <vector>
#include <iostream>
using namespace std;

int main() {
  vector<int> arr = {1, 2, 3, 4, 5};
  cout << arr[0] << endl;  // Output: 1
  cout << arr.size() << endl;  // Output: 5
  return 0;
}`,
      
      stack: `// Stack example in C++
#include <stack>
#include <iostream>
using namespace std;

int main() {
  stack<int> s;
  s.push(1);
  s.push(2);
  cout << s.top() << endl;  // Output: 2
  s.pop();
  cout << s.top() << endl;  // Output: 1
  return 0;
}`,
      
      queue: `// Queue example in C++
#include <queue>
#include <iostream>
using namespace std;

int main() {
  queue<int> q;
  q.push(1);  // enqueue
  q.push(2);
  cout << q.front() << endl;  // Output: 1
  q.pop();  // dequeue
  cout << q.front() << endl;  // Output: 2
  return 0;
}`,
      
      linkedlist: `// Linked List example in C++
#include <iostream>
using namespace std;

struct ListNode {
  int val;
  ListNode* next;
  ListNode(int x) : val(x), next(nullptr) {}
};

int main() {
  // Create a simple linked list
  ListNode* head = new ListNode(1);
  head->next = new ListNode(2);
  cout << head->val << " -> " << head->next->val << endl;
  return 0;
}`,
      
      string: `// String example in C++
#include <string>
#include <algorithm>
#include <iostream>
using namespace std;

int main() {
  string s = "Hello World";
  transform(s.begin(), s.end(), s.begin(), ::tolower);
  cout << s << endl;  // hello world
  
  string reversed = s;
  reverse(reversed.begin(), reversed.end());
  cout << reversed << endl;  // dlrow olleh
  return 0;
}`,

      'bit-manipulation': `// Bit Manipulation example in C++
#include <iostream>
using namespace std;

int main() {
  int n = 5;  // Binary: 101
  cout << (n & 1) << endl;    // Check if odd: 1
  cout << (n << 1) << endl;   // Left shift: 10 (decimal)
  cout << (n | 2) << endl;    // Set bit: 7
  return 0;
}`,

      'sliding-window': `// Sliding Window example in C++
#include <vector>
#include <algorithm>
using namespace std;

int maxSumSubarray(vector<int>& arr, int k) {
  if (arr.size() < k) return 0;
  
  int windowSum = 0;
  // Calculate first window sum
  for (int i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  
  int maxSum = windowSum;
  
  for (int i = k; i < arr.size(); i++) {
    windowSum = windowSum - arr[i-k] + arr[i];
    maxSum = max(maxSum, windowSum);
  }
  
  return maxSum;
}`,

      dp: `// Dynamic Programming example in C++
#include <vector>
using namespace std;

int fibonacci(int n) {
  if (n <= 1) return n;
  
  vector<int> dp(n+1, 0);
  dp[1] = 1;
  
  for (int i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  
  return dp[n];
}`,

      'binary-tree': `// Binary Tree example in C++
#include <vector>
using namespace std;

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<int> inorderTraversal(TreeNode* root) {
  vector<int> result;
  if (!root) return result;
  
  vector<int> left = inorderTraversal(root->left);
  result.insert(result.end(), left.begin(), left.end());
  
  result.push_back(root->val);
  
  vector<int> right = inorderTraversal(root->right);
  result.insert(result.end(), right.begin(), right.end());
  
  return result;
}`
    }
  };

  // Get language-specific example if available, otherwise fall back to Python
  if (examples[language] && examples[language][category]) {
    return examples[language][category];
  } else if (examples.python[category]) {
    return examples.python[category];
  }

  // Generic fallback
  return `// ${category.replace(/-/g, ' ')} example
// Basic programming concepts
let x = 10;
if (x > 5) {
    console.log("x is greater than 5");
}`;
};

export const mockLessons = generateLessons();

// Function to extract title from LeetCode URL
const extractTitleFromUrl = (url: string): string => {
  try {
    // Remove any URL fragments and query parameters
    const cleanUrl = url.split('#')[0].split('?')[0];
    
    // Extract the problem slug from the URL
    const match = cleanUrl.match(/\/problems\/([^\/]+)\/?$/);
    if (match) {
      const slug = match[1];
      // Convert kebab-case to Title Case
      return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    // Fallback for URLs that don't match the expected pattern
    return 'LeetCode Problem';
  } catch (error) {
    return 'LeetCode Problem';
  }
};

// Function to categorize problems based on their titles/URLs
const categorizeProblem = (title: string, url: string): string => {
  const titleLower = title.toLowerCase();
  const urlLower = url.toLowerCase();
  
  // Array problems
  if (titleLower.includes('array') || titleLower.includes('subarray') || 
      titleLower.includes('rotate') || titleLower.includes('merge') ||
      titleLower.includes('sort') || titleLower.includes('search') ||
      titleLower.includes('matrix') || titleLower.includes('sum')) {
    return 'Array';
  }
  
  // String problems
  if (titleLower.includes('string') || titleLower.includes('palindrome') ||
      titleLower.includes('anagram') || titleLower.includes('substring') ||
      titleLower.includes('prefix') || titleLower.includes('word')) {
    return 'String';
  }
  
  // Linked List problems
  if (titleLower.includes('linked') || titleLower.includes('list') ||
      titleLower.includes('node')) {
    return 'Linked List';
  }
  
  // Tree problems
  if (titleLower.includes('tree') || titleLower.includes('binary')) {
    return 'Binary Tree';
  }
  
  // Stack/Queue problems
  if (titleLower.includes('stack') || titleLower.includes('queue') ||
      titleLower.includes('parentheses') || titleLower.includes('valid')) {
    return 'Stack & Queue';
  }
  
  // Dynamic Programming
  if (titleLower.includes('climb') || titleLower.includes('house') ||
      titleLower.includes('coin') || titleLower.includes('path') ||
      titleLower.includes('subsequence') || titleLower.includes('fibonacci')) {
    return 'Dynamic Programming';
  }
  
  // Graph problems
  if (titleLower.includes('graph') || titleLower.includes('island') ||
      titleLower.includes('course') || titleLower.includes('network')) {
    return 'Graph';
  }
  
  // Default category
  return 'Algorithm';
};

// Function to determine difficulty based on problem characteristics
const determineDifficulty = (title: string, url: string): 'easy' | 'medium' | 'hard' => {
  const titleLower = title.toLowerCase();
  
  // Easy problems (common patterns)
  const easyPatterns = [
    'two sum', 'reverse', 'palindrome', 'fibonacci', 'valid', 'search',
    'remove duplicates', 'merge', 'maximum depth', 'same tree'
  ];
  
  // Hard problems (complex patterns)
  const hardPatterns = [
    'median', 'serialize', 'word ladder', 'sudoku', 'n queens',
    'expression', 'wildcard', 'edit distance', 'burst balloons'
  ];
  
  if (easyPatterns.some(pattern => titleLower.includes(pattern))) {
    return 'easy';
  }
  
  if (hardPatterns.some(pattern => titleLower.includes(pattern))) {
    return 'hard';
  }
  
  // Default to medium
  return 'medium';
};

// Generate challenges from the CSV data
const generateChallengesFromCSV = (): Challenge[] => {
  const csvData = `title,url
,https://leetcode.com/problems/reverse-integer/
,https://leetcode.com/problems/palindrome-number/
,https://leetcode.com/problems/armstrong-number/
,https://leetcode.com/problems/valid-palindrome/
,https://leetcode.com/problems/fibonacci-number/
,https://leetcode.com/problems/frequency-of-the-most-frequent-element/
,"https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/#:~:text=Input%3A%20nums%20%3D%20%5B2%2C,no%20rotation)%20to%20make%20nums."
,"https://leetcode.com/problems/remove-duplicates-from-sorted-array/#:~:text=Input%3A%20nums%20%3D%20%5B0%2C,%2C%203%2C%20and%204%20respectively."
,https://leetcode.com/problems/rotate-array/
,https://leetcode.com/problems/move-zeroes/
,https://leetcode.com/problems/missing-number/
,https://leetcode.com/problems/max-consecutive-ones/
,https://leetcode.com/problems/single-number/
,https://leetcode.com/problems/two-sum/
,https://leetcode.com/problems/sort-colors/
,https://leetcode.com/problems/majority-element/
,https://leetcode.com/problems/maximum-subarray/
,https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
,https://leetcode.com/problems/rearrange-array-elements-by-sign/
,https://leetcode.com/problems/next-permutation/
,https://leetcode.com/problems/longest-consecutive-sequence/solution/
,https://leetcode.com/problems/set-matrix-zeroes/
,https://leetcode.com/problems/rotate-image/
,https://leetcode.com/problems/spiral-matrix/
,https://leetcode.com/problems/subarray-sum-equals-k/
,https://leetcode.com/problems/pascals-triangle/
,https://leetcode.com/problems/majority-element-ii/
,https://leetcode.com/problems/3sum/
,https://leetcode.com/problems/4sum/
,https://leetcode.com/problems/merge-intervals/
,https://leetcode.com/problems/merge-sorted-array/
,https://leetcode.com/problems/reverse-pairs/
,https://leetcode.com/problems/maximum-product-subarray/
,https://leetcode.com/problems/binary-search/
,"https://leetcode.com/problems/search-insert-position/#:~:text=Search%20Insert%20Position%20%2D%20LeetCode&text=Given%20a%20sorted%20array%20of,(log%20n)%20runtime%20complexity."
,https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/
,https://leetcode.com/problems/search-in-rotated-sorted-array/
,https://leetcode.com/problems/search-in-rotated-sorted-array-ii/
,https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
,https://leetcode.com/problems/single-element-in-a-sorted-array/
,"https://leetcode.com/problems/find-peak-element/#:~:text=Find%20Peak%20Element%20%2D%20LeetCode&text=A%20peak%20element%20is%20an,to%20any%20of%20the%20peaks."
,https://leetcode.com/problems/koko-eating-bananas/
,https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/
,https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/
,https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/
,"https://leetcode.com/problems/kth-missing-positive-number/#:~:text=Given%20an%20array%20arr%20of,13%2C...%5D."
,https://leetcode.com/problems/split-array-largest-sum/
,https://leetcode.com/problems/minimize-max-distance-to-gas-station/
,https://leetcode.com/problems/median-of-two-sorted-arrays/
,https://leetcode.com/problems/search-a-2d-matrix/
,https://leetcode.com/problems/search-a-2d-matrix-ii/
,https://leetcode.com/problems/find-a-peak-element-ii/
,https://leetcode.com/problems/remove-outermost-parentheses/
,https://leetcode.com/problems/reverse-words-in-a-string/
,https://leetcode.com/problems/largest-odd-number-in-string/
,https://leetcode.com/problems/longest-common-prefix/
,https://leetcode.com/problems/isomorphic-strings/
,https://leetcode.com/problems/rotate-string/
,"https://leetcode.com/problems/valid-anagram/#:~:text=Given%20two%20strings%20s%20and,the%20original%20letters%20exactly%20once.&text=Constraints%3A,.length%20%3C%3D%205%20*%2010"
,https://leetcode.com/problems/sort-characters-by-frequency/
,https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/
,https://leetcode.com/problems/roman-to-integer/
,https://leetcode.com/problems/string-to-integer-atoi/
,https://leetcode.com/problems/longest-palindromic-substring/
,https://leetcode.com/problems/sum-of-beauty-of-all-substrings/
,https://leetcode.com/problems/delete-node-in-a-linked-list/
,https://leetcode.com/problems/middle-of-the-linked-list/
,https://leetcode.com/problems/reverse-linked-list/
,https://leetcode.com/problems/linked-list-cycle/
,https://leetcode.com/problems/linked-list-cycle-ii/
,https://leetcode.com/problems/palindrome-linked-list/
,https://leetcode.com/problems/odd-even-linked-list/
,https://leetcode.com/problems/remove-nth-node-from-end-of-list/
,"https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/#:~:text=You%20are%20given%20the%20head,than%20or%20equal%20to%20x%20."
,https://leetcode.com/problems/sort-list/
,https://leetcode.com/problems/intersection-of-two-linked-lists/
,https://leetcode.com/problems/add-two-numbers/
,https://leetcode.com/problems/reverse-nodes-in-k-group/
,https://leetcode.com/problems/rotate-list/description/
,https://leetcode.com/problems/copy-list-with-random-pointer/
,https://leetcode.com/problems/powx-n/
,https://leetcode.com/problems/count-good-numbers/
,https://leetcode.com/problems/generate-parentheses/
,https://leetcode.com/problems/subsets/
,https://leetcode.com/problems/combination-sum/
,https://leetcode.com/problems/combination-sum-ii/
,https://leetcode.com/problems/subsets-ii/
,https://leetcode.com/problems/combination-sum-iii/
,https://leetcode.com/problems/letter-combinations-of-a-phone-number/
,https://leetcode.com/problems/palindrome-partitioning/
,https://leetcode.com/problems/word-search/
,https://leetcode.com/problems/n-queens/
,https://leetcode.com/problems/word-break/
,https://leetcode.com/problems/sudoku-solver/
,https://leetcode.com/problems/expression-add-operators/
,https://leetcode.com/problems/power-of-two/
,https://leetcode.com/problems/divide-two-integers/
,https://leetcode.com/problems/minimum-bit-flips-to-convert-number/
,https://leetcode.com/problems/count-primes/
,https://leetcode.com/problems/implement-stack-using-queues/
,https://leetcode.com/problems/implement-queue-using-stacks/
,https://leetcode.com/problems/valid-parentheses/
,https://leetcode.com/problems/min-stack/
,https://leetcode.com/problems/next-greater-element-i/
,https://leetcode.com/problems/next-greater-element-ii/
,https://leetcode.com/problems/trapping-rain-water/
,https://leetcode.com/problems/sum-of-subarray-minimums/
,https://leetcode.com/problems/asteroid-collision/
,https://leetcode.com/problems/sum-of-subarray-ranges/
,https://leetcode.com/problems/remove-k-digits/
,https://leetcode.com/problems/largest-rectangle-in-histogram/
,https://leetcode.com/problems/maximal-rectangle/
,https://leetcode.com/problems/sliding-window-maximum/
,https://leetcode.com/problems/online-stock-span/
,https://leetcode.com/problems/lru-cache/
,https://leetcode.com/problems/lfu-cache/
,https://leetcode.com/problems/longest-substring-without-repeating-characters/
,https://leetcode.com/problems/max-consecutive-ones-iii/
,https://leetcode.com/problems/longest-repeating-character-replacement/
,https://leetcode.com/problems/binary-subarrays-with-sum/
,https://leetcode.com/problems/count-number-of-nice-subarrays/
,https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/
,https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/
,https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/
,https://leetcode.com/problems/subarrays-with-k-different-integers/
,https://leetcode.com/problems/minimum-window-substring/
,https://leetcode.com/problems/minimum-window-subsequence/
,https://leetcode.com/problems/kth-largest-element-in-an-array/
,https://leetcode.com/problems/merge-k-sorted-lists/
,https://leetcode.com/problems/task-scheduler/
,https://leetcode.com/problems/hand-of-straights/
,https://leetcode.com/problems/design-twitter/
,"https://leetcode.com/problems/kth-largest-element-in-a-stream/#:~:text=Implement%20KthLargest%20class%3A,largest%20element%20in%20the%20stream."
,https://leetcode.com/problems/find-median-from-data-stream/
,https://leetcode.com/problems/top-k-frequent-elements/
,https://leetcode.com/problems/assign-cookies/
,https://leetcode.com/problems/lemonade-change/
,https://leetcode.com/problems/valid-parenthesis-string/
,https://leetcode.com/problems/jump-game/
,https://leetcode.com/problems/jump-game-ii/
,https://leetcode.com/problems/candy/
,https://leetcode.com/problems/insert-interval/
,https://leetcode.com/problems/non-overlapping-intervals/
,https://leetcode.com/problems/binary-tree-preorder-traversal/
,https://leetcode.com/problems/binary-tree-inorder-traversal/
,https://leetcode.com/problems/binary-tree-postorder-traversal/
,https://leetcode.com/problems/binary-tree-level-order-traversal/
,https://leetcode.com/problems/maximum-depth-of-binary-tree/
,https://leetcode.com/problems/balanced-binary-tree/
,https://leetcode.com/problems/diameter-of-binary-tree/
,https://leetcode.com/problems/binary-tree-maximum-path-sum/
,https://leetcode.com/problems/same-tree/
,https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
,https://leetcode.com/problems/boundary-of-binary-tree/
,https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/
,https://leetcode.com/problems/binary-tree-right-side-view/
,https://leetcode.com/problems/symmetric-tree/
,https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
,https://leetcode.com/problems/maximum-width-of-binary-tree/
,https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/
,https://leetcode.com/problems/count-complete-tree-nodes/
,https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
,https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
,https://leetcode.com/problems/serialize-and-deserialize-binary-tree/
,https://leetcode.com/problems/flatten-binary-tree-to-linked-list/
,https://leetcode.com/problems/search-in-a-binary-search-tree/
,https://leetcode.com/problems/insert-into-a-binary-search-tree/
,https://leetcode.com/problems/delete-node-in-a-bst/
,https://leetcode.com/problems/kth-smallest-element-in-a-bst/
,https://leetcode.com/problems/validate-binary-search-tree/
,https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
,https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/
,https://leetcode.com/problems/inorder-successor-in-bst/
,https://leetcode.com/problems/binary-search-tree-iterator/
,https://leetcode.com/problems/two-sum-iv-input-is-a-bst/
,https://leetcode.com/problems/recover-binary-search-tree/
,https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/
,"https://leetcode.com/problems/number-of-provinces/#:~:text=A%20province%20is%20a%20group,the%20total%20number%20of%20provinces."
,https://leetcode.com/problems/rotting-oranges/
,https://leetcode.com/problems/flood-fill/
,https://leetcode.com/problems/01-matrix/
,https://leetcode.com/problems/surrounded-regions/
,https://leetcode.com/problems/number-of-enclaves/
,https://leetcode.com/problems/word-ladder/
,https://leetcode.com/problems/word-ladder-ii/
,https://leetcode.com/problems/number-of-distinct-islands-ii/
,https://leetcode.com/problems/is-graph-bipartite/
,https://leetcode.com/problems/course-schedule-ii/discuss/293048/detecting-cycle-in-directed-graph-problem
,https://leetcode.com/problems/course-schedule/
,https://leetcode.com/problems/course-schedule-ii/
,https://leetcode.com/problems/find-eventual-safe-states/
,https://leetcode.com/problems/alien-dictionary/solution/
,https://leetcode.com/problems/shortest-path-in-binary-matrix/
,https://leetcode.com/problems/path-with-minimum-effort/
,https://leetcode.com/problems/cheapest-flights-within-k-stops/
,https://leetcode.com/problems/network-delay-time/
,https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/
,https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/
,https://leetcode.com/problems/number-of-operations-to-make-network-connected/
,https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/
,https://leetcode.com/problems/accounts-merge/
,https://leetcode.com/problems/number-of-islands-ii/
,https://leetcode.com/problems/making-a-large-island/
,https://leetcode.com/problems/swim-in-rising-water/
,https://leetcode.com/problems/critical-connections-in-a-network/discuss/382385/find-bridges-in-a-graph
,https://leetcode.com/problems/climbing-stairs/
,https://leetcode.com/problems/house-robber/
,https://leetcode.com/problems/house-robber-ii/
,https://leetcode.com/problems/unique-paths/
,https://leetcode.com/problems/unique-paths-ii/
,https://leetcode.com/problems/minimum-path-sum/
,https://leetcode.com/problems/triangle/
,https://leetcode.com/problems/minimum-falling-path-sum/
,https://leetcode.com/problems/partition-equal-subset-sum/
,https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/
,https://leetcode.com/problems/coin-change/
,https://leetcode.com/problems/target-sum/
,https://leetcode.com/problems/coin-change-2/
,https://leetcode.com/problems/longest-common-subsequence/
,https://leetcode.com/problems/longest-palindromic-subsequence/
,https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/
,https://leetcode.com/problems/delete-operation-for-two-strings/
,https://leetcode.com/problems/shortest-common-supersequence/
,https://leetcode.com/problems/distinct-subsequences/
,https://leetcode.com/problems/edit-distance/
,https://leetcode.com/problems/wildcard-matching/
,https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/
,https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/
,https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/
,https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/
,https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
,https://leetcode.com/problems/longest-increasing-subsequence/
,https://leetcode.com/problems/largest-divisible-subset/
,https://leetcode.com/problems/longest-string-chain/
,https://leetcode.com/problems/number-of-longest-increasing-subsequence/
,https://leetcode.com/problems/minimum-cost-to-cut-a-stick/
,https://leetcode.com/problems/burst-balloons/
,https://leetcode.com/problems/parsing-a-boolean-expression/
,https://leetcode.com/problems/palindrome-partitioning-ii/
,https://leetcode.com/problems/partition-array-for-maximum-sum/
,https://leetcode.com/problems/count-square-submatrices-with-all-ones/
,https://leetcode.com/problems/implement-trie-prefix-tree/
,https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/
,https://leetcode.com/problems/maximum-xor-with-an-element-from-array/
,https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/
,https://leetcode.com/problems/count-and-say/
,https://leetcode.com/problems/repeated-string-match/discuss/416144/Rabin-Karp-algorithm-C%2B%2B-implementation
,https://leetcode.com/problems/implement-strstr/
,https://leetcode.com/problems/shortest-palindrome/
,https://leetcode.com/problems/longest-happy-prefix/`;

  const challenges: Challenge[] = [];
  const lines = csvData.trim().split('\n');
  
  // Skip the header line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parse CSV line (handle quoted URLs)
    const match = line.match(/^,(.+)$/);
    if (match) {
      let url = match[1];
      
      // Remove quotes if present
      if (url.startsWith('"') && url.endsWith('"')) {
        url = url.slice(1, -1);
      }
      
      const title = extractTitleFromUrl(url);
      const category = categorizeProblem(title, url);
      const difficulty = determineDifficulty(title, url);
      
      const challenge: Challenge = {
        id: (i).toString(),
        title,
        description: `Solve this ${difficulty} level ${category.toLowerCase()} problem on LeetCode.`,
        difficulty,
        category,
        xpReward: difficulty === 'easy' ? 50 : difficulty === 'medium' ? 75 : 100,
        timeLimit: difficulty === 'easy' ? 30 : difficulty === 'medium' ? 45 : 60,
        language: 'both',
        isCompleted: Math.random() > 0.8, // Randomly mark some as completed
        link: url
      };
      
      challenges.push(challenge);
    }
  }
  
  return challenges;
};

export const mockChallenges: Challenge[] = generateChallengesFromCSV();

export const mockLeaderboard: LeaderboardUser[] = [
  {
    id: '1',
    username: 'AlgoMaster',
    xp: 3500,
    streak: 21,
    rank: 1,
    avatar: '👑'
  },
  {
    id: '2',
    username: 'CodeNinja',
    xp: 3200,
    streak: 15,
    rank: 2,
    avatar: '🥷'
  },
  {
    id: '3',
    username: 'DataWizard',
    xp: 2800,
    streak: 12,
    rank: 3,
    avatar: '🧙‍♂️'
  },
  {
    id: '4',
    username: 'PytheusRex',
    xp: 2400,
    streak: 8,
    rank: 4,
    avatar: '🐍'
  },
  {
    id: '5',
    username: 'CPlusPlusPlus',
    xp: 2100,
    streak: 10,
    rank: 5,
    avatar: '⚡'
  }
];

export const activityData = Array.from({ length: 365 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  return {
    date: date.toISOString().split('T')[0],
    count: Math.floor(Math.random() * 5),
    level: Math.floor(Math.random() * 4)
  };
}).reverse();

export const getDataStructureCategories = (preferredLanguage: string = 'python'): DataStructureCategory[] => {
  // Define categories in the order they should appear
  const categories: DataStructureCategory[] = [
    // Basic categories - available now
    {
      id: 'basics',
      title: 'Basics',
      icon: 'B',
      color: '#6366f1',
      totalQuestions: 0,
      completedQuestions: 0,
      lessons: [],
      isComingSoon: true // No basics questions in the provided data
    },
    {
      id: 'array',
      title: 'Arrays',
      icon: 'A',
      color: '#22c55e',
      totalQuestions: 0,
      completedQuestions: 0,
      lessons: [],
      isComingSoon: false
    },
    {
      id: 'stack',
      title: 'Stacks',
      icon: 'S',
      color: '#f59e0b',
      totalQuestions: 0,
      completedQuestions: 0,
      lessons: [],
      isComingSoon: false
    },
    {
      id: 'queue',
      title: 'Queues',
      icon: 'Q',
      color: '#06b6d4',
      totalQuestions: 0,
      completedQuestions: 0,
      lessons: [],
      isComingSoon: false
    },
    {
      id: 'linkedlist',
      title: 'Linked Lists',
      icon: 'LL',
      color: '#3b82f6',
      totalQuestions: 0,
      completedQuestions: 0,
      lessons: [],
      isComingSoon: false
    },
    {
      id: 'string',
      title: 'Strings',
      icon: 'Str',
      color: '#8b5cf6',
      totalQuestions: 0,
      completedQuestions: 0,
      lessons: [],
      isComingSoon: false
    },
    // Advanced categories - now available
    {
      id: 'bit-manipulation',
      title: 'Bit Manipulation',
      icon: 'BM',
      color: '#ef4444',
      totalQuestions: 0,
      completedQuestions: 0,
      lessons: [],
      isComingSoon: false
    },
    {
      id: 'sliding-window',
      title: 'Sliding Window',
      icon: 'SW',
      color: '#10b981',
      totalQuestions: 0,
      completedQuestions: 0,
      lessons: [],
      isComingSoon: false
    },
    {
      id: 'dp',
      title: 'Dynamic Programming',
      icon: 'DP',
      color: '#ec4899',
      totalQuestions: 0,
      completedQuestions: 0,
      lessons: [],
      isComingSoon: false
    },
    {
      id: 'binary-tree',
      title: 'Binary Trees',
      icon: 'BT',
      color: '#84cc16',
      totalQuestions: 0,
      completedQuestions: 0,
      lessons: [],
      isComingSoon: false
    },
    // Coming soon categories
    {
      id: 'graphs',
      title: 'Graphs',
      icon: 'G',
      color: '#f97316',
      totalQuestions: 0,
      completedQuestions: 0,
      lessons: [],
      isComingSoon: true
    }
  ];

  // Add basics lessons (split by difficulty)
  const basicsCategory = categories.find(c => c.id === 'basics');
  if (basicsCategory) {
    // Split fundamentalsQuestions into easy, medium, hard
    const easyQs = fundamentalsQuestions.filter(q => q.id.includes('easy')).slice(0, 15);
    const medQs = fundamentalsQuestions.filter(q => q.id.includes('medium')).slice(0, 15);
    const hardQs = fundamentalsQuestions.filter(q => q.id.includes('hard')).slice(0, 15);
    const basicsLessons = [
      {
        id: 'basics-easy',
        title: 'DSA Fundamentals - Easy',
        description: 'Core DSA concepts and fundamentals (Easy)',
        type: 'practice' as const,
        difficulty: 'beginner' as const,
        xpReward: 50,
        language: preferredLanguage as 'python' | 'java' | 'cpp',
        unit: 'basics',
        content: {
          explanation: 'This lesson covers the most important DSA fundamentals and basics (easy).',
          codeExample: '',
          questions: easyQs as import('../types').Question[]
        },
        isCompleted: false,
        isLocked: false,
        crownLevel: 0
      },
      {
        id: 'basics-medium',
        title: 'DSA Fundamentals - Medium',
        description: 'Core DSA concepts and fundamentals (Medium)',
        type: 'practice' as const,
        difficulty: 'intermediate' as const,
        xpReward: 75,
        language: preferredLanguage as 'python' | 'java' | 'cpp',
        unit: 'basics',
        content: {
          explanation: 'This lesson covers the most important DSA fundamentals and basics (medium).',
          codeExample: '',
          questions: medQs as import('../types').Question[]
        },
        isCompleted: false,
        isLocked: false,
        crownLevel: 0
      },
      {
        id: 'basics-hard',
        title: 'DSA Fundamentals - Hard',
        description: 'Core DSA concepts and fundamentals (Hard)',
        type: 'practice' as const,
        difficulty: 'advanced' as const,
        xpReward: 100,
        language: preferredLanguage as 'python' | 'java' | 'cpp',
        unit: 'basics',
        content: {
          explanation: 'This lesson covers the most important DSA fundamentals and basics (hard).',
          codeExample: '',
          questions: hardQs as import('../types').Question[]
        },
        isCompleted: false,
        isLocked: false,
        crownLevel: 0
      }
    ];
    basicsCategory.lessons = basicsLessons;
    basicsCategory.totalQuestions = easyQs.length + medQs.length + hardQs.length;
    basicsCategory.completedQuestions = 0;
    basicsCategory.isComingSoon = false;
  }

  // Filter lessons based on preferred language (include java, python, cpp)
  const filteredLessons = mockLessons.filter(lesson => 
    lesson.language === preferredLanguage || 
    (preferredLanguage === 'python' && !['cpp', 'java'].includes(lesson.language))
  );

  // Categorize lessons based on unit (which now contains the exact category ID)
  filteredLessons.forEach(lesson => {
    const unit = lesson.unit; // This now matches category IDs exactly
    const targetCategory = categories.find(c => c.id === unit);
    if (targetCategory && unit !== 'basics') {
      targetCategory.lessons.push(lesson);
      targetCategory.totalQuestions += lesson.content.questions.length;
      if (lesson.isCompleted) {
        targetCategory.completedQuestions += lesson.content.questions.length;
      }
      if (targetCategory.isComingSoon) {
        targetCategory.isComingSoon = false;
      }
    }
  });

  return categories;
};