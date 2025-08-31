import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, X, Star, Trophy, Heart, Info } from 'lucide-react';
import { getDataStructureCategories } from '../data/mockData';
import { useUser } from '../context/UserContext';
import DragDropQuestion from '../components/Questions/DragDropQuestion';
import correctSound from '../../assets/correct.wav';
import incorrectSound from '../../assets/incorrect.wav';
import confetti from 'canvas-confetti';
import { Confetti } from '../components/Common/Confetti';
import VideoPopup from '../components/Common/VideoPopup';
import video1 from '../data/complete/2a50feecb6.mp4';
import video2 from '../data/complete/631ccb350a.mp4';
import video3 from '../data/complete/667afef1d8.mp4';
import video4 from '../data/complete/6dedcf6fcd.mp4';
import video5 from '../data/complete/8d9ca9a8bd.mp4';
import video6 from '../data/complete/aaad714948.mp4';
import video7 from '../data/complete/abe56a53ab.mp4';
import video8 from '../data/complete/e7f0082d25.mp4';
import video9 from '../data/complete/f36ef244ae.mp4';
import incomplete1 from '../data/incomplete/efficient.mp3';
import incomplete2 from '../data/incomplete/OPTIMISED.mp3';
import incomplete3 from '../data/incomplete/BIG BRAIN.mp3';
import incomplete4 from '../data/incomplete/LETS GOO.mp3';
import incomplete5 from '../data/incomplete/STACKED.mp3';
import incomplete6 from '../data/incomplete/buffed.mp3';
import incomplete7 from '../data/incomplete/CRACKED.mp3';
import incomplete8 from '../data/incomplete/TOO GOOD.mp3';
import incomplete9 from '../data/incomplete/CLEAN.mp3';
import incomplete10 from '../data/incomplete/COOL.mp3';
import incomplete11 from '../data/incomplete/NAICEE.mp3';
import incomplete12 from '../data/incomplete/COOL N CLEAN.mp3';
import incomplete13 from '../data/incomplete/YEASSS.mp3';
import incomplete14 from '../data/incomplete/CHEERS.mp3';
import incomplete15 from '../data/incomplete/YAYY.mp3';
import incomplete16 from '../data/incomplete/WOHOO.mp3';

const LessonDetail: React.FC = () => {
  const { categoryId, lessonId } = useParams<{ categoryId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { user, addXP, useHeart, preferredLanguage } = useUser();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<null | (() => void)>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiRef = useRef(null);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [showAudioPopup, setShowAudioPopup] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [audioPlayedForCompletion, setAudioPlayedForCompletion] = useState(false);

  // Pass the preferred language to get filtered categories
  const categories = getDataStructureCategories(preferredLanguage);
  const category = categories.find(cat => cat.id === categoryId);
  const lesson = category?.lessons.find(l => l.id === lessonId);

  if (!category || !lesson) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Lesson Not Found</h1>
          <button
            onClick={() => navigate('/learn')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Learning
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = lesson.content.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === lesson.content.questions.length - 1;
  const allQuestionsCompleted = completedQuestions.size === lesson.content.questions.length;

  // Warn on browser/tab close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!lessonCompleted) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [lessonCompleted]);

  // Intercept in-app navigation (back button)
  const handleBack = () => {
    if (!lessonCompleted) {
      setShowLeaveModal(true);
      setPendingNavigation(() => () => navigate(`/learn/${categoryId}`));
    } else {
      navigate(`/learn/${categoryId}`);
    }
  };

  const handleEndSession = () => {
    setShowLeaveModal(false);
    setPendingNavigation(null);
    navigate('/learn');
  };

  const handleKeepLearning = () => {
    setShowLeaveModal(false);
    setPendingNavigation(null);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const playSound = (isCorrect: boolean) => {
    const audio = new Audio(isCorrect ? correctSound : incorrectSound);
    audio.play();
  };

  const handleCheckAnswer = () => {
    if (showExplanation || selectedAnswer === null) return;
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);
    playSound(correct);
    if (!correct) {
      useHeart();
      setMistakes(m => m + 1);
    }
  };

  const handleTextSubmit = () => {
    if (showExplanation || !textAnswer.trim()) return;
    
    const userAnswer = textAnswer.trim().toLowerCase();
    
    // Get the correct answer based on question type
    let correctAnswer: string;
    if (currentQuestion.type === 'code-completion' && currentQuestion.blanks) {
      // For code-completion questions, use the first blank as the correct answer
      correctAnswer = currentQuestion.blanks[0]?.toString().toLowerCase() || '';
    } else {
      // For fill-blank questions, use correctAnswer property
      correctAnswer = currentQuestion.correctAnswer?.toString().toLowerCase() || '';
    }
    
    const correct = userAnswer === correctAnswer;
    
    setIsCorrect(correct);
    setShowExplanation(true);
    playSound(correct);

    if (!correct) {
      useHeart();
      setMistakes(m => m + 1);
    }
  };

  const handleDragDropAnswer = (correct: boolean) => {
    setIsCorrect(correct);
    setShowExplanation(true);
    playSound(correct);
    if (!correct) {
      useHeart();
      setMistakes(m => m + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isCorrect) {
      setCompletedQuestions(prev => new Set([...prev, currentQuestionIndex]));
    }
    if (isLastQuestion) {
      if (allQuestionsCompleted || isCorrect) {
        setLessonCompleted(true);
        addXP(lesson.xpReward);
        if (mistakes > 0) {
          const randomAudio = incompleteAudios[Math.floor(Math.random() * incompleteAudios.length)];
          setAudioSrc(randomAudio);
          setShowAudioPopup(true);
          setVideoSrc(null);
          setShowVideoPopup(false);
          setAudioPlayedForCompletion(true);
        } else {
          const videos = [video1, video2, video3, video4, video5, video6, video7, video8, video9];
          const randomVideo = videos[Math.floor(Math.random() * videos.length)];
          setVideoSrc(randomVideo);
          setShowVideoPopup(true);
          setAudioSrc(null);
          setShowAudioPopup(false);
          setAudioPlayedForCompletion(false);
        }
      }
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setTextAnswer('');
      setShowExplanation(false);
      setIsCorrect(null);
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setTextAnswer('');
    setShowExplanation(false);
    setIsCorrect(null);
  };

  const handleFinishLesson = () => {
    navigate(`/learn/${categoryId}`);
  };

  const canSubmit = () => {
    if (currentQuestion.type === 'multiple-choice') {
      return selectedAnswer !== null;
    }
    if (currentQuestion.type === 'drag-drop') {
      return true; // Drag drop has its own submit button
    }
    return textAnswer.trim().length > 0;
  };

  useEffect(() => {
    const handleShowModal = () => {
      if (!lessonCompleted) setShowLeaveModal(true);
    };
    window.addEventListener('showLessonLeaveModal', handleShowModal);
    return () => window.removeEventListener('showLessonLeaveModal', handleShowModal);
  }, [lessonCompleted]);

  useEffect(() => {
    if (lessonCompleted) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      // Optionally, you can trigger the fire method if using manualstart
      // confettiRef.current?.fire();
    }
  }, [lessonCompleted]);

  useEffect(() => {
    if (showExplanation && isCorrect) {
      confetti({
        particleCount: 40,
        spread: 70,
        shapes: ['star'],
        colors: ['#FFD700', '#FFFACD', '#FFEC8B'],
        origin: { y: 0.5 },
        zIndex: 100,
      });
    }
  }, [showExplanation, isCorrect]);

  React.useEffect(() => {
    let timeoutId: number | null = null;
    if (lessonCompleted && !showConfetti) {
      if (!showVideoPopup && !videoSrc && !audioPlayedForCompletion) {
        timeoutId = window.setTimeout(() => {
          const randomIdx = Math.floor(Math.random() * completionVideos.length);
          setVideoSrc(completionVideos[randomIdx]);
          setShowVideoPopup(true);
        }, 500);
      }
    } else if (!lessonCompleted) {
      setShowVideoPopup(false);
      setVideoSrc(null);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonCompleted, showConfetti, audioPlayedForCompletion]);

  // List of video files in the complete folder
  const completionVideos = [
    video1,
    video2,
    video3,
    video4,
    video5,
    video6,
    video7,
    video8,
    video9,
  ];

  const incompleteAudios = [
    incomplete1, incomplete2, incomplete3, incomplete4, incomplete5, incomplete6, incomplete7, incomplete8, incomplete9, incomplete10, incomplete11, incomplete12, incomplete13, incomplete14, incomplete15, incomplete16
  ];

  if (lessonCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 flex items-center justify-center relative">
        {showConfetti && (
          <div className="fixed inset-0 z-[100] pointer-events-none">
            <Confetti
              ref={confettiRef}
              options={{ particleCount: 180, spread: 120, origin: { y: 0.6 }, zIndex: 100 }}
              style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}
            />
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-[#18181b] rounded-2xl p-8 shadow-xl text-center max-w-md mx-4 border border-gray-100 dark:border-gray-800"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Lesson Complete!</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Great job! You've mastered {lesson.title}</p>
          
          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-green-700 dark:text-green-300">
              <Star className="w-5 h-5" />
              <span className="font-semibold">+{lesson.xpReward} XP earned!</span>
            </div>
          </div>
          
          <button
            onClick={handleFinishLesson}
            className="w-full py-3 px-4 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Continue Learning
          </button>
        </motion.div>
        {showVideoPopup && videoSrc && (
          <VideoPopup videoSrc={videoSrc} onClose={() => setShowVideoPopup(false)} size="large" />
        )}
        {showAudioPopup && audioSrc && (
          <div className="fixed bottom-6 right-6 z-[200] bg-black/90 rounded-xl shadow-lg p-4 flex flex-col items-end w-80 max-w-[90vw]">
            <button
              onClick={() => setShowAudioPopup(false)}
              className="text-white text-lg font-bold mb-1 hover:text-gray-300"
              aria-label="Close audio"
            >
              ×
            </button>
            <audio src={audioSrc} autoPlay onEnded={() => setShowAudioPopup(false)} style={{ display: 'none' }} />
            <span className="text-white text-lg font-semibold mt-2">Nice try! Keep practicing! 🎵</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-[#111113] flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-[#18181b] border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
              
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">{lesson.title}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Question {currentQuestionIndex + 1} of {lesson.content.questions.length}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-red-500">
                <Heart className="w-5 h-5 fill-current" />
                <span className="font-medium">{user?.hearts}</span>
              </div>
              
              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / lesson.content.questions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Lesson explanation (shown only for first question) */}
        {currentQuestionIndex === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#18181b] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-8"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Lesson Overview</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{lesson.content.explanation}</p>
            
            {lesson.content.codeExample && (
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{lesson.content.codeExample}</code>
                </pre>
              </div>
            )}
          </motion.div>
        )}

        {/* Question */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-[#18181b] rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {currentQuestion.question}
          </h2>

          {currentQuestion.code && (
            <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{currentQuestion.code}</code>
              </pre>
            </div>
          )}

          {/* Multiple choice options */}
          {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
            <>
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={showExplanation ? {} : { scale: 1.01 }}
                    whileTap={showExplanation ? {} : { scale: 0.99 }}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`
                      w-full p-4 text-left rounded-lg border-2 transition-all
                      ${showExplanation
                        ? index === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                          : index === selectedAnswer && index !== currentQuestion.correctAnswer
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                          : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        : selectedAnswer === index
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium
                        ${showExplanation
                          ? index === currentQuestion.correctAnswer
                            ? 'border-green-500 bg-green-500 text-white'
                            : index === selectedAnswer && index !== currentQuestion.correctAnswer
                            ? 'border-red-500 bg-red-500 text-white'
                            : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                          : selectedAnswer === index
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                        }
                      `}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                      {showExplanation && index === currentQuestion.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                      )}
                      {showExplanation && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                        <X className="w-5 h-5 text-red-500 ml-auto" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
              {/* Check Answer Button */}
              {!showExplanation && selectedAnswer !== null && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckAnswer}
                  className="mb-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium w-full"
                >
                  Check Answer
                </motion.button>
              )}
            </>
          )}

          {/* Drag and Drop Questions */}
          {currentQuestion.type === 'drag-drop' && (
            <div className="mb-6">
              <DragDropQuestion
                question={{
                  ...currentQuestion,
                  items: currentQuestion.items || [],
                  correctOrder: currentQuestion.correctOrder || []
                }}
                onAnswer={handleDragDropAnswer}
                showExplanation={showExplanation}
                isCorrect={isCorrect}
                onRetry={handleRetry}
              />
            </div>
          )}

          {/* Fill blank and code completion questions */}
          {(currentQuestion.type === 'fill-blank' || currentQuestion.type === 'code-completion') && (
            <div className="mb-6">
              <input
                type="text"
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                placeholder={
                  currentQuestion.type === 'fill-blank' ? "Enter your answer..." :
                  "Complete the code..."
                }
                className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                disabled={showExplanation}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && canSubmit() && !showExplanation) {
                    handleTextSubmit();
                  }
                }}
              />
              
              {!showExplanation && canSubmit() && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleTextSubmit}
                  className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Check Answer
                </motion.button>
              )}
            </div>
          )}

          {/* Explanation */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg mb-6 ${
                isCorrect 
                  ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700' 
                  : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
              }`}
            >
              <div className="flex items-start space-x-3">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                ) : (
                  <X className="w-5 h-5 text-red-500 mt-0.5" />
                )}
                <div>
                  <p className={`font-medium mb-2 ${
                    isCorrect 
                      ? 'text-green-800 dark:text-green-300' 
                      : 'text-red-800 dark:text-red-300'
                  }`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </p>
                  <p className={isCorrect 
                    ? 'text-green-700 dark:text-green-300' 
                    : 'text-red-700 dark:text-red-300'
                  }>
                    {currentQuestion.explanation}
                  </p>
                  {!isCorrect && currentQuestion.type !== 'multiple-choice' && currentQuestion.type !== 'drag-drop' && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Correct answer: <span className="font-medium">
                        {currentQuestion.type === 'code-completion' && currentQuestion.blanks 
                          ? currentQuestion.blanks[0] 
                          : currentQuestion.correctAnswer}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Action buttons */}
          <div className="flex justify-between">
            <div>
              {showExplanation && !isCorrect && currentQuestion.type !== 'drag-drop' && (
                <button
                  onClick={handleRetry}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>
            
            <div>
              {showExplanation && isCorrect && (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {isLastQuestion ? 'Complete Lesson' : 'Next Question'}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#18181b] dark:bg-[#18181b] rounded-2xl p-8 shadow-xl text-center max-w-xs w-full border border-gray-700 flex flex-col items-center">
            <h2 className="text-lg font-bold text-white mb-2">Wait, don't go!</h2>
            <p className="text-gray-200 mb-6">You'll lose your progress if you quit now</p>
            <button
              onClick={handleKeepLearning}
              className="w-full py-3 mb-2 bg-blue-400 text-white rounded-lg font-medium hover:bg-blue-500 transition-colors"
            >
              KEEP LEARNING
            </button>
            <button
              onClick={handleEndSession}
              className="w-full py-3 text-red-400 rounded-lg font-medium hover:bg-red-500 hover:text-white transition-colors"
            >
              END SESSION
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonDetail;