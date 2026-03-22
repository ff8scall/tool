import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';

// Unit Converters
import LengthConverter from './pages/LengthConverter';
import WeightConverter from './pages/WeightConverter';
import CurrencyConverter from './pages/CurrencyConverter';
import TemperatureConverter from './pages/TemperatureConverter';
import AreaConverter from './pages/AreaConverter';
import VolumeConverter from './pages/VolumeConverter';
import SpeedConverter from './pages/SpeedConverter';

// Finance / Life
import LoanCalculator from './pages/LoanCalculator';
import DateCalculator from './pages/DateCalculator';
import SalaryCalculator from './pages/SalaryCalculator';
import SeveranceCalculator from './pages/SeveranceCalculator';
import MinimumWageCalculator from './pages/MinimumWageCalculator';
import CompoundInterestCalculator from './pages/CompoundInterestCalculator';
import WorkHoursCalculator from './pages/WorkHoursCalculator';
import AgeCalculator from './pages/AgeCalculator';
import DiscountCalculator from './pages/DiscountCalculator';
import PercentCalculator from './pages/PercentCalculator';
import FractionCalculator from './pages/FractionCalculator';
import LunchRecommender from './pages/LunchRecommender';

// Text Tools
import WordCounter from './pages/WordCounter';
import UnicodeConverter from './pages/UnicodeConverter';
import StringConverter from './pages/StringConverter';
import Base64Tool from './pages/Base64Tool';
import HtmlEncoder from './pages/HtmlEncoder';
import AsciiArt from './pages/AsciiArt';
import MorseCode from './pages/MorseCode';

// Dev Tools
import BaseConverter from './pages/BaseConverter';
import JsonFormatter from './pages/JsonFormatter';
import MarkdownEditor from './pages/MarkdownEditor';
import HtmlFormatter from './pages/HtmlFormatter';
import CodeDiff from './pages/CodeDiff';
import WebEditor from './pages/WebEditor';
import HashGenerator from './pages/HashGenerator';
import UuidGenerator from './pages/UuidGenerator';
import UrlEncoderDecoder from './pages/UrlEncoderDecoder';
import JwtDecoder from './pages/JwtDecoder';
import RegexTester from './pages/RegexTester';
import AsciiTable from './pages/AsciiTable';
import SpecialCharacters from './pages/SpecialCharacters';
import CronGenerator from './pages/CronGenerator';
import CsvJsonConverter from './pages/CsvJsonConverter';
import EncryptionTool from './pages/EncryptionTool';

// Utility
import QrGenerator from './pages/QrGenerator';
import BarcodeGenerator from './pages/BarcodeGenerator';
import PasswordGenerator from './pages/PasswordGenerator';
import ColorPicker from './pages/ColorPicker';
import ImageToBase64 from './pages/ImageToBase64';
import IpAddress from './pages/IpAddress';
import TimerStopwatch from './pages/TimerStopwatch';
import PomodoroTimer from './pages/PomodoroTimer';
import Checklist from './pages/Checklist';
import Flashlight from './pages/Flashlight';
import ImageResizer from './pages/ImageResizer';
import YoutubeThumbnail from './pages/YoutubeThumbnail';
import WorldClock from './pages/WorldClock';
import ColorExtractor from './pages/ColorExtractor';
import DiceRoller from './pages/DiceRoller';

// Health
import BMI from './pages/BMI';
import BMR from './pages/BMR';
import Biorhythm from './pages/Biorhythm';
import LifeExpectancy from './pages/LifeExpectancy';

// Games
import ReactionTest from './pages/ReactionTest';
import TypingTest from './pages/TypingTest';
import OneToFifty from './pages/OneToFifty';
import CpsTest from './pages/CpsTest';
import AimTrainer from './pages/AimTrainer';
import NumberMemory from './pages/NumberMemory';
import NumberBaseball from './pages/NumberBaseball';
import Minesweeper from './pages/Minesweeper';
import Roulette from './pages/Roulette';
import LadderGame from './pages/LadderGame';
import SuikaGame from './pages/SuikaGame';
import Game2048 from './pages/Game2048';
import TanghuluGame from './pages/TanghuluGame';
import FlappyBird from './pages/FlappyBird';
import MissileDodge from './pages/MissileDodge';
import SnakeGame from './pages/SnakeGame';
import Sudoku from './pages/Sudoku';
import TowerStacker from './pages/TowerStacker';
import BubbleWrap from './pages/BubbleWrap';
import LottoGenerator from './pages/LottoGenerator';
import LottoSimulator from './pages/LottoSimulator';
import MandalartPlanner from './pages/MandalartPlanner';
import SpeedMath from './pages/SpeedMath';
import TimeSense from './pages/TimeSense';
import TypingDefense from './pages/TypingDefense';
import Hangman from './pages/Hangman';

// Fun / Fortune
import BloodType from './pages/BloodType';
import MbtiTest from './pages/MbtiTest';
import Saju from './pages/Saju';
import ZodiacFortune from './pages/ZodiacFortune';
import Horoscope from './pages/Horoscope';
import DreamInterpretation from './pages/DreamInterpretation';
import TarotCard from './pages/TarotCard';
import BirthGen from './pages/BirthGen';
import NameAnalysis from './pages/NameAnalysis';
import PersonalColor from './pages/PersonalColor';
import PastLife from './pages/PastLife';
import PetMbti from './pages/PetMbti';
import MentalAge from './pages/MentalAge';
import BrainStructure from './pages/BrainStructure';
import JoseonJob from './pages/JoseonJob';
import IfIAmGod from './pages/IfIAmGod';
import LifeBgm from './pages/LifeBgm';
import FirstImpressionColor from './pages/FirstImpressionColor';
import AnimalFace from './pages/AnimalFace';
import PersonalScent from './pages/PersonalScent';
import IdealType from './pages/IdealType';
import CoupleCompatibility from './pages/CoupleCompatibility';
import HiddenTalent from './pages/HiddenTalent';
import BalanceGame from './pages/BalanceGame';
import FortuneCookie from './pages/FortuneCookie';
import ColorTest from './pages/ColorTest';
import HearingTest from './pages/HearingTest';
import PitchTest from './pages/PitchTest';
import DynamicAcuity from './pages/DynamicAcuity';
import SmileDatingTest from './pages/SmileDatingTest';
import DatingTest from './pages/DatingTest';
import StressTest from './pages/StressTest';
import BrainType from './pages/BrainType';
import EqTest from './pages/EqTest';
import SmartphoneAddiction from './pages/SmartphoneAddiction';
import KkondaeTest from './pages/KkondaeTest';
import HoguTest from './pages/HoguTest';
import DebateTest from './pages/DebateTest';
import IdolPositionTest from './pages/IdolPositionTest';
import ResilienceTest from './pages/ResilienceTest';

// Trivia
import InitialSoundQuiz from './pages/InitialSoundQuiz';
import FoodQuiz from './pages/FoodQuiz';
import AssociationQuiz from './pages/AssociationQuiz';
import CapitalQuiz from './pages/CapitalQuiz';
import SpellingQuiz from './pages/SpellingQuiz';
import VocabularyTest from './pages/VocabularyTest';
import AdditionQuiz from './pages/AdditionQuiz';
import SubtractionQuiz from './pages/SubtractionQuiz';
import MultiplicationQuiz from './pages/MultiplicationQuiz';

const NotFound = () => {
  const { t, lang } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h1 className="text-6xl font-black text-indigo-600 mb-4 animate-bounce">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{t('error.notFound')}</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto italic">
        {lang === 'en' 
          ? "The page you are looking for might have been moved or doesn't exist anymore."
          : "요청하신 페이지가 사라졌거나 다른 주소로 옮겨졌을 수 있습니다."}
      </p>
      <a 
        href={lang === 'en' ? "/en" : "/"} 
        className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
      >
        {t('error.backToHome')}
      </a>
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router basename="/">
          <LanguageProvider>
            <ScrollToTop />
            <Routes>
              {/* Redirect /ko/* to /* (Korean is now default without prefix) */}
              <Route path="/ko/*" element={
                <Navigate to={window.location.pathname.replace(/^\/ko/, '') || "/"} replace />
              } />

              {/* English Language Routes */}
              <Route path="/en/*" element={
                <Layout>
                  <Routes>
                    {/* Reuse path logic for English */}
                    {Object.entries({
                      "": Home,
                      "category/:categoryId": CategoryPage,
                      "length": LengthConverter,
                      "weight": WeightConverter,
                      "currency": CurrencyConverter,
                      "temperature-converter": TemperatureConverter,
                      "temperature": TemperatureConverter,
                      "temp-conv": TemperatureConverter,
                      "area-converter": AreaConverter,
                      "volume-converter": VolumeConverter,
                      "speed-converter": SpeedConverter,
                      "loan": LoanCalculator,
                      "date": DateCalculator,
                      "date-calc": DateCalculator,
                      "dday-calc": DateCalculator,
                      "salary-calculator": SalaryCalculator,
                      "salary-calc": SalaryCalculator,
                      "severance-calculator": SeveranceCalculator,
                      "severance-calc": SeveranceCalculator,
                      "minimum-wage": MinimumWageCalculator,
                      "min-wage-calc": MinimumWageCalculator,
                      "compound-interest": CompoundInterestCalculator,
                      "work-hours": WorkHoursCalculator,
                      "age-calc": AgeCalculator,
                      "age": AgeCalculator,
                      "age-calculator": AgeCalculator,
                      "discount-calculator": DiscountCalculator,
                      "percent-calculator": PercentCalculator,
                      "fraction-calculator": FractionCalculator,
                      "lunch": LunchRecommender,
                      "lunch-recommender": LunchRecommender,
                      "word-count": WordCounter,
                      "word-counter": WordCounter,
                      "unicode": UnicodeConverter,
                      "string-converter": StringConverter,
                      "case-converter": StringConverter,
                      "string-utils": StringConverter,
                      "base64": Base64Tool,
                      "html-encoder": HtmlEncoder,
                      "ascii-art": AsciiArt,
                      "morse-code": MorseCode,
                      "base-converter": BaseConverter,
                      "json-formatter": JsonFormatter,
                      "markdown-editor": MarkdownEditor,
                      "html-view": HtmlFormatter,
                      "html-formatter": HtmlFormatter,
                      "diff": CodeDiff,
                      "code-diff": CodeDiff,
                      "code-compare": CodeDiff,
                      "compare": CodeDiff,
                      "web-editor": WebEditor,
                      "hash-gen": HashGenerator,
                      "uuid-gen": UuidGenerator,
                      "url-encoder": UrlEncoderDecoder,
                      "jwt-decoder": JwtDecoder,
                      "regex-tester": RegexTester,
                      "ascii-table": AsciiTable,
                      "special-char": SpecialCharacters,
                      "cron-generator": CronGenerator,
                      "csv-json": CsvJsonConverter,
                      "encryption-tool": EncryptionTool,
                      "qr-gen": QrGenerator,
                      "qr-generator": QrGenerator,
                      "barcode-gen": BarcodeGenerator,
                      "password-gen": PasswordGenerator,
                      "color-picker": ColorPicker,
                      "image-base64": ImageToBase64,
                      "ip-address": IpAddress,
                      "timer": TimerStopwatch,
                      "pomodoro-timer": PomodoroTimer,
                      "pomodoro": PomodoroTimer,
                      "checklist": Checklist,
                      "flashlight": Flashlight,
                      "image-resize": ImageResizer,
                      "youtube-thumbnail": YoutubeThumbnail,
                      "world-clock": WorldClock,
                      "color-extractor": ColorExtractor,
                      "dice-roller": DiceRoller,
                      "bmi": BMI,
                      "bmr": BMR,
                      "biorhythm": Biorhythm,
                      "life-expectancy": LifeExpectancy,
                      "reaction-test": ReactionTest,
                      "typing-test": TypingTest,
                      "1to50": OneToFifty,
                      "one-to-fifty": OneToFifty,
                      "cps-test": CpsTest,
                      "aim-trainer": AimTrainer,
                      "number-memory": NumberMemory,
                      "number-baseball": NumberBaseball,
                      "minesweeper": Minesweeper,
                      "roulette": Roulette,
                      "ladder-game": LadderGame,
                      "suika-game": SuikaGame,
                      "2048": Game2048,
                      "tanghulu-maker": TanghuluGame,
                      "flappy-bird": FlappyBird,
                      "missile-dodge": MissileDodge,
                      "snake-game": SnakeGame,
                      "sudoku": Sudoku,
                      "sudoku-game": Sudoku,
                      "tower-stacker": TowerStacker,
                      "tower-blocks": TowerStacker,
                      "bubble-wrap": BubbleWrap,
                      "lotto": LottoGenerator,
                      "lotto-sim": LottoSimulator,
                      "mandalart": MandalartPlanner,
                      "speed-math": SpeedMath,
                      "time-sense": TimeSense,
                      "typing-defense": TypingDefense,
                      "hangman": Hangman,
                      "dynamic-acuity": DynamicAcuity,
                      "blood-type": BloodType,
                      "mbti": MbtiTest,
                      "mbti-test": MbtiTest,
                      "saju": Saju,
                      "compatibility": Saju,
                      "gunghap": Saju,
                      "zodiac-fortune": ZodiacFortune,
                      "horoscope": Horoscope,
                      "dream-interpretation": DreamInterpretation,
                      "tarot": TarotCard,
                      "birth-gen": BirthGen,
                      "name-analysis": NameAnalysis,
                      "personal-color": PersonalColor,
                      "color-test": PersonalColor,
                      "past-life": PastLife,
                      "name-past-life": PastLife,
                      "pet-mbti": PetMbti,
                      "dog-cat-mbti": PetMbti,
                      "mental-age": MentalAge,
                      "mind-age": MentalAge,
                      "brain-structure": BrainStructure,
                      "my-brain": BrainStructure,
                      "joseon-job": JoseonJob,
                      "past-job": JoseonJob,
                      "if-i-am-god": IfIAmGod,
                      "god-test": IfIAmGod,
                      "life-bgm": LifeBgm,
                      "first-impression-color": FirstImpressionColor,
                      "my-color": FirstImpressionColor,
                      "animal-face": AnimalFace,
                      "personal-scent": PersonalScent,
                      "ideal-type": IdealType,
                      "couple-compatibility": CoupleCompatibility,
                      "hidden-talent": HiddenTalent,
                      "balance-game": BalanceGame,
                      "fortune-cookie": FortuneCookie,
                      "color-sensitivity": ColorTest,
                      "hearing-test": HearingTest,
                      "pitch-test": PitchTest,
                      "smile-dating-test": SmileDatingTest,
                      "dating-test": DatingTest,
                      "stress-test": StressTest,
                      "brain-type": BrainType,
                      "eq-test": EqTest,
                      "smartphone-addiction": SmartphoneAddiction,
                      "kkondae-test": KkondaeTest,
                      "hogu-test": HoguTest,
                      "debate-test": DebateTest,
                      "idol-test": IdolPositionTest,
                      "resilience-test": ResilienceTest,
                      "initial-sound-quiz": InitialSoundQuiz,
                      "food-quiz": FoodQuiz,
                      "association-quiz": AssociationQuiz,
                      "capital-quiz": CapitalQuiz,
                      "spelling-quiz": SpellingQuiz,
                      "vocabulary-test": VocabularyTest,
                      "simple-addition": AdditionQuiz,
                      "simple-subtraction": SubtractionQuiz,
                      "simple-multiplication": MultiplicationQuiz
                    }).map(([path, Component]) => (
                      <Route key={path} path={path} element={<Component />} />
                    ))}
                    
                    {/* 404 for /en/* */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              } />

              {/* Default Language (Korean) Routes */}
              <Route path="/*" element={
                <Layout>
                  <Routes>
                    {/* Reuse path logic for default (ko) */}
                    {Object.entries({
                      "": Home,
                      "category/:categoryId": CategoryPage,
                      "length": LengthConverter,
                      "weight": WeightConverter,
                      "currency": CurrencyConverter,
                      "temperature-converter": TemperatureConverter,
                      "temperature": TemperatureConverter,
                      "temp-conv": TemperatureConverter,
                      "area-converter": AreaConverter,
                      "volume-converter": VolumeConverter,
                      "speed-converter": SpeedConverter,
                      "loan": LoanCalculator,
                      "date": DateCalculator,
                      "date-calc": DateCalculator,
                      "dday-calc": DateCalculator,
                      "salary-calculator": SalaryCalculator,
                      "salary-calc": SalaryCalculator,
                      "severance-calculator": SeveranceCalculator,
                      "severance-calc": SeveranceCalculator,
                      "minimum-wage": MinimumWageCalculator,
                      "min-wage-calc": MinimumWageCalculator,
                      "compound-interest": CompoundInterestCalculator,
                      "work-hours": WorkHoursCalculator,
                      "age-calc": AgeCalculator,
                      "age": AgeCalculator,
                      "age-calculator": AgeCalculator,
                      "discount-calculator": DiscountCalculator,
                      "percent-calculator": PercentCalculator,
                      "fraction-calculator": FractionCalculator,
                      "lunch": LunchRecommender,
                      "lunch-recommender": LunchRecommender,
                      "word-count": WordCounter,
                      "word-counter": WordCounter,
                      "unicode": UnicodeConverter,
                      "string-converter": StringConverter,
                      "case-converter": StringConverter,
                      "string-utils": StringConverter,
                      "base64": Base64Tool,
                      "html-encoder": HtmlEncoder,
                      "ascii-art": AsciiArt,
                      "morse-code": MorseCode,
                      "base-converter": BaseConverter,
                      "json-formatter": JsonFormatter,
                      "markdown-editor": MarkdownEditor,
                      "html-view": HtmlFormatter,
                      "html-formatter": HtmlFormatter,
                      "diff": CodeDiff,
                      "code-diff": CodeDiff,
                      "code-compare": CodeDiff,
                      "compare": CodeDiff,
                      "web-editor": WebEditor,
                      "hash-gen": HashGenerator,
                      "uuid-gen": UuidGenerator,
                      "url-encoder": UrlEncoderDecoder,
                      "jwt-decoder": JwtDecoder,
                      "regex-tester": RegexTester,
                      "ascii-table": AsciiTable,
                      "special-char": SpecialCharacters,
                      "cron-generator": CronGenerator,
                      "csv-json": CsvJsonConverter,
                      "encryption-tool": EncryptionTool,
                      "qr-gen": QrGenerator,
                      "qr-generator": QrGenerator,
                      "barcode-gen": BarcodeGenerator,
                      "password-gen": PasswordGenerator,
                      "color-picker": ColorPicker,
                      "image-base64": ImageToBase64,
                      "ip-address": IpAddress,
                      "timer": TimerStopwatch,
                      "pomodoro-timer": PomodoroTimer,
                      "pomodoro": PomodoroTimer,
                      "checklist": Checklist,
                      "flashlight": Flashlight,
                      "image-resize": ImageResizer,
                      "youtube-thumbnail": YoutubeThumbnail,
                      "world-clock": WorldClock,
                      "color-extractor": ColorExtractor,
                      "dice-roller": DiceRoller,
                      "bmi": BMI,
                      "bmr": BMR,
                      "biorhythm": Biorhythm,
                      "life-expectancy": LifeExpectancy,
                      "reaction-test": ReactionTest,
                      "typing-test": TypingTest,
                      "1to50": OneToFifty,
                      "one-to-fifty": OneToFifty,
                      "cps-test": CpsTest,
                      "aim-trainer": AimTrainer,
                      "number-memory": NumberMemory,
                      "number-baseball": NumberBaseball,
                      "minesweeper": Minesweeper,
                      "roulette": Roulette,
                      "ladder-game": LadderGame,
                      "suika-game": SuikaGame,
                      "2048": Game2048,
                      "tanghulu-maker": TanghuluGame,
                      "flappy-bird": FlappyBird,
                      "missile-dodge": MissileDodge,
                      "snake-game": SnakeGame,
                      "sudoku": Sudoku,
                      "sudoku-game": Sudoku,
                      "tower-stacker": TowerStacker,
                      "tower-blocks": TowerStacker,
                      "bubble-wrap": BubbleWrap,
                      "lotto": LottoGenerator,
                      "lotto-sim": LottoSimulator,
                      "mandalart": MandalartPlanner,
                      "speed-math": SpeedMath,
                      "time-sense": TimeSense,
                      "typing-defense": TypingDefense,
                      "hangman": Hangman,
                      "dynamic-acuity": DynamicAcuity,
                      "blood-type": BloodType,
                      "mbti": MbtiTest,
                      "mbti-test": MbtiTest,
                      "saju": Saju,
                      "compatibility": Saju,
                      "gunghap": Saju,
                      "zodiac-fortune": ZodiacFortune,
                      "horoscope": Horoscope,
                      "dream-interpretation": DreamInterpretation,
                      "tarot": TarotCard,
                      "birth-gen": BirthGen,
                      "name-analysis": NameAnalysis,
                      "personal-color": PersonalColor,
                      "color-test": PersonalColor,
                      "past-life": PastLife,
                      "name-past-life": PastLife,
                      "pet-mbti": PetMbti,
                      "dog-cat-mbti": PetMbti,
                      "mental-age": MentalAge,
                      "mind-age": MentalAge,
                      "brain-structure": BrainStructure,
                      "my-brain": BrainStructure,
                      "joseon-job": JoseonJob,
                      "past-job": JoseonJob,
                      "if-i-am-god": IfIAmGod,
                      "god-test": IfIAmGod,
                      "life-bgm": LifeBgm,
                      "first-impression-color": FirstImpressionColor,
                      "my-color": FirstImpressionColor,
                      "animal-face": AnimalFace,
                      "personal-scent": PersonalScent,
                      "ideal-type": IdealType,
                      "couple-compatibility": CoupleCompatibility,
                      "hidden-talent": HiddenTalent,
                      "balance-game": BalanceGame,
                      "fortune-cookie": FortuneCookie,
                      "color-sensitivity": ColorTest,
                      "hearing-test": HearingTest,
                      "pitch-test": PitchTest,
                      "smile-dating-test": SmileDatingTest,
                      "dating-test": DatingTest,
                      "stress-test": StressTest,
                      "brain-type": BrainType,
                      "eq-test": EqTest,
                      "smartphone-addiction": SmartphoneAddiction,
                      "kkondae-test": KkondaeTest,
                      "hogu-test": HoguTest,
                      "debate-test": DebateTest,
                      "idol-test": IdolPositionTest,
                      "resilience-test": ResilienceTest,
                      "initial-sound-quiz": InitialSoundQuiz,
                      "food-quiz": FoodQuiz,
                      "association-quiz": AssociationQuiz,
                      "capital-quiz": CapitalQuiz,
                      "spelling-quiz": SpellingQuiz,
                      "vocabulary-test": VocabularyTest,
                      "simple-addition": AdditionQuiz,
                      "simple-subtraction": SubtractionQuiz,
                      "simple-multiplication": MultiplicationQuiz
                    }).map(([path, Component]) => (
                      <Route key={path} path={path} element={<Component />} />
                    ))}
                    
                    {/* 404 for default /* */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              } />
            </Routes>
          </LanguageProvider>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
