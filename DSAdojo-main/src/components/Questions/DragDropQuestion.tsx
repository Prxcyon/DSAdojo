import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GripVertical, CheckCircle, X, RotateCcw } from 'lucide-react';

interface DragDropQuestionProps {
  question: {
    id: string;
    question: string;
    items: string[];
    correctOrder: number[];
    explanation: string;
  };
  onAnswer: (isCorrect: boolean) => void;
  showExplanation: boolean;
  isCorrect: boolean | null;
  onRetry: () => void;
}

const DragDropQuestion: React.FC<DragDropQuestionProps> = ({
  question,
  onAnswer,
  showExplanation,
  isCorrect,
  onRetry
}) => {
  const [items, setItems] = useState(question.items.map((item, index) => ({ id: index, text: item })));
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragCounter = useRef(0);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', '');
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
  };

  const handleDragLeave = (e: React.DragEvent) => {
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    dragCounter.current = 0;
    setDragOverIndex(null);

    if (draggedItem === null || draggedItem === dropIndex) {
      setDraggedItem(null);
      return;
    }

    const newItems = [...items];
    const draggedItemData = newItems[draggedItem];
    
    // Remove the dragged item
    newItems.splice(draggedItem, 1);
    
    // Insert at new position
    const insertIndex = draggedItem < dropIndex ? dropIndex - 1 : dropIndex;
    newItems.splice(insertIndex, 0, draggedItemData);
    
    setItems(newItems);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
    dragCounter.current = 0;
  };

  const checkAnswer = () => {
    const currentOrder = items.map(item => item.id);
    const isAnswerCorrect = JSON.stringify(currentOrder) === JSON.stringify(question.correctOrder);
    onAnswer(isAnswerCorrect);
  };

  const resetOrder = () => {
    setItems(question.items.map((item, index) => ({ id: index, text: item })));
    onRetry();
  };

  const getItemStatus = (itemIndex: number) => {
    if (!showExplanation) return 'default';
    
    const currentOrder = items.map(item => item.id);
    const correctPosition = question.correctOrder[itemIndex];
    const currentItem = currentOrder[itemIndex];
    
    return currentItem === correctPosition ? 'correct' : 'incorrect';
  };

  const getCorrectOrder = () => {
    return question.correctOrder.map(index => question.items[index]);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Drag and drop the items to arrange them in the correct order
        </p>
      </div>

      {/* Drag and Drop Area */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border-2 border-dashed border-gray-300 dark:border-gray-600">
        <div className="space-y-3">
          <AnimatePresence>
            {items.map((item, index) => {
              const status = getItemStatus(index);
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  draggable={!showExplanation}
                  onDragStart={(e) => handleDragStart(e as any, index)}
                  onDragOver={(e) => handleDragOver(e as any, index)}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e as any, index)}
                  onDragEnd={handleDragEnd}
                  className={`
                    flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-200 cursor-move
                    ${draggedItem === index ? 'opacity-50 scale-95' : ''}
                    ${dragOverIndex === index && draggedItem !== index ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''}
                    ${status === 'correct' ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : ''}
                    ${status === 'incorrect' ? 'border-red-500 bg-red-50 dark:bg-red-900/30' : ''}
                    ${status === 'default' ? 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-sm' : ''}
                    ${showExplanation ? 'cursor-default' : 'cursor-move'}
                  `}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    {!showExplanation && (
                      <GripVertical className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    )}
                    
                    <div className={`
                      w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium
                      ${status === 'correct' ? 'border-green-500 bg-green-500 text-white' : ''}
                      ${status === 'incorrect' ? 'border-red-500 bg-red-500 text-white' : ''}
                      ${status === 'default' ? 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400' : ''}
                    `}>
                      {index + 1}
                    </div>
                    
                    <span className={`
                      flex-1 text-left
                      ${status === 'correct' ? 'text-green-800 dark:text-green-300' : ''}
                      ${status === 'incorrect' ? 'text-red-800 dark:text-red-300' : ''}
                      ${status === 'default' ? 'text-gray-900 dark:text-white' : ''}
                    `}>
                      {item.text}
                    </span>
                  </div>

                  {showExplanation && (
                    <div className="flex items-center">
                      {status === 'correct' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div>
          {!showExplanation && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetOrder}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </motion.button>
          )}
        </div>

        <div>
          {!showExplanation && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={checkAnswer}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Check Order
            </motion.button>
          )}
        </div>
      </div>

      {/* Show correct order when incorrect */}
      {showExplanation && isCorrect === false && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4"
        >
          <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Correct Order:</h4>
          <div className="space-y-2">
            {getCorrectOrder().map((item, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </div>
                <span className="text-blue-700 dark:text-blue-300">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DragDropQuestion;